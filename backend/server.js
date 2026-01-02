const express = require("express");
const cors = require("cors");
const crawlThanhNien = require("./crawler/thanhnien");
const authRoute = require("./routes/auth.route");

const app = express();
const PORT = 3000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= TEST ROOT ================= */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

/* ================= AUTH (DÙNG auth.json) ================= */
app.use("/api/auth", authRoute);

/* ================= CRAWL NEWS ================= */
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

/* ================= 404 NOT FOUND ================= */
app.use((req, res) => {
  res.status(404).json({
    message: "API not found"
  });
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
