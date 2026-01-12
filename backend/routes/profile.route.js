const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const PROFILE_FILE = path.join(__dirname, "../data/profile.json");

/* Helper */
const readProfile = () => {
    if (!fs.existsSync(PROFILE_FILE)) return {};
    return JSON.parse(fs.readFileSync(PROFILE_FILE, "utf-8"));
};

const writeProfile = (data) => {
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(data, null, 2));
};

/* GET profile */
router.get("/:userId", (req, res) => {
    const profiles = readProfile();
    res.json(profiles[req.params.userId] || {});
});

/* SAVE profile */
router.put("/:userId", (req, res) => {
    const profiles = readProfile();
    profiles[req.params.userId] = {
        ...(profiles[req.params.userId] || {}),
        ...req.body
    };
    writeProfile(profiles);
    res.json({ message: "Cập nhật hồ sơ thành công" });
});

module.exports = router;
