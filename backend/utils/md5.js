const crypto = require("crypto");

module.exports = function md5Hash(text) {
    return crypto.createHash("md5").update(text).digest("hex");
};
