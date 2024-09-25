import ProductModel from "../../models/product.model.js";

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Успешное удаление продукта" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};
