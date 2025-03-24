const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  if (!token) {
    return res.status(401).json({ error: "No authentication token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the full decoded token (contains userId and email)
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;