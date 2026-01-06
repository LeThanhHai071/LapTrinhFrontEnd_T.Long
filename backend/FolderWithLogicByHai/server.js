const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const {
  updateNews,
  DATA_DIR,
  DETAILS_DIR,
  CATEGORIES_FILE,
} = require("./crawl_news_from_slugJSON");
const { syncCategories } = require("./crawl_category_rss");

const app = express();
app.use(cors());
const PORT = 5000;

app.post("/api/sync-categories", async (req, res) => {
  try {
    const limit = null;
    // const { limit } = req.body; 
    console.log(`[API] Đang bắt đầu đồng bộ danh mục (Limit: ${limit || 'Full'})...`);
    
    const result = await syncCategories(limit);
    
    res.json({
      message: "Đồng bộ danh mục thành công!",
      info: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Không thể đọc file categories" });
  }
});

app.get("/api/news/:slug", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, `${req.params.slug}.json`);
    if (fsSync.existsSync(filePath)) {
      const data = await fs.readFile(filePath, "utf-8");
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: "Danh mục chưa có dữ liệu" });
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi Server" });
  }
});

app.get("/api/detail/:articleId", async (req, res) => {
  try {
    const filePath = path.join(DETAILS_DIR, `${req.params.articleId}.json`);
    if (fsSync.existsSync(filePath)) {
      const data = await fs.readFile(filePath, "utf-8");
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: "Không tìm thấy nội dung bài viết" });
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi Server" });
  }
});

app.get("/api/update", (req, res) => {
  updateNews();
  res.send("Đã kích hoạt tiến trình cập nhật ngầm...");
});
// cron.schedule("0 0 * * *", updateNews);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
