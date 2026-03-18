import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiClipboard, FiLogOut } from "react-icons/fi";

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

          <Link
            to="/"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiHome /> Home
          </Link>

          <Link
            to="/user/dashboard"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiHome /> Dashboard
          </Link>

          <Link
            to="/user/bookings"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiClipboard /> Bookings
          </Link>

          <Link
            to="/user/profile"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiUser /> Profile
          </Link>

          <Link
            to="/user/setting"
            className="flex items-center gap-1 hover:text-orange-400"
          >
            <FiSettings /> Settings
          </Link>

          <Link
            to="/user/logout"
            className="flex items-center gap-1 text-red-400 hover:text-red-500"
          >
            <FiLogOut /> Logout
          </Link>

        </div>
      </nav>

      {/* Page Content */}
      <Outlet />

    </div>
  );
};