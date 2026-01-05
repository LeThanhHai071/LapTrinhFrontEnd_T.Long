const Parser = require('rss-parser');
const parser = new Parser();

async function getArticleLinks() {
    // Ví dụ RSS của Thanh Niên - mục Thời sự
    const feed = await parser.parseURL('https://thanhnien.vn/rss/thoi-su.rss');
    
    return feed.items.map(item => ({
        title: item.title,
        link: item.link, // Đây là URL để cào chi tiết
        pubDate: item.pubDate,
        description: item.contentSnippet
    }));
}