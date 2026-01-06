const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs").promises;
const slugify = require("slugify");

const TARGET_URL = "https://thanhnien.vn/rss.html";
const BASE_URL = "https://thanhnien.vn";
const CATEGORIES_FILE = path.join(__dirname, "..", "categories.json");

const createSlug = (text) =>
  slugify(text, {
    lower: true,
    locale: "vi",
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });

const normalizeUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

async function syncCategories(limit = null) {
  try {
    console.log(`Đang tải nội dung từ: ${TARGET_URL}...`);

    const response = await axios.get(TARGET_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 10000, // Thêm timeout để tránh treo script
    });

    const $ = cheerio.load(response.data);
    const categories = [];

    let globalIdCounter = 1;

    // Selector cụ thể hơn để tránh lấy nhầm dữ liệu
    const listItems = $(".cate-content > li");

    if (listItems.length === 0) {
      throw new Error(
        "Không tìm thấy cấu trúc danh mục. Có thể trang web đã đổi giao diện."
      );
    }

    listItems.each((_, el) => {
      const $el = $(el);
      const mainAnchor = $el.find("> a.title");
      let name = (mainAnchor.attr("title") || mainAnchor.text())
        .split("-")[0]
        .trim();
      if (!name) return;

      const parentId = globalIdCounter++;
      const parentSlug = createSlug(name);
      let rssUrl =
        $el.find("> .linkrss").text().trim() || mainAnchor.attr("href");
      rssUrl = normalizeUrl(rssUrl);

      if (rssUrl.endsWith(".rss")) {
        categories.push({
          id: parentId,
          name: name,
          slug: parentSlug,
          rss: rssUrl,
          parent_id: null,
        });
      }

      $el.find("ul.child-items li").each((_, cEl) => {
        const $subEl = $(cEl);
        const subAnchor = $subEl.find("a.title");
        let subName = (subAnchor.attr("title") || subAnchor.text())
          .split("-")[0]
          .trim();
        let subRss =
          $subEl.find(".linkrss").text().trim() || subAnchor.attr("href");
        subRss = normalizeUrl(subRss);

        if (subName && subRss.endsWith(".rss")) {
          const subId = globalIdCounter++;
          const subSlug = `${parentSlug}-${createSlug(subName)}`;

          categories.push({
            id: subId,
            name: subName,
            slug: subSlug,
            rss: subRss,
            parent_id: parentId,
          });
        }
      });
    });

    const finalCategories = limit ? categories.slice(0, limit) : categories;

    // Lưu kết quả bất đồng bộ
    await fs.writeFile(
      CATEGORIES_FILE,
      JSON.stringify(finalCategories, null, 2),
      "utf-8"
    );
    console.log(
      `Thành công! Đã lưu ${categories.length} danh mục vào categories.json`
    );
    return { total: categories.length, saved: finalCategories.length };
  } catch (error) {
    throw new Error("Lỗi khi đồng bộ danh mục: " + error.message);
  }
}

module.exports = { syncCategories };
