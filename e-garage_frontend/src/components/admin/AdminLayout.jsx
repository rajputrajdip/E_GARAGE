import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">
          <li onClick={() => navigate("/admin")} className="cursor-pointer hover:text-blue-400">
            Dashboard
          </li>
          <li onClick={() => navigate("/admin/users")} className="cursor-pointer hover:text-blue-400">
            Users
          </li>
          <li onClick={() => navigate("/admin/garages")} className="cursor-pointer hover:text-blue-400">
            Garages
          </li>
          <li onClick={() => navigate("/admin/bookings")} className="cursor-pointer hover:text-blue-400">
            Bookings
          </li>
          <li onClick={() => navigate("/admin/services")} className="cursor-pointer hover:text-blue-400">
            Services
          </li>
        </ul>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="mt-10 bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;