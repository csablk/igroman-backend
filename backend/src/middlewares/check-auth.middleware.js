import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || "").split(" ")[1]
    if (!token) {
        return res.status(403).json({ error: "Нет доступа" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Нет доступа" });
    }
}