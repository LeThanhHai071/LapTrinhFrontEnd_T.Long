const Parser = require('rss-parser');
const cheerio = require('cheerio');
const parser = new Parser();

async function parseThanhNienRss(rssUrl) {
    // 1. Tải toàn bộ nội dung RSS về
    const feed = await parser.parseURL(rssUrl);

    return feed.items.map(item => {
        
        const cleanTitle = cheerio.load(item.title).text();

        const $ = cheerio.load(item.content || item.description || '');
        const imageUrl = $('img').attr('src');

        $('a').remove(); 
        const cleanDescription = $.text().trim();

        return {
            title: cleanTitle,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail: imageUrl,
            description: cleanDescription, 
        };
    });
}

module.exports = { parseThanhNienRss };