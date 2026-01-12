const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const authRoute = require("./routes/auth.route");
const { crawlCategories } = require("./FolderWithLogicByHai/1");
const { crawlCategoriesJSON } = require("./FolderWithLogicByHai/2");
const { runStep3 } = require("./FolderWithLogicByHai/3");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_ARTICLES_DIR = path.join(
  __dirname,
  "/FolderWithLogicByHai/data_articles"
);
const DATA_DETAILS_DIR = path.join(
  __dirname,
  "/FolderWithLogicByHai/data_details"
);

// --- API ROUTES ---

app.use("/api/auth", authRoute);

// API: Danh sách Category (Menu)
app.get("/api/categories", async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "/FolderWithLogicByHai",
      "categories.json"
    );
    const data = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Không tìm thấy danh sách danh mục" });
  }
});

// API: Lấy danh sách bài viết của 1 Category (theo fullSlug)
app.get("/api/category/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const filePath = path.join(DATA_ARTICLES_DIR, `${slug}.json`);
    const rawData = await fs.readFile(filePath, "utf-8");
    let parsedData = JSON.parse(rawData);
    if (parsedData.articles && Array.isArray(parsedData.articles)) {
      parsedData.articles = parsedData.articles.map((article) => {
        const match = article.link.match(/-(\d+)\.htm$/);
        return {
          ...article,
          id: match ? match[1] : article.link,
        };
      });
    }
    res.json(parsedData);
  } catch (error) {
    res
      .status(404)
      .json({ error: "Danh mục không tồn tại hoặc chưa có dữ liệu" });
  }
});

// API: Chi tiết bài báo (theo ID)
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

// API: Tin tức mới nhất (Lấy từ tất cả category)
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
        // allArticles = allArticles.concat(parsed.articles);
        if (Array.isArray(parsed.articles)) {
          allArticles = allArticles.concat(parsed.articles);
        }
      }
    }

    const uniqueArticlesMap = new Map();
    allArticles.forEach((item) => {
      if (item.link && !uniqueArticlesMap.has(item.link)) {
        const match = item.link.match(/-(\d+)\.htm$/);
        const extractedId = match ? match[1] : item.link;

        uniqueArticlesMap.set(item.link, {
          ...item,
          id: extractedId,
        });
      }
    });

    const uniqueArticles = Array.from(uniqueArticlesMap.values());

    const latest = uniqueArticles
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 20);

    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tổng hợp tin mới nhất" });
  }
});

// API: Kích hoạt crawl thủ công thông qua POSTMAIN
// API sẽ chạy toàn bộ từ getRssFromHTML, getLinkFromRss, getDetailFromLink
app.post("/api/admin/crawl-all", async (req, res) => {
  res.json({ message: "Bắt đầu quá trình crawl toàn bộ hệ thống..." });
  // Chạy ngầm để không làm treo response
  (async () => {
    try {
      console.log("--- BẮT ĐẦU QUY TRÌNH CRAWL TỔNG THỂ ---");
      await crawlCategories();
      await crawlCategoriesJSON();
      await runStep3();
      console.log("--- TẤT CẢ ĐÃ HOÀN TẤT! ---");
    } catch (err) {
      console.error("Lỗi khi crawl ngầm:", err);
    }
  })();
});

app.get("/api/search-detail/:articleId", async (req, res) => {
  try {
    const { articleId } = req.params;
    const files = await fs.readdir(DETAILS_DIR);

    // Dùng logic tìm kiếm linh hoạt (EndsWith) chúng ta đã phát triển
    const targetFile = files.find(
      (f) => f.endsWith(`-${articleId}.json`) || f === `${articleId}.json`
    );

    if (targetFile) {
      const filePath = path.join(DETAILS_DIR, targetFile);
      const data = await fs.readFile(filePath, "utf-8");
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: "File chi tiết chưa tồn tại cho ID này" });
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi hệ thống khi quét file" });
  }
});

const performSearch = async (keyword) => {
  const searchKey = keyword.toLowerCase().trim();
  const results = [];
  const seenIds = new Set();

  const listFiles = fsSync
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"));
  let detailFiles = [];
  if (fsSync.existsSync(DETAILS_DIR)) {
    detailFiles = fsSync
      .readdirSync(DETAILS_DIR)
      .filter((f) => f.endsWith(".json"));
  }

  // server.js
  const processFile = async (folder, fileName) => {
    try {
      const filePath = path.join(folder, fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const content = JSON.parse(fileContent);
      const items = Array.isArray(content) ? content : [content];

      for (const item of items) {
        const itemString = JSON.stringify(item).toLowerCase();
        if (itemString.includes(searchKey)) {
          // FIX TẠI ĐÂY: Xác định ID chuẩn để NewsDetail gọi API thành công
          // Nếu file nằm trong folder DETAILS_DIR, ID chính là tên file (bỏ .json)
          // Nếu file nằm trong folder DATA_DIR, ưu tiên lấy item.articleId
          let finalArticleId = item.articleId;
          if (folder === DETAILS_DIR) {
            finalArticleId = fileName.replace(".json", "");
          }

          if (finalArticleId && !seenIds.has(finalArticleId)) {
            seenIds.add(finalArticleId);
            results.push({
              ...item,
              articleId: finalArticleId,
              _source: fileName,
              _isDetail: folder === DETAILS_DIR,
            });
          }
        }
      }
    } catch (e) {
      /* ignore */
    }
  };

  await Promise.all(listFiles.map((file) => processFile(DATA_DIR, file)));
  await Promise.all(detailFiles.map((file) => processFile(DETAILS_DIR, file)));

  return results;
};
app.get("/api/search", async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword || keyword.length < 2) {
      return res.json([]);
    }

    console.log(`[Search] Đang tìm kiếm từ khóa: ${keyword}`);
    const results = await performSearch(keyword);

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Lỗi trong quá trình tìm kiếm" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    message: "API not found",
  });
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
