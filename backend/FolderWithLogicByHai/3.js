const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

const SOURCE_DIR = path.join(__dirname, "data_articles");
const DEST_DIR = path.join(__dirname, "data_details");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const axiosInstance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  timeout: 10000,
});

async function crawlDetail(url) {
  try {
    const { data } = await axiosInstance.get(url);
    const $ = cheerio.load(data);
    const main = $("div.main");

    const title = main
      .find('.detail-title, [data-role="title"]')
      .first()
      .text()
      .trim();

    const sapo = main
      .find('.detail-sapo, [data-role="sapo"]')
      .first()
      .text()
      .trim();

    let categories = [];
    const cateContainer = main.find(".detail-cate");
    if (cateContainer.length > 0) {
      const parent = cateContainer
        .find('[data-role="cate-name-parent"]')
        .text()
        .trim();
      const child = cateContainer.find('[data-role="cate-name"]').text().trim();

      if (parent) categories.push(parent);
      if (child && child !== parent) categories.push(child);
    }
    if (categories.length === 0) {
      const singleCate = main
        .find('.category-name, [data-role="cate-name"]')
        .first()
        .text()
        .trim();
      if (singleCate) {
        categories.push(singleCate);
      }
    }

    const infoContainer = main.find(".detail-info");
    const publishDate =
      infoContainer.find("[data-role='publishdate']").length > 0
        ? infoContainer.find("[data-role='publishdate']").text().trim()
        : infoContainer.find(".detail-time").text().trim();

    const authorContainer = infoContainer.find(".detail-author");
    const authorName = authorContainer.find(".name").text().trim();
    const authorImg = authorContainer.find(".avatar img").attr("src");
    const authorEmail = authorContainer.find(".email, .mail").text().trim();

    let content = [];
    const contentWrapper = main.find(".detail-content"); //.detail-cmain .detail-content
    contentWrapper
      .find(
        'script, style, template, iframe, [class*="ads"], [id*="ads"], [id*="zone"], [class*="zone"], [id^="zone-"], [class^="zone-"], .clearfix',
      )
      .remove();

    const children = contentWrapper.children();

    // contentWrapper.children().each((i, el) => {
    //   const $el = $(el);

    //   if ($el.hasClass("VCSortableInPreviewMode")) {
    //     const type = $el.attr("type");

    //     if (type === "Photo" || type === "photo-grid-album") {
    //       const captionText = $el
    //         .find(".PhotoCMS_Caption, figcaption, .imgcaption, p")
    //         .first()
    //         .text()
    //         .trim();

    //       content.push({ type: "image_block", urls: images, captionText });
    //     }
    //   } else if (
    //     $el.is("table") ||
    //     $el.find("table").length > 0 ||
    //     $el.find("img").length > 0
    //   ) {
    //     const hasImg = $el.find("img").length > 0;

    //     if (hasImg) {
    //       let images = [];
    //       $el.find("img").each((j, img) => {
    //         const src = $(img).attr("src") || $(img).attr("data-src");
    //         if (src) images.push(src);
    //       });

    //       const caption = $el
    //         .find(".imgcaption, .pswp-content__caption, p")
    //         .first()
    //         .text()
    //         .trim();

    //       content.push({ type: "image_block", urls: images, caption });
    //     }
    //     const contentTags = ["p", "h2", "h3", "div", "blockquote"];
    //     if (!contentTags.includes(el.name)) {
    //       return;
    //     } else {
    //       $el
    //         .find(
    //           'script, style, template, iframe, [class*="ads"], [id*="ads"], [id^="zone-"]'
    //         )
    //         .remove();
    //       const text = $el.text().replace(/\s+/g, " ").trim();
    //       if (text.length > 2) {
    //         content.push({
    //           type: "text",
    //           content: text,
    //         });
    //       }
    //     }
    //   } else {
    //     const contentTags = ["p", "h2", "h3", "div", "blockquote"];
    //     if (!contentTags.includes(el.name)) return;

    //     $el
    //       .find(
    //         'script, style, template, iframe, [class*="ads"], [id*="ads"], [id^="zone-"]'
    //       )
    //       .remove();

    //     const text = $el.text().replace(/\s+/g, " ").trim();

    //     if (text.length > 2) {
    //       content.push({
    //         type: "text",
    //         content: text,
    //       });
    //     }
    //   }
    // });
    children.each((i, el) => {
      const $el = $(el);
      const tagName = el.name;
      // const contentTags = ["p", "h2", "h3", "div", "blockquote", "table"];

      const classList = $el.attr("class") || "";

      // if (!contentTags.includes(tagName)) return;

      let processedAsImage = false;

      if (
        $el.hasClass("VCSortableInPreviewMode") ||
        $el.is(".VCSortableInPreviewMode")
      ) {
        const type = ($el.attr("type") || "").toLowerCase();
        if (type === "photo" || type === "photo-grid-album") {
          let images = [];
          $el.find("img").each((j, img) => {
            const src =
              $(img).attr("src") ||
              $(img).attr("data-src") ||
              $(img).attr("data-original");

            if (src) images.push(src);
          });
          if (images.length > 0) {
            const captionText = $el
              .find(".PhotoCMS_Caption, figcaption, .imgcaption, p")
              .first()
              .text()
              .trim();

            content.push({
              type: "image_block",
              urls: images,
              caption: captionText,
            });
            processedAsImage = true;
          } else {
            console.warn("Tìm thấy block Photo nhưng không lấy được link ảnh.");
          }
        }
      } else if ($el.is("table") || $el.find("table, img").length > 0) {
        const imgInEl = $el.find("img");

        if (imgInEl.length > 0) {
          let images = [];
          imgInEl.each((j, img) => {
            const src = $(img).attr("src") || $(img).attr("data-src");

            if (src) images.push(src);
          });

          let caption = $el
            .find(".imgcaption, .pswp-content__caption")
            .first()
            .text()
            .trim();
          if (!caption) {
            caption = $el.find("p").first().text().trim();
          }

          content.push({ type: "image_block", urls: images, caption: caption });
          processedAsImage = true;

          const $clone = $el.clone();
          $clone
            .find("table, img, .imgcaption, .pswp-content__caption, figcaption")
            .remove();

          const outsideText = $clone.text().replace(/\s+/g, " ").trim();
          if (outsideText.length > 2) {
            let contentType = "text";
            if (tagName === "h2") contentType = "h2";
            else if (tagName === "h3") contentType = "h3";
            content.push({ type: contentType, content: outsideText });
          }
        }
      }

      if (!processedAsImage) {
        $el
          .find('script, style, template, iframe, [class*="ads"], [id*="ads"]')
          .remove();

        const text = $el.text().replace(/\s+/g, " ").trim();
        if (text.length > 2) {
          let contentType = "text";
          if (tagName === "h2") contentType = "h2";
          else if (tagName === "h3") contentType = "h3";
          content.push({
            type: contentType,
            content: text,
          });
        }
      }
    });
    return {
      title,
      categories,
      sapo,
      publishDate,
      author: { name: authorName, avatar: authorImg, email: authorEmail },
      content,
      sourceUrl: url,
    };
  } catch (error) {
    console.error(`|-- Lỗi khi crawl link: ${url} - ${error.message}`);
    return null;
  }
}

