const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const fsSync = require("fs");
const { parseThanhNienRss } = require("./fetchNews");
const path = require("path");

const app = express();
app.use(cors());

const DATA_DIR = path.join(__dirname, "..", "data_Hai");
const CATEGORIES_FILE = path.join(__dirname, "..", "categories.json");

// kiem tra folder xem co ton tai hay k
if (!fsSync.existsSync(DATA_DIR)) {
  fsSync.mkdirSync(DATA_DIR, { recursive: true });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateNews() {
  try {
    console.log(`[${new Date().toLocaleTimeString()}] Bắt đầu cập nhật...`);

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
            await fs.writeFile(
              path.join(DATA_DIR, `${cat.id}.json`),
              JSON.stringify(news, null, 2)
            );
            console.log(`Đã cập nhật: ${cat.parent_id}-${cat.name}`);
            success = true;
          }
        } catch (innerError) {
          console.error(`Lỗi tại danh mục ${cat.name}:`, innerError.message);
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
    console.log("Đã cập nhật tất cả tin tức vào bộ nhớ file!");
  } catch (error) {
    console.error("Lỗi nghiêm trọng trong Cron:", error.message);
  }
}

cron.schedule("0 0 * * *", updateNews);

app.get("/api/news/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const filePath = path.join(DATA_DIR, `${categoryId}.json`);

    if (!fsSync.existsSync(filePath)) {
      return res.status(404).json({
        message: "Dữ liệu đang được cập nhật hoặc không tồn tại",
      });
    }

    const newsData = JSON.parse(await fs.readFile(filePath, "utf-8"));

    res.json({
      categoryName: categoryId,
      articles: newsData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server chạy tại port 5000"));
updateNews();
