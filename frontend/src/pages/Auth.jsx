import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext.jsx";

const Auth = () => {
  const Form = {
    LOGIN: "login",
    REGISTER: "register",
  };

  const [formType, setFormType] = useState(Form.REGISTER);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const handleChangeForm = () => {
    setFormType((prevType) =>
      prevType === Form.LOGIN ? Form.REGISTER : Form.LOGIN,
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === Form.REGISTER) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Пароли не совпадают!");
        return;
      }

      try {
        await authService.register(formData.email, formData.password);

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });

        setFormType(Form.LOGIN);
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      try {
        const user = await authService.login(formData.email, formData.password);

        loginUser(user);

        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center text-center pt-8 pb-8 rounded-3xl bg-white max-w-96">
      <div className="flex justify-center items-center text-center rounded-3xl flex-col">
        <div className="flex flex-col gap-12 w-96">
          <h2 className="text-3xl font-semibold">
            {formType === Form.LOGIN ? "Авторизация" : "Регистрация"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Почта"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {formType === Form.REGISTER && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтверждение пароля"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <button type="submit" className="mt-5">
              {formType === Form.LOGIN ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          <button onClick={handleChangeForm} className="font-semibold">
            {formType === Form.LOGIN ? "Нет аккаунта?" : "Есть аккаунт?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
