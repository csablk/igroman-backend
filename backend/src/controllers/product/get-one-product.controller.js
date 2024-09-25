import ProductModel from "../../models/product.model.js";

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await ProductModel.findById(id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
