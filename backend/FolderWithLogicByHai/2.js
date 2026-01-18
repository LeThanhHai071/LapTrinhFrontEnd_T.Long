const Parser = require("rss-parser");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");
const probe = require("probe-image-size");

const parser = new Parser();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const DATA_DIR = path.join(__dirname, "data_articles");
const CATEGORY_PATH = path.join(__dirname, "categories.json");
const DEFAULT_ARTICLE_LIMIT = 10;
const SPECIAL_ARTICLE_LIMIT = 30;
const PRIORITY_SLUGS = ["home", "thoi-su", "the-gioi", "kinh-te"];

async function parseDescription(html) {
  if (!html) return { thumbnail: null, summary: "", imgClass: "img-resize" };
  const $ = cheerio.load(html);
  const thumbnail = $("img").attr("src") || null;
  const summary = $.text().trim();
  let imgClass = "img-resize";

  if (thumbnail) {
    try {
      const result = await probe(thumbnail);

      if (result.height >= result.width) {
        imgClass = "img-square";
      }
    } catch (error) {
      console.log(`parseDescription is error: ${error.message}`);
    }
  }
  return { thumbnail, summary, imgClass };
}

async function processCategory(cat, retries = 3) {
  const isPriority =
    PRIORITY_SLUGS.includes(cat.slug) || PRIORITY_SLUGS.includes(cat.fullSlug);
  const currentLimit = isPriority
    ? SPECIAL_ARTICLE_LIMIT
    : DEFAULT_ARTICLE_LIMIT;

  console.log(
    `[Limit: ${currentLimit}] Đang lấy tin: ${cat.name} (${cat.fullSlug})`,
  );

  let success = false;
  let attempt = 0;

  while (attempt < retries && !success) {
    try {
      const feed = await parser.parseURL(cat.rssUrl);
      const limitedItems = feed.items.slice(0, currentLimit);

      const articles = await Promise.all(
        limitedItems.map(async (item) => {
          const { thumbnail, summary, imgClass } = await parseDescription(
            item.description || item.content || "",
          );
          return {
            title: cheerio.load(item.title).text(),
            link: item.link,
            pubDate: item.pubDate,
            imageURL: thumbnail,
            imgClass: imgClass,
            description: summary,
            guid: item.guid,
          };
        })
      );

      // Cấu trúc file JSON chuẩn cho API
      const output = {
        categoryId: cat.id,
        categoryName: cat.name,
        fullSlug: cat.fullSlug,
        limitApplied: currentLimit,
        lastUpdate: new Date().toISOString(),
        articles: articles,
      };

      // Lưu file theo fullSlug để KHÔNG bị trùng (xe-video.json vs video.json)
      await fs.writeFile(
        path.join(DATA_DIR, `${cat.fullSlug}.json`),
        JSON.stringify(output, null, 2),
      );

      console.log(`[Lần ${attempt + 1}] Thành công: ${articles.length} bài.`);
      success = true; // Thoát khỏi vòng lặp while
    } catch (err) {
      attempt++;
      console.warn(`[Lần ${attempt}] Lỗi RSS [${cat.name}]: ${err.message}`);

      if (attempt < retries) {
        const waitTime = 2000 * attempt;
        console.log(`Đợi ${waitTime}ms trước khi thử lại...`);
        await sleep(waitTime);
      } else {
        console.error(`Đã thất bại sau ${retries} lần thử.`);
      }
    }
  }

  await sleep(1500);

  if (cat.children && cat.children.length > 0) {
    // Hạn chế số lượng category vì có quá nhiều, ảnh hưởng đến tốc độ load dữ liệu
    const limitedChildren = cat.children.slice(0, 5);
    if (cat.children.length > 5) {
      console.log(
        `Thông báo: Mục "${cat.name}" có ${cat.children.length} con, chỉ crawl 5 con đầu tiên.`,
      );
    }
    for (const child of limitedChildren) {
      await processCategory(child);
    }
  }
}

async function crawlCategoriesJSON() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const categories = JSON.parse(await fs.readFile(CATEGORY_PATH, "utf-8"));

    for (const cat of categories) {
      await processCategory(cat);
    }
    console.log("--- Xong Bước 2: Dữ liệu đã được phân mảnh theo slug ---");
  } catch (error) {
    console.error("Lỗi Bước 2:", error);
  }
}

module.exports = { crawlCategoriesJSON };
