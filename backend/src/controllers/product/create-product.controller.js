import { validationResult } from "express-validator";
import ProductModel from "../../models/product.model.js";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, text, category } = req.body;
  const userId = req.userId;

  const image = req.file ? `/images/${req.file.filename}` : null;

  try {
    const product = new ProductModel({
      title,
      text,
      category,
      image,
      user: userId,
    });
    await product.save();
    res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
    console.log(error);
  }
};
