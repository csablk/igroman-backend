import ProductModel from "../../models/product.model.js";

export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  try {
    const products = await ProductModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalProducts = await ProductModel.countDocuments(); // Общее количество продуктов

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
