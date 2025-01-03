// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // 从请求头中获取 token

  if (!token) {
    return res.status(403).json({ code: 0, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ code: 0, message: "Unauthorized" });
    }
    req.adminId = decoded.id; // 将管理员 ID 存储在请求中
    next();
  });
};

module.exports = auth;
