import UserModel from "../../models/user.model.js";

export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(500).json({ error: "Ошибка при удалении" });
    }
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
