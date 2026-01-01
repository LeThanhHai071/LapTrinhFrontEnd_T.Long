const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const md5Hash = require("../utils/md5");

const authPath = path.join(__dirname, "../data/auth.json");

function readData() {
    return JSON.parse(fs.readFileSync(authPath, "utf8"));
}

function writeData(data) {
    fs.writeFileSync(authPath, JSON.stringify(data, null, 2));
}

// ===== REGISTER =====
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const data = readData();

    const exists = data.users.find(
        u => u.username === username || u.email === email
    );

    if (exists) {
        return res.status(400).json({
            message: "Username hoặc Email đã tồn tại"
        });
    }

    data.users.push({
        id: Date.now(),
        username,
        email,
        password: md5Hash(password) // 🔐 MD5
    });

    writeData(data);

    res.json({ message: "Đăng ký thành công" });
});

// ===== LOGIN =====
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const data = readData();
    const hashed = md5Hash(password);

    const user = data.users.find(
        u => u.username === username && u.password === hashed
    );

    if (!user) {
        return res.status(401).json({
            message: "Sai tài khoản hoặc mật khẩu"
        });
    }

    res.json({
        message: "Đăng nhập thành công",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
});

module.exports = router;
