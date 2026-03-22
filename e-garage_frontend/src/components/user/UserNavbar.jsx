import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiTool
} from "react-icons/fi";

export const UserNavbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-orange-400">
          E-Garage
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* Home */}
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiHome /> Home
          </Link>

          {/* Garages */}
          <Link
            to="/garages"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiTool /> Garages
          </Link>

          {/* Bookings */}
          <Link
            to="/user/bookings"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiClipboard /> Bookings
          </Link>

        </div>
      </nav>

      {/* Page Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};