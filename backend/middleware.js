const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Authorization header missing or invalid format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else{
            return res.status(403).json({ message: "Invalid token: userId missing"});
        }
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({});
    }
};

module.exports =  authMiddleware