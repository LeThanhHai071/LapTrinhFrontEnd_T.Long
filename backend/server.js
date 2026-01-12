const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

const authRoute = require("./routes/auth.route");
const { readInputJson, processCategoryList, saveResultJson } = require("./scraper");
const { updateNews, DATA_DIR, DETAILS_DIR, CATEGORIES_FILE } = require("./crawl_news_from_slugJSON");
const { syncCategories } = require("./crawl_category_rss");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

/* ================= CRON JOB ================= */
cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Auto crawl news...");
    try {
        const inputData = readInputJson("data_input.json");
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        console.log("[CRON] DONE:", new Date().toLocaleString());
    } catch (err) {
        console.error("[CRON ERROR]", err.message);
    }
});

/* ================= API ================= */

app.get("/api/news", (req, res) => {
    try {
        const data = readInputJson("final_data.json");
        res.json(data);
    } catch {
        res.status(500).json({ message: "Dữ liệu đang được chuẩn bị" });
    }
});

app.get("/api/news/detail/:articleId", async (req, res) => {
    try {
        const filePath = path.join(DETAILS_DIR, `${req.params.articleId}.json`);
        if (!fsSync.existsSync(filePath)) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }
        const data = await fs.readFile(filePath, "utf-8");
        res.json(JSON.parse(data));
    } catch {
        res.status(500).json({ message: "Lỗi server" });
    }
});

app.post("/api/trigger-crawl", async (req, res) => {
    try {
        const inputData = readInputJson("data_input.json");
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        res.json({ message: "Crawl thủ công hoàn tất" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/sync-categories", async (req, res) => {
    try {
        const result = await syncCategories(null);
        res.json({ message: "Sync OK", info: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/categories", async (req, res) => {
    try {
        const data = await fs.readFile(CATEGORIES_FILE, "utf-8");
        res.json(JSON.parse(data));
    } catch {
        res.status(500).json({ error: "Không đọc được categories" });
    }
});

app.get("/api/news/:slug", async (req, res) => {
    const filePath = path.join(DATA_DIR, `${req.params.slug}.json`);
    if (!fsSync.existsSync(filePath)) {
        return res.status(404).json({ error: "Danh mục chưa có dữ liệu" });
    }
    const data = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(data));
});

app.get("/api/detail/:articleId", async (req, res) => {
    const filePath = path.join(DETAILS_DIR, `${req.params.articleId}.json`);
    if (!fsSync.existsSync(filePath)) {
        return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    const data = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(data));
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
