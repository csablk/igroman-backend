import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const checkAdminRole = async (req, res, next) => {
  const token = (req.headers.authorization || "").split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Нет доступа" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const user = await UserModel.findById(req.userId);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Нет доступа" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: "Нет доступа" });
  }
};
