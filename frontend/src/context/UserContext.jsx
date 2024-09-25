import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getProfile(token)
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Ошибка при получении профиля:", error);
          logout();
        });
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
