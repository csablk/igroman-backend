import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/product.service.js";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Состояние для выбранного изображения

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response.data.post);
        setSelectedImage(response.data.post.images[0]); // Устанавливаем первое изображение из галереи как выбранное
        console.log(response.data.post);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Загрузка...</p>;

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc); // Обновляем выбранное изображение при клике
  };

  return (
    <div className="relative bg-gray-100 p-20 -mt-20 h-auto rounded-t-2xl product-item">
      <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl p-4 rounded-b-2xl text-white bg-green-500 z-10">
        {product.title}
      </h2>

      <div className="text-center items-center flex flex-col mt-10">
        {/* Большое изображение, выбранное из галереи */}
        <img
          src={`http://localhost:8000/${selectedImage}`} // Используем выбранное изображение
          className="max-w-2xl product-image rounded-2xl mb-10 shadow-black shadow-lg"
          alt={product.title}
        />

        {/* Галерея изображений */}
        <div className="flex justify-center mb-10 space-x-4">
          {product.images.map((imgSrc, index) => (
            <img
              key={index}
              src={`http://localhost:8000/${imgSrc}`}
              className={`w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer ${imgSrc === selectedImage ? "border-2 border-green-500" : ""}`} // Выделение выбранного изображения
              alt={`Gallery image ${index + 1}`}
              onClick={() => handleImageClick(imgSrc)} // Обработчик клика для выбора изображения
            />
          ))}
        </div>

        <button className="bg-green-500 text-white font-bold px-10 py-2 rounded-2xl hover:bg-green-700 transition hover:transition mb-10">
          Купить
        </button>
        <p className="opacity-80">{product.text}</p>
      </div>
    </div>
  );
};

export default Product;
