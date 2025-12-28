const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeFullDetail(url) {
    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' }
        });
        const $ = cheerio.load(data);

        // 1. Lấy Metadata (Thông tin bao quát)
        const articleData = {
            url: url,
            categoryParent: $('.detail-cate a.category-page__name').text().trim(),
            categoryName: $('.detail-cate a[data-role="cate-name"]').text().trim(),
            title: $('h1.detail-title [data-role="title"]').text().trim(),
            publishDate: $('[data-role="publishdate"]').text().trim(),
            sapo: $('.detail-sapo').text().trim(),
            content: [] // Mảng chứa các block nội dung theo thứ tự
        };

        // 2. Lấy nội dung chi tiết (Main Content)
        // Container chính của bài báo Thanh Niên thường là [data-role="content"]
        const contentBlock = $('[data-role="content"]');

        contentBlock.find('p, h2, h3, div.img-contain, figure img').each((index, element) => {
            const tagName = element.name;
            const $el = $(element);

            // Phân loại dữ liệu dựa trên thẻ
            if (['h2', 'h3'].includes(tagName)) {
                articleData.content.push({ type: 'heading', level: tagName, text: $el.text().trim() });
            } 
            else if (tagName === 'p') {
                // Lấy text trong p, bao gồm cả các thẻ span bên trong
                const text = $el.text().trim();
                if (text) articleData.content.push({ type: 'paragraph', text: text });
            } 
            else if (tagName === 'img' || $el.find('img').length > 0) {
                const imgTag = tagName === 'img' ? $el : $el.find('img');
                const imgSrc = imgTag.attr('data-src') || imgTag.attr('src');
                const imgAlt = imgTag.attr('alt') || '';
                
                if (imgSrc) {
                    articleData.content.push({ type: 'image', src: imgSrc, alt: imgAlt });
                }
            }
        });

        // 3. In kết quả ra để kiểm tra (Test Console)
        console.log("=== THÔNG TIN CHUNG ===");
        console.log(`Tiêu đề: ${articleData.title}`);
        console.log(`Chuyên mục: ${articleData.categoryParent} > ${articleData.categoryName}`);
        
        console.log("\n=== CHI TIẾT NỘI DUNG (MAIN CONTENT) ===");
        articleData.content.forEach((item, i) => {
            console.log(`[Block ${i}] [${item.type.toUpperCase()}]: ${item.text || item.src}`);
        });

        return articleData;

    } catch (error) {
        console.error("Lỗi khi test link:", error.message);
    }
}

// Tạo một hàm chính để chạy các tác vụ bất đồng bộ theo thứ tự
async function main() {
    const testUrl = "https://thanhnien.vn/chien-su-ukraine-ngay-1403-nga-tan-cong-ram-ro-185251227212023663.htm";
    
    console.log("Đang bắt đầu cào dữ liệu...");

    // THÊM await Ở ĐÂY để đợi dữ liệu trả về xong mới chạy tiếp
    const articleData = await scrapeFullDetail(testUrl); 

    if (articleData) {
        // Ghi vào file sau khi đã có dữ liệu thực sự
        fs.writeFileSync('data.json', JSON.stringify(articleData, null, 2), 'utf-8');
        console.log("✅ Đã lưu dữ liệu vào file data.json thành công!");
    } else {
        console.error("❌ Không lấy được dữ liệu để lưu.");
    }
}

main();