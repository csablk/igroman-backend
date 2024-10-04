import React, { useEffect, useState } from "react";
import { adminService } from "../services/admin.service.js";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 2;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await adminService.getAll(currentPage, limit);
        if (data) {
          setUsers(data.accounts);
          setTotalPages(data.totalPages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-center  justify-between w-full  h-screen">
      <div className="bg-white h-screen w-full rounded-2xl p-10 text-center flex  flex-col items-center">
        {loading && <p>Загрузка...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <div className="flex gap-5">
                <li key={user._id}>{user.email}</li>
                <li key={user._id}>{user.role}</li>
              </div>
            ))}
          </ul>
        ) : (
          <p>Пользователи не найдены</p>
        )}
      </div>
      <div className="mt-6 flex justify-between w-full max-w-xs ">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mx-1 p-2 bg-gray-300 disabled:opacity-50"
        >
          Назад
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mx-1 p-2 bg-gray-300 disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Admin;
