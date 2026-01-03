// const express = require("express");
// const cors = require("cors");
// const crawlThanhNien = require("./crawler/thanhnien");
// const authRoute = require("./routes/auth.route");

// const app = express();
// const PORT = 3000;

// /* ================= MIDDLEWARE ================= */
// app.use(cors());
// app.use(express.json());

// /* ================= TEST ROOT ================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running");
// });

// /* ================= AUTH (DÙNG auth.json) ================= */
// app.use("/api/auth", authRoute);

// /* ================= CRAWL NEWS ================= */
// app.get("/api/news", async (req, res) => {
//   try {
//     const data = await crawlThanhNien();
//     res.json({
//       source: "thanhnien.vn",
//       total: data.length,
//       data
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Crawl failed",
//       error: error.message
//     });
//   }
// });

// /* ================= 404 NOT FOUND ================= */
// app.use((req, res) => {
//   res.status(404).json({
//     message: "API not found"
//   });
// });

// /* ================= START SERVER ================= */
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const cron = require('node-cron'); 
const { readInputJson, processCategoryList, saveResultJson } = require('./scraper');

const app = express();
app.use(cors());
app.use(express.json());

// --- CẤU HÌNH CRON JOB (TỰ ĐỘNG) ---
cron.schedule('0 0 * * *', async () => {
    console.log('--- [CRON] Bắt đầu tự động cập nhật tin tức... ---');
    try {
        const inputData = readInputJson('data_input.json');
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        console.log('--- [CRON] Cập nhật thành công vào: ' + new Date().toLocaleString() + ' ---');
    } catch (error) {
        console.error('--- [CRON] Lỗi khi cập nhật tự động:', error.message);
    }
});

// --- API ENDPOINTS CHO REACT ---
app.get('/api/news', (req, res) => {
    try {
        const data = readInputJson('final_data.json');
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Dữ liệu đang được chuẩn bị, vui lòng thử lại sau." });
    }
});

app.post('/api/trigger-crawl', async (req, res) => {
    console.log('Người dùng yêu cầu crawl ngay lập tức');
    try {
        const inputData = readInputJson('data_input.json');
        const fullData = await processCategoryList(inputData);
        saveResultJson(fullData);
        res.json({ message: "Crawl thủ công hoàn tất!", data: fullData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend đang chạy tại http://localhost:${PORT}`);
    console.log(`⏰ Tự động crawl mỗi 12h.`);
});
