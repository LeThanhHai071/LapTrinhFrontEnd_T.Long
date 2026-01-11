const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const { readInputJson } = require('../scraper');

const { crawlCategories } = require("./1");
const { crawlCategoriesJSON } = require("./2");
const { runStep3 } = require("./3");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_ARTICLES_DIR = path.join(__dirname, "data_articles");
const DATA_DETAILS_DIR = path.join(__dirname, "data_details");

// --- API ROUTES ---

/**
 * 1. API: Danh sách Category (Menu)
 */
app.get("/api/categories", async (req, res) => {
  try {
    const data = await fs.readFile("categories.json", "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Không tìm thấy danh sách danh mục" });
  }
});

/**
 * 2. API: Lấy danh sách bài viết của 1 Category (theo fullSlug)
 */
app.get("/api/category/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await fs.readFile(
      path.join(DATA_ARTICLES_DIR, `${slug}.json`),
      "utf-8"
    );
    res.json(JSON.parse(data));
  } catch (error) {
    res
      .status(404)
      .json({ error: "Danh mục không tồn tại hoặc chưa có dữ liệu" });
  }
});

/**
 * 3. API: Chi tiết bài báo (theo ID)
 */
app.get("/api/article/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile(
      path.join(DATA_DETAILS_DIR, `${id}.json`),
      "utf-8"
    );
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(404).json({ error: "Bài viết không tồn tại" });
  }
});

/**
 * 4. API: Tin tức mới nhất (Lấy từ tất cả category)
 */
app.get("/api/latest", async (req, res) => {
  try {
    const files = await fs.readdir(DATA_ARTICLES_DIR);
    let allArticles = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const raw = await fs.readFile(
          path.join(DATA_ARTICLES_DIR, file),
          "utf-8"
        );
        const parsed = JSON.parse(raw);
        allArticles = allArticles.concat(parsed.articles);
      }
    }

    // Sắp xếp theo ngày mới nhất và lấy 20 bài
    const latest = allArticles
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 20);

    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tổng hợp tin mới nhất" });
  }
});

/**
 * 5. API: Kích hoạt crawl thủ công
 */
app.post("/api/admin/crawl-all", async (req, res) => {
  res.json({ message: "Bắt đầu quá trình crawl toàn bộ hệ thống..." });
  // Chạy ngầm để không làm treo response
  (async () => {
    try {
      console.log("--- BẮT ĐẦU QUY TRÌNH CRAWL TỔNG THỂ ---");
      // await crawlCategories();     
      // await crawlCategoriesJSON(); 
      await runStep3();            
      console.log("--- TẤT CẢ ĐÃ HOÀN TẤT! ---");
    } catch (err) {
      console.error("Lỗi khi crawl ngầm:", err);
    }
  })();
});

// --- LẬP LỊCH TỰ ĐỘNG (CRON JOB) ---

// a. Details: Mỗi ngày một lần (Lúc 2:00 sáng)
cron.schedule("0 2 * * *", async () => {
  console.log("Cron: Đang cập nhật nội dung chi tiết bài viết...");
  await runStep3();
});

// b. Category Articles (Step 2): 1 lần mỗi tuần (Chủ nhật lúc 0:00)
cron.schedule("0 0 * * 0", async () => {
  console.log("Cron: Đang cập nhật danh sách bài viết danh mục...");
  await crawlCategoriesJSON();
});

// c. Categories Structure (Step 1): 1 lần mỗi tháng (Ngày 1 đầu tháng)
cron.schedule("0 0 1 * *", async () => {
  console.log("Cron: Đang cập nhật cấu trúc danh mục...");
  await crawlCategories();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
