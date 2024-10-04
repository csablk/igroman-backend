import UserModel from "../../models/user.model.js";

export const getAccounts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const accounts = await UserModel.find()
      .select("-password")
      .skip(skip)
      .limit(Number(limit));

    const totalAccounts = await UserModel.countDocuments();

    res.json({
      accounts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalAccounts / limit),
      totalAccounts,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
