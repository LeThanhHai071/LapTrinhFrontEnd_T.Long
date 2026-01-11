const express = require('express');
const cors = require('cors');
const {readInputJson, processCategoryList, saveResultJson} = require('./scraper');
const cron = require("node-cron");
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
const authRoute = require("./routes/auth.route");

const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());

app.use("/api/auth", authRoute);

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
        res.status(500).json({error: err.message});
    }
});

app.get("/api/categories", async (req, res) => {
    try {
        const data = await fs.readFile(CATEGORIES_FILE, "utf-8");
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({error: "Không thể đọc file categories"});
    }
});

app.get("/api/news/:slug", async (req, res) => {
    try {
        const filePath = path.join(DATA_DIR, `${req.params.slug}.json`);
        if (fsSync.existsSync(filePath)) {
            const data = await fs.readFile(filePath, "utf-8");
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({error: "Danh mục chưa có dữ liệu"});
        }
    } catch (err) {
        res.status(500).json({error: "Lỗi Server"});
    }
});

// server.js
app.get("/api/detail/:articleId", async (req, res) => {
    try {
        // Tìm chính xác theo tên file (logic cũ của đồng đội)
        const filePath = path.join(DETAILS_DIR, `${req.params.articleId}.json`);
        if (fsSync.existsSync(filePath)) {
            const data = await fs.readFile(filePath, "utf-8");
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({error: "Không tìm thấy nội dung bài viết"});
        }
    } catch (err) {
        res.status(500).json({error: "Lỗi Server"});
    }
});


app.get("/api/search-detail/:articleId", async (req, res) => {
    try {
        const { articleId } = req.params;
        const files = await fs.readdir(DETAILS_DIR);

        // Dùng logic tìm kiếm linh hoạt (EndsWith) chúng ta đã phát triển
        const targetFile = files.find(f =>
            f.endsWith(`-${articleId}.json`) || f === `${articleId}.json`
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

    const listFiles = fsSync.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    let detailFiles = [];
    if (fsSync.existsSync(DETAILS_DIR)) {
        detailFiles = fsSync.readdirSync(DETAILS_DIR).filter(f => f.endsWith('.json'));
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
                        finalArticleId = fileName.replace('.json', '');
                    }

                    if (finalArticleId && !seenIds.has(finalArticleId)) {
                        seenIds.add(finalArticleId);
                        results.push({
                            ...item,
                            articleId: finalArticleId,
                            _source: fileName,
                            _isDetail: folder === DETAILS_DIR
                        });
                    }
                }
            }
        } catch (e) { /* ignore */ }
    };

    await Promise.all(listFiles.map(file => processFile(DATA_DIR, file)));
    await Promise.all(detailFiles.map(file => processFile(DETAILS_DIR, file)));

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
        res.status(500).json({error: "Lỗi trong quá trình tìm kiếm"});
    }
});

app.get("/api/update", (req, res) => {
    updateNews();
    res.send("Đã kích hoạt tiến trình cập nhật ngầm...");
});
// cron.schedule("0 0 * * *", updateNews);

app.use((req, res) => {
  res.status(404).json({
    message: "API not found"
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
