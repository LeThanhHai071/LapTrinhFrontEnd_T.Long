const axios = require("axios");
const cheerio = require("cheerio");

async function crawlThanhNien() {
  const url = "https://thanhnien.vn/";

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(response.data);
  const news = [];

  $(".story").each((index, element) => {
    if (index >= 10) return false;

    const title = $(element)
      .find(".story__title a")
      .text()
      .trim();

    const link = $(element)
      .find(".story__title a")
      .attr("href");

    const image =
      $(element).find("img").attr("data-src") ||
      $(element).find("img").attr("src");

    const desc = $(element)
      .find(".story__summary")
      .text()
      .trim();

    if (title && link) {
      news.push({
        title,
        desc,
        image,
        link: link.startsWith("http")
          ? link
          : `https://thanhnien.vn${link}`
      });
    }
  });

  return news;
}

module.exports = crawlThanhNien;
