import { validationResult } from "express-validator";
import UserModel from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existinsUser = await UserModel.findOne({ email });
    if (existinsUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с такой почтой уже существует" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email,
      password: hashedPassword,
      role,
    });

    user.save();

    res.status(201).json({ message: "Пользователь успешно создан" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
