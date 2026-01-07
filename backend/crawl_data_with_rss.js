const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeArticleDetail(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
        },
        timeout: 10000,
      });
      const $ = cheerio.load(data);

      const result = {
        title: $('span[data-role="title"], .detail-title').text().trim(),
        author: $(".author-info .author-info-top a").first().text().trim() || "Thanh Niên",
        publishDate: $('div[data-role="publishdate"], .detail-time').text().trim(),
        sapo: $('h2[data-role="sapo"], .detail-sapo').text().trim(),
        body: [],
      };

      const contentArea = $('.detail-content[data-role="content"], .detail-content');

      contentArea.children().each((_, element) => {
        const node = $(element);
        if (element.name === "p") {
          const text = node.text().trim();
          if (text) result.body.push({ type: "text", content: text });
        } else if (element.name === "figure" || node.hasClass("imagefull")) {
          const imgTag = node.find("img");
          const captionTag = node.find("figcaption p, .PhotoCMS_Caption p");
          
          result.body.push({
            type: "image",
            url: imgTag.attr("data-src") || imgTag.attr("data-original") || imgTag.attr("src"),
            caption: captionTag.text().trim(),
          });
        }
      });

      return result;
    } catch (error) {
      if (i === retries) return null;
      await sleep(2000);
    }
  }
}

module.exports = { scrapeArticleDetail };