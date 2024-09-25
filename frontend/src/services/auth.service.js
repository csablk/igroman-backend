import instance from "../config/axios.js";
import toast from "react-hot-toast";

const authService = {
  register: async (email, password) => {
    try {
      const response = await instance.post("/auth/register", {
        email,
        password,
      });
      toast.success("Успешная регистрация");
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.response?.data?.error || "Ошибка регистрации";
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await instance.post(`/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Успешная авторизация");

      const user = await authService.getProfile(token);
      return user;
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.error || "Ошибка авторизации";
      toast.error(errorMessage);
      throw error;
    }
  },

  getProfile: async (token) => {
    try {
      const response = await instance.get(`/user/get-profile`);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching profile:", error);
      const errorMessage =
        error.response?.data?.error || "Ошибка получения профиля";
      toast.error(errorMessage);
      throw error;
    }
  },
};

export default authService;
