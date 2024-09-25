import UserModel from "../../models/user.model.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await UserModel.find().select("-password");
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
