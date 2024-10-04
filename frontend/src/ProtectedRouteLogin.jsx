import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRouteLogin = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteLogin;
