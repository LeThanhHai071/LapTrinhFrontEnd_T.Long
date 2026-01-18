const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { toggleSave, getSavedList } = require("../utils/articleHandler");
const authPath = path.join(__dirname, "../data/auth.json");

function readData() {
    if (!fs.existsSync(authPath)) return { users: [] };
    const raw = fs.readFileSync(authPath, "utf8");
    if (!raw.trim()) return { users: [] };
    const data = JSON.parse(raw);
    data.users = Array.isArray(data.users) ? data.users : [];
    return data;
}

function writeData(data) {
    const dir = path.dirname(authPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    data.users = Array.isArray(data.users) ? data.users : [];
    fs.writeFileSync(authPath, JSON.stringify(data, null, 2));
}

// ===== REGISTER =====
router.post("/register", (req, res) => {
    const { username, email, password } = req.body; // password = md5

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Thiếu username/email/password" });
    }

    const data = readData();

    const exists = data.users.find(
        (u) => u.username === username || u.email === email
    );

    if (exists) {
        return res.status(400).json({ message: "Username hoặc Email đã tồn tại" });
    }

    data.users.push({
        id: Date.now(),
        username,
        email,
        password,
    });

    writeData(data);
    res.json({ message: "Đăng ký thành công" });
});

// ===== LOGIN =====
router.post("/login", (req, res) => {
    const { username, password } = req.body; // password = md5

    const data = readData();

    const user = data.users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    res.json({
        message: "Đăng nhập thành công",
        user: { id: user.id, username: user.username, email: user.email },
    });
});

// ===== CHANGE PASSWORD =====
router.put("/change-password/:userId", (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Thiếu mật khẩu cũ hoặc mật khẩu mới" });
    }

    const data = readData();
    const idx = data.users.findIndex((u) => String(u.id) === String(userId));

    if (idx === -1) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    if (data.users[idx].password !== oldPassword) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    if (oldPassword === newPassword) {
        return res.status(400).json({ message: "Mật khẩu mới phải khác mật khẩu cũ" });
    }

    data.users[idx].password = newPassword;
    writeData(data);

    return res.json({ message: "Đổi mật khẩu thành công" });
});

//lưu bài báo
router.post("/toggle-save", toggleSave);
// lấy danh sách bài báo đã lưu
router.get("/saved-list/:userId", getSavedList);

module.exports = router;
