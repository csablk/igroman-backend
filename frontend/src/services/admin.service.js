import toast from "react-hot-toast";
import instance from "../config/axios.js";

export const adminService = {
  getAll: async (page = 1, limit = 2) => {
    // Измените значение по умолчанию для limit
    try {
      const response = await instance.get(`/admin/users/${page}/${limit}`, {
        params: { page, limit }, // Используйте query-параметры
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Ошибка получения списка пользователей";
      toast.error(errorMessage);
    }
  },
};
