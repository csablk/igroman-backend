import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product.service.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll(
          currentPage,
          productsPerPage,
        );
        setProducts(response.products || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-t-3xl p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Наши продукты</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white text-black shadow-black hover:shadow-2xl hover:transition transition cursor-pointer rounded-3xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <img
                src={`http://localhost:8000/${product.image}`}
                className="h-auto w-full rounded-t-2xl"
                alt="image"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                <p className="text-sm mb-2">{truncateText(product.text, 50)}</p>
                <p className="text-sm">Категория: {product.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">Нет доступных продуктов.</p>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handlePrevPage}
          className={`mx-2 px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-700 transition hover:transition text-white"
          }`}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        <button
          onClick={handleNextPage}
          className={`mx-2 px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-700 transition hover:transition text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Products;
