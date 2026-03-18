import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  FiUsers, 
  FiHome, 
  FiClipboard, 
  FiDollarSign, 
  FiMenu 
} from "react-icons/fi";

export const AdminSidebar = () => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className={`bg-gray-900 text-white p-5 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"}`}>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="mb-6 text-white text-2xl"
        >
          <FiMenu />
        </button>

        <ul className="space-y-6">

          {/* Users */}
          <li>
            <Link 
              to="/admin/users" 
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FiUsers />
              {isOpen && <span>Users</span>}
            </Link>
          </li>

          {/* Garages */}
          <li>
            <Link 
              to="/admin/garages" 
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FiHome />
              {isOpen && <span>Garages</span>}
            </Link>
          </li>

          {/* Bookings */}
          <li>
            <Link 
              to="/admin/bookings" 
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FiClipboard />
              {isOpen && <span>Bookings</span>}
            </Link>
          </li>

          {/* Payments */}
          <li>
            <Link 
              to="/admin/payments" 
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FiDollarSign />
              {isOpen && <span>Payments</span>}
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};


