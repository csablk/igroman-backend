import "./App.css";
import Header from "./components/Header/Header.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth.jsx";
import Product from "./pages/Product.jsx";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <div className="mx-auto mt-20 flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </div>
      </UserProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
