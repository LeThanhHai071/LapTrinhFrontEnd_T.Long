const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const { parseThanhNienRss } = require("./crawl_link_rss_from_thanhnienRSS");
const { scrapeArticleDetail } = require("./crawl_data_with_rss");

const DATA_DIR = path.join(__dirname, "..", "data_Hai");
const DETAILS_DIR = path.join(__dirname, "..", "data_Hai", "details");
const CATEGORIES_FILE = path.join(__dirname, "..", "categories.json");

if (!fsSync.existsSync(DATA_DIR))
  fsSync.mkdirSync(DATA_DIR, { recursive: true });
if (!fsSync.existsSync(DETAILS_DIR))
  fsSync.mkdirSync(DETAILS_DIR, { recursive: true });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateNews() {
  const LIMIT_NEWS = 3;

  try {
    console.log(
      `[${new Date().toLocaleTimeString()}] Bắt đầu chu kỳ cập nhật...`
    );
    const categories = JSON.parse(await fs.readFile(CATEGORIES_FILE, "utf-8"));

    for (const cat of categories) {
      let attempts = 0;
      let success = false;
      const MAX_RETRIES = 3;

      while (attempts < MAX_RETRIES && !success) {
        try {
          attempts++;
          const news = await parseThanhNienRss(cat.rss);

          if (news && news.length > 0) {
            const limitedNews = news.slice(0, LIMIT_NEWS);
            console.log(
              `Danh mục ${cat.name}: Lấy ${limitedNews.length}/${news.length} bài.`
            );

            for (const item of limitedNews) {
              const articleId = item.link
                .split("/")
                .pop()
                .replace(".html", "")
                .replace(".htm", "");
              const detailPath = path.join(DETAILS_DIR, `${articleId}.json`);

              if (!fsSync.existsSync(detailPath)) {
                console.log(`---> Đang lấy chi tiết: ${articleId}`);
                const detailData = await scrapeArticleDetail(item.link);
                if (detailData) {
                  await fs.writeFile(
                    detailPath,
                    JSON.stringify(detailData, null, 2)
                  );
                }
                await delay(1000);
              }
              item.articleId = articleId;
            }

            await fs.writeFile(
              path.join(DATA_DIR, `${cat.slug}.json`),
              JSON.stringify(limitedNews, null, 2)
            );
            console.log(`Cập nhật: ${cat.slug}`);
            success = true;
          }
        } catch (innerError) {
          console.error(
            `Lỗi tại ${cat.name} (Lần ${attempts}):`,
            innerError.message
          );
          if (attempts < MAX_RETRIES) {
            console.log(`Đang thử lại sau 3 giây...`);
            await delay(3000);
          } else {
            console.error(
              `Đã thất bại sau ${MAX_RETRIES} lần thử cho danh mục: ${cat.name}`
            );
          }
        }
      }
      await delay(2000);
    }
    console.log("HOÀN TẤT CẬP NHẬT!");
  } catch (error) {
    console.error("Lỗi hệ thống trong Service:", error.message);
  }
}

module.exports = {
  updateNews,
  DATA_DIR,
  DETAILS_DIR,
  CATEGORIES_FILE,
};
