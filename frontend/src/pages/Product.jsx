import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/product.service.js";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response.data.post);
        console.log(response.data.post);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="relative bg-gray-100 p-20 -mt-20 h-auto rounded-t-2xl product-item">
      <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl p-4 rounded-b-2xl text-white bg-blue-500 z-10">
        {product.title}
      </h2>

      <div className="text-center items-center flex flex-col mt-10">
        <img
          src={`http://localhost:8000/${product.image}`}
          className="max-w-2xl product-image rounded-2xl mb-10 shadow-black shadow-lg"
          alt={product.title}
        />
        <button className="bg-blue-500  text-white font-bold px-10 py-2 rounded-2xl hover:bg-blue-700 transition hover:transition mb-10">
          Купить
        </button>
        <p className="opacity-80">{product.text}</p>
      </div>
    </div>
  );
};

export default Product;
