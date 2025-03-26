const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No authentication token provided." });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;