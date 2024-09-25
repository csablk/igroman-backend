import UserModel from "../../models/user.model.js";

export const getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "Пользователь не найден" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
