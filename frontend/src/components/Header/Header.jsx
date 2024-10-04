import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center text-white p-4 pb-14">
      <h1 className="text-xl font-semibold">
        <Link to="/">Igroman</Link>
      </h1>
      <nav>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {user.role === "ADMIN" && (
              <p className="cursor-pointer">
                <Link to="/admin">Админ панель</Link>
              </p>
            )}
            <p className="cursor-pointer">
              <Link to="/profile">Профиль</Link>
            </p>
            <p onClick={() => logout()} className="cursor-pointer">
              Выйти
            </p>
          </div>
        ) : (
          <p className="cursor-pointer">
            <Link to="/login">Войти</Link>
          </p>
        )}
      </nav>
    </div>
  );
};

export default Header;
