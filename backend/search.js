const fs = require("fs");
const path = require("path");

const DATA_ARTICLES_DIR = path.join(__dirname, "FolderWithLogicByHai/data_articles");

const removeAccents = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFC");
};

const searchArticles = (keyword) => {
  if (!keyword) return [];

  const searchKey = removeAccents(keyword.toLowerCase().trim());
  //   const articleLinks = new Set();
  const resultsMap = new Map();

  if (!fs.existsSync(DATA_ARTICLES_DIR)) return [];
  const files = fs
    .readdirSync(DATA_ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"));

  files.forEach((file) => {
    try {
      const filePath = path.join(DATA_ARTICLES_DIR, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const categoryName = data.categoryName || "";
      const fullSlug = data.fullSlug || "";

      // 1. Kiểm tra ở cấp Danh mục (categoryName và fullSlug)
      //   const categoryMatch =
      //     removeAccents(data.categoryName.toLowerCase()).includes(searchKey) ||
      //     data.fullSlug.toLowerCase().includes(searchKey);

      // 2. Duyệt qua danh sách bài viết
      if (data.articles && Array.isArray(data.articles)) {
        data.articles.forEach((art) => {
          const title = art.title || "";
          const description = art.description || "";

          const normTitle = removeAccents(title.toLowerCase()).normalize("NFC");
          const normDesc = removeAccents(description.toLowerCase()).normalize(
            "NFC"
          );

          const titleMatch = normTitle.includes(searchKey);
          const descMatch = normDesc.includes(searchKey);

          //   const titleMatch = removeAccents(title.toLowerCase()).includes(
          //     searchKey
          //   );
          //   const descMatch = removeAccents(description.toLowerCase()).includes(
          //     searchKey
          //   );

          // Nếu khớp bất kỳ điều kiện nào:
          // (Danh mục khớp THÌ lấy tất cả bài trong đó) HOẶC (Từng bài khớp lẻ)
          if (titleMatch || descMatch) {
            // if (art.link) {
            //   articleLinks.add(art.link);
            // }
            const articleId =
              art.articleId ||
              (art.link ? art.link.split("/").pop() : null);

            if (articleId && !resultsMap.has(articleId)) {
              resultsMap.set(articleId, {
                articleId: articleId,
                title: title,
                description: description,
                imageURL: art.imageURL,
                pubDate: art.pubDate,
                fullSlug: fullSlug,
                categoryName: categoryName,
              });
            }
          }
        });
      }
    } catch (err) {
      console.error(`Lỗi xử lý file ${file}:`, err.message);
    }
  });

  return Array.from(resultsMap.values());
};

module.exports = { searchArticles };
