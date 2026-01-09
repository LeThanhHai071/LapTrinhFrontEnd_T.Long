const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'data_Hai');

// Hàm loại bỏ dấu tiếng Việt để search chính xác hơn
const removeAccents = (str) => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
};

const getAllFiles = (dirPath) => {
    let results = [];
    // Kiểm tra thư mục có tồn tại không để tránh crash
    if (!fs.existsSync(dirPath)) return [];

    const list = fs.readdirSync(dirPath);
    list.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        } else if (file.endsWith('.json')) {
            results.push(filePath);
        }
    });
    return results;
};

const searchAllData = (keyword) => {
    if (!keyword) return [];

    const searchKey = keyword.toLowerCase().trim();
    const searchKeyNoAccent = removeAccents(searchKey);
    // Tạo slug để khớp với tên file (thay khoảng trắng bằng gạch ngang)
    const searchKeySlug = searchKeyNoAccent.replace(/\s+/g, '-');

    const allFiles = getAllFiles(BASE_DIR);
    let finalResults = [];

    allFiles.forEach(filePath => {
        console.log("Đang check file:", fileName, "với từ khóa:", searchKeySlug);
        try {
            const fileName = path.basename(filePath, '.json');
            const fileNameNoAccent = removeAccents(fileName.replace(/-/g, ' '));

            // 1. Kiểm tra xem Tên File có khớp từ khóa không
            const isCategoryMatch = fileNameNoAccent.includes(searchKeyNoAccent) ||
                fileName.includes(searchKeySlug);

            const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const dataArray = Array.isArray(rawData) ? rawData : [rawData];

            dataArray.forEach(item => {
                // 2. Kiểm tra nội dung bên trong bài viết (Title, Sapo...)
                const itemString = JSON.stringify(item).toLowerCase();
                const itemStringNoAccent = removeAccents(itemString);

                const isContentMatch = itemStringNoAccent.includes(searchKeyNoAccent);

                if (isCategoryMatch || isContentMatch) {
                    finalResults.push({
                        ...item,
                        _source: fileName,
                        _isInDetail: filePath.includes('details')
                    });
                }
            });
        } catch (err) {
            console.error(`Lỗi đọc file tại ${filePath}:`, err);
        }
    });

    // Lọc trùng theo articleId hoặc title
    return Array.from(new Map(finalResults.map(item => [item.articleId || item.title, item])).values());
};

module.exports = { searchAllData };