const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

function sign(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}

module.exports = { sign };
