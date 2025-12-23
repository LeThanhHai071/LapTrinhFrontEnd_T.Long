const express = require("express");
const cors = require("cors");
const crawlThanhNien = require("./crawler/thanhnien");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ ROUTE TEST ROOT
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ✅ API CRAWL
app.get("/api/news", async (req, res) => {
  try {
    const data = await crawlThanhNien();
    res.json({
      source: "thanhnien.vn",
      total: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Crawl failed",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
