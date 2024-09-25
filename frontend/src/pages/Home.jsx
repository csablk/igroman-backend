import React from "react";
import About from "../components/Home/About.jsx";
import Products from "../components/Home/Products.jsx";

const Home = () => {
  return (
    <div className="w-full h-96">
      <About />
      <Products />
    </div>
  );
};

export default Home;
