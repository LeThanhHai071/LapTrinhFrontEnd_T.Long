const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const authRoute = require("./routes/auth.route");
const { readInputJson, processCategoryList, saveResultJson } = require('./scraper');

const app = express();
app.use(cors());
app.use(express.json());

/* ================= AUTH ================= */
app.use("/api/auth", authRoute);

/* ================= CRON JOB================= */
cron.schedule('0 0 * * *', async () => {
    console.log('--- [CRON] Bắt đầu tự động cập nhật tin tức... ---');
    try {
        const inputData = readInputJson('data_input.json');
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        console.log('--- [CRON] Cập nhật thành công:', new Date().toLocaleString());
    } catch (error) {
        console.error('--- [CRON] Lỗi:', error.message);
    }
});

/* ================= API LIST NEWS================= */
app.get('/api/news', (req, res) => {
    try {
        const data = readInputJson('final_data.json');
        res.json(data);
    } catch (e) {
        res.status(500).json({
            message: "Dữ liệu đang được chuẩn bị, vui lòng thử lại sau."
        });
    }
});

/* ================= API DETAIL NEWS================= */
app.get('/api/news/detail/:articleId', (req, res) => {
    try {
        const { articleId } = req.params;

        // Đường dẫn file chi tiết
        const detailPath = path.join(
            __dirname,
            'data_Hai',
            'details',
            `${articleId}.json`
        );

        if (!fs.existsSync(detailPath)) {
            return res.status(404).json({
                message: "Không tìm thấy bài viết chi tiết"
            });
        }

        const detailData = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));
        res.json(detailData);

    } catch (error) {
        res.status(500).json({
            message: "Lỗi đọc dữ liệu chi tiết",
            error: error.message
        });
    }
});

/* ================= TRIGGER CRAWL================= */
app.post('/api/trigger-crawl', async (req, res) => {
    console.log('Người dùng yêu cầu crawl ngay lập tức');
    try {
        const inputData = readInputJson('data_input.json');
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        res.json({
            message: "Crawl thủ công hoàn tất!",
            data: fullData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ================= START SERVER ================= */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend đang chạy tại http://localhost:${PORT}`);
    console.log(`⏰ Cron crawl mỗi ngày lúc 00:00`);
});
