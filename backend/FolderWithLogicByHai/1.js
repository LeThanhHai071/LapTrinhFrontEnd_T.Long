const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const slugify = require("slugify");

const BASE_URL = "https://thanhnien.vn";
const RSS_PAGE_URL = "https://thanhnien.vn/rss.html";

let idCounter = 1; // tạo ID category thông qua idCounter
// Hàm hỗ trợ nghỉ (delay) để tránh bị block
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Kiểm tra xem một URL có phải là RSS hợp lệ và có chứa dữ liệu (item) hay không
async function validateRSS(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      if (!url.endsWith(".rss")) return false;

      const response = await axios.get(url, {
        timeout: 5000,
        headers: { "User-Agent": "Mozilla/5.0..." },
      });
      const content = response.data;

      // Kiểm tra link rss co du lieu ben trong hay khong,
      // rss xml co du lieu duoc luu trong <item>
      return content.includes("<item>");
    } catch (error) {
      const status = error.response ? error.response.status : "No Status";
      console.warn(
        `|-- Lần thử ${i + 1} thất bại cho [${url}] - Lỗi: ${status}`
      );
      if (i < retries - 1) {
        await sleep(2000 * (i + 1));
      }
    }
  }
  return false;
}

// Chuyển đổi name thành slug không dấu
function createSlug(name) {
  return slugify(name, { lower: true, locale: "vi", trim: true });
}

async function processElement($, el, parentSlug = "") {
  const aTag = $(el).children("a.title");
  if (aTag.length === 0) return null;

  // Lấy tên thông qua tag <a>
  let rawName = aTag.attr("title") || aTag.text();
  rawName = rawName.split("-")[0].trim();
  let rssUrl = aTag.attr("href");

  // Xử lý link tương đối
  if (rssUrl && rssUrl.startsWith("/")) {
    rssUrl = BASE_URL + rssUrl;
  }

  console.log(`Đang kiểm tra: ${rawName}...`);

  // Kiểm tra tính hợp lệ của RSS
  const isValid = await validateRSS(rssUrl);
  if (!isValid) {
    console.log(`|-- Bỏ qua: ${rawName} (RSS không hợp lệ hoặc trống)`);
    return null;
  }

  // Dùng để gọi API: /api/category/:slug
  const currentSlug = createSlug(rawName);
  const fullSlug = parentSlug ? `${parentSlug}-${currentSlug}` : currentSlug;

  const currentId = idCounter++;
  const item = {
    id: currentId,
    name: rawName,
    slug: currentSlug,
    fullSlug: fullSlug,
    rssUrl: rssUrl,
    children: [],
  };

  // Tìm các danh mục con (nằm trong ul.child-items)
  const childUl = $(el).children("ul");
  if (childUl.length > 0) {
    const childLis = childUl.children("li");
    for (let i = 0; i < childLis.length; i++) {
      await sleep(500);
      const childData = await processElement($, childLis[i], fullSlug);
      if (childData) {
        childData.parentId = currentId;
        item.children.push(childData);
      }
    }
  }

  return item;
}

async function crawlCategories() {
  try {
    console.log("--- Đang bắt đầu quét danh mục RSS ---");
    const response = await axios.get(RSS_PAGE_URL);
    const $ = cheerio.load(response.data);

    const results = [];

    // Dựa vào cấu trúc https://thanhnien.vn/rss.html,
    // tìm các thẻ <li> chứa link rss
    const rootLi = $("li").filter(function () {
      return (
        $(this).find(".linkrss").length > 0 &&
        $(this).parent().closest("li").length === 0
      ); // kiểm tra xem phía trên thẻ <li> này không còn một thẻ <li> nào khác bao bọc nó
    });

    for (let i = 0; i < rootLi.length; i++) {
      const element = rootLi[i];
      const categoryData = await processElement($, element);

      if (categoryData) {
        results.push(categoryData);
      }
    }

    // Ghi dữ liệu ra file JSON
    await fs.writeFile(
      "categories.json",
      JSON.stringify(results, null, 2),
      "utf-8"
    );
    console.log("--- Hoàn thành! Đã lưu vào file categories.json ---");
  } catch (error) {
    console.error("Lỗi crawlCategories:", error);
  }
}

module.exports = { crawlCategories };
