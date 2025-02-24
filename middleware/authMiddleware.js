const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Extract token correctly
        req.user = { user_id: verified.user_id }; // Ensure user ID is stored correctly
        console.log("rq users",req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
