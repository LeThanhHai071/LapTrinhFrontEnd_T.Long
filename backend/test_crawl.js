const axios = require('axios');
const cheerio = require('cheerio');

async function testSingleLink(url) {
    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' } // Giả lập trình duyệt
        });
        const $ = cheerio.load(data);

        const result = {
            title: $('h1.detail-title [data-role="title"]').text().trim(),
            category: $('.detail-cate a.category-page__name').text().trim(),
            subCategory: $('.detail-cate a[data-role="cate-name"]').text().trim(),
            publishDate: $('[data-role="publishdate"]').text().trim()
        };

        console.log("--- KẾT QUẢ TEST ---");
        console.table(result); // Hiển thị dạng bảng cho dễ nhìn
        
        if (!result.title) console.error("LỖI: Không lấy được tiêu đề!");
    } catch (error) {
        console.error("LỖI KẾT NỐI:", error.message);
    }
}

testSingleLink('https://thanhnien.vn/tong-thong-iran-bat-ngo-tuyen-bo-dang-chien-tranh-toan-dien-voi-israel-my-chau-au-185251228074353612.htm');