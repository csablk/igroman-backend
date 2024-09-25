import instance from "../config/axios.js";
import toast from "react-hot-toast";

const productService = {
  getAll: async (page = 1, limit = 4) => {
    try {
      const response = await instance.get(
        `/product?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Ошибка получения продуктов");
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await instance.get(`/product/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Ошибка получения продукта");
      throw error;
    }
  },
};

export default productService;
