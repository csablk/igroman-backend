import { validationResult } from "express-validator";
import ProductModel from "../../models/product.model.js";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);

  // Проверка на ошибки валидации
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, text, category, price } = req.body;
  const userId = req.userId;

  // Загрузка галереи изображений
  const images = req.files.images
    ? req.files.images.map((file) => `/images/${file.filename}`)
    : [];

  try {
    const product = new ProductModel({
      title,
      text,
      category,
      images,
      price,
      user: userId,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
