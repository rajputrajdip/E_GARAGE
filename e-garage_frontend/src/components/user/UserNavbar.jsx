// components/user/UserNavbar.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiClipboard, FiTool, FiLogOut } from "react-icons/fi";

export const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-orange-400">E-Garage</h1>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-orange-400">
            <FiHome /> Home
          </Link>
          <Link to="/garages" className="flex items-center gap-1 hover:text-orange-400">
            <FiTool /> Garages
          </Link>
          <Link to="/user/bookings" className="flex items-center gap-1 hover:text-orange-400">
            <FiClipboard /> Bookings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-400">
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