async function runStep3() {
  try {
    await fs.mkdir(DEST_DIR, { recursive: true });

    // Đọc danh sách file từ Bước 2
    const files = await fs.readdir(SOURCE_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    for (const file of jsonFiles) {
      const sourceFilePath = path.join(SOURCE_DIR, file);
      const rawData = await fs.readFile(sourceFilePath, "utf-8");
      const categoryContent = JSON.parse(rawData);
      let isChanged = false;

      for (const item of categoryContent.articles) {
        // Lấy ID từ link bài viết (Ví dụ: ...18525120918320004.htm -> 18525120918320004)
        const idMatch = item.link.match(/-(\d+)\.htm/);
        if (!idMatch) continue;
        const articleId = idMatch[1];
        const destFile = path.join(DEST_DIR, `${articleId}.json`);

        let detailData = null;

        try {
          // 1. Kiểm tra nếu file chi tiết đã tồn tại thì đọc từ ổ cứng
          const existingDetail = await fs.readFile(destFile, "utf-8");
          detailData = JSON.parse(existingDetail);
        } catch {
          // 2. Nếu chưa có thì mới tiến hành crawl
          console.log(`   > Đang bóc tách bài mới: ${articleId}`);
          detailData = await crawlDetail(item.link);
          if (detailData) {
            detailData.id = articleId;
            await fs.writeFile(destFile, JSON.stringify(detailData, null, 2));
            await sleep(1000);
          }
        }

        if (
          detailData &&
          detailData.categories &&
          detailData.categories.length > 0
        ) {
          // Lấy category cuối cùng trong mảng (thường là category con, chính xác nhất)
          const exactCategory =
            detailData.categories[detailData.categories.length - 1];

          if (item.categoryName !== exactCategory) {
            item.categoryName = exactCategory;
            isChanged = true;
          }
        }
      }
      if (isChanged) {
        await fs.writeFile(
          sourceFilePath,
          JSON.stringify(categoryContent, null, 2),
        );
        console.log(`=> Đã cập nhật categoryName cho file: ${file}`);
      }
    }
    console.log("\nHOÀN THÀNH TOÀN BỘ BƯỚC 3!");
  } catch (error) {
    console.error("Lỗi hệ thống Bước 3:", error);
  }
}

module.exports = { runStep3 };
// crawlDetail(
//   "https://thanhnien.vn/tau-lan-bien-mat-duoi-bang-nam-cuc-sau-khi-phat-hien-cau-truc-ngam-bi-an-185260111110118489.htm"
// );
