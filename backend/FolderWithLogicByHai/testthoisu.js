const Parser = require('rss-parser');
const parser = new Parser({
    headers: { 'User-Agent': 'Mozilla/5.0...' }
});

async function test() {
    try {
        console.log("Đang thử mục Thời sự...");
        const feed = await parser.parseURL('https://thanhnien.vn/rss/thoi-su.rss');
        console.log("Thành công! Tiêu đề kênh:", feed.title);
    } catch (error) {
        console.log("--- CHI TIẾT LỖI ---");
        console.log("Thông báo:", error.message);
        if (error.response) {
            console.log("Status Code:", error.response.status);
            console.log("Headers trả về:", error.response.headers);
        }
    }
}
test();