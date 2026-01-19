const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/savedArticles.json");


const readSavedFile = () => {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            const dir = path.dirname(DATA_PATH);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(DATA_PATH, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DATA_PATH, "utf-8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Lỗi đọc file JSON:", error);
        return [];
    }
};


const writeSavedFile = (data) => {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Lỗi ghi file JSON:", error);
    }
};


const toggleSave = (req, res) => {
    const { userId, articleId, title, imageURL, link } = req.body;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Vui lòng đăng nhập để thực hiện chức năng này!"
        });
    }
    if (!articleId) {
        return res.status(400).json({ message: "Thiếu articleId" });
    }

    let savedList = readSavedFile();

    const existingIndex = savedList.findIndex(
        (item) => String(item.userId) === String(userId) && item.articleId === articleId
    );

    if (existingIndex !== -1) {
        savedList.splice(existingIndex, 1);
        writeSavedFile(savedList);
        return res.status(200).json({
            isSaved: false,
            message: "Đã xóa khỏi danh sách lưu"
        });
    } else {
        const newSave = {
            userId,
            articleId,
            title,
            imageURL,
            link,
            savedAt: new Date().toISOString()
        };
        savedList.push(newSave);
        writeSavedFile(savedList);
        return res.status(201).json({
            isSaved: true,
            message: "Lưu bài báo thành công",
            data: newSave
        });
    }
};


const getSavedList = (req, res) => {
    const { userId } = req.params;
    const allData = readSavedFile();
    const userArticles = allData.filter((item) => String(item.userId) === String(userId));
    res.status(200).json(userArticles);
};

module.exports = {
    toggleSave,
    getSavedList
};