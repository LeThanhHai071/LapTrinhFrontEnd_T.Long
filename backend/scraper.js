const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeArticleDetail(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
        timeout: 10000,
      });
      const $ = cheerio.load(data);

      const result = {
        cateParent: $('a[data-role="cate-name-parent"]').text().trim(),
        cateName: $('a[data-role="cate-name"]').text().trim(),
        title: $('span[data-role="title"]').text().trim(),
        author: $(".author-info .author-info-top a").first().text().trim(),
        publishDate: $('div[data-role="publishdate"]').text().trim(),
        sapo: $('h2[data-role="sapo"]').text().trim(),
        body: [],
      };

      const contentArea = $('.detail-content[data-role="content"]');

      contentArea.children().each((index, element) => {
        const node = $(element);

        if (element.name === "p") {
          const text = node.text().trim();
          if (text) {
            result.body.push({ type: "text", content: text });
          }
        } else if (element.name === "figure") {
          const imgTag = node.find("img");
          const captionTag = node.find("figcaption p");
          const authorTag = node.find(".PhotoCMS_Author p");

          result.body.push({
            type: "image",
            url: imgTag.attr("data-original") || imgTag.attr("src"),
            caption: captionTag.text().trim(),
            imageAuthor: authorTag.text().trim(),
          });
        }
      });

      return result;
    } catch (error) {
      if (i === retries) {
        console.error(`Thất bại sau ${retries} lần thử: ${url}`);
        return null;
      }
      console.log(`Thử lại lần ${i + 1} cho: ${url}`);
      await sleep(2000);
    }
  }
}

async function processCategoryList(inputJson) {
  const result = JSON.parse(JSON.stringify(inputJson));

  for (const category in result) {
    for (const subCategory in result[category]) {
      const articles = result[category][subCategory];

      console.log(
        `--- Đang xử lý: ${category} > ${subCategory} (${articles.length} bài) ---`
      );

      const updatedArticles = [];
      for (const article of articles) {
        try {
          console.log(`Đang cào: ${article.title}`);
          const detail = await scrapeArticleDetail(article.link);

          if (detail) {
            updatedArticles.push({ ...article, ...detail });
          } else {
            updatedArticles.push({ ...article, error: "Lỗi bóc tách" });
          }

          await sleep(1500);
        } catch (err) {
          console.error(`Lỗi bài ${article.link}:`, err.message);
          updatedArticles.push({ ...article, error: err.message });
        }
      }

      //   const updatedArticles = await Promise.all(
      //     articles.map(async (article) => {
      //       try {
      //         const detail = await scrapeArticleDetail(article.link);

      //         if (detail) {
      //           return {
      //             ...article,
      //             ...detail,
      //             crawledAt: new Date().toISOString(),
      //           };
      //         }
      //         return { ...article, error: "Không thể lấy chi tiết" };
      //       } catch (err) {
      //         return { ...article, error: err.message };
      //       }
      //     })
      //   );

      result[category][subCategory] = updatedArticles;
    }
  }
  return result;
}

function readInputJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Lỗi: Không tìm thấy file tại ${filePath}`);
      return {};
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Lỗi khi đọc/parse JSON từ ${filePath}:`, error.message);
    return {};
  }
}

function saveResultJson(data, fileName = "final_data.json") {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Lưu file thành công: ${fileName}`);
}

module.exports = {
  scrapeArticleDetail,
  processCategoryList,
  readInputJson,
  saveResultJson,
};
