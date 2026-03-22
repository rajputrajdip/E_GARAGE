// components/admin/AdminNavbar.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiTool, FiLogOut } from "react-icons/fi";

export const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-yellow-400">Admin Panel</h1>
        <div className="flex items-center gap-6">
          <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-yellow-400">
            <FiHome /> Dashboard
          </Link>
         
          <button onClick={handleLogout} className="flex items-center gap-1 hover:text-yellow-400">
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};