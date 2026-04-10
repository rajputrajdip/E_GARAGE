// // components/user/UserNavbar.jsx
// import React from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FiHome, FiClipboard, FiTool, FiLogOut } from "react-icons/fi";

// export const UserNavbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   return (
//     <div>
//       <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-bold tracking-wide text-orange-400">E-Garage</h1>
//         <div className="flex items-center gap-6">
//           <Link to="/" className="flex items-center gap-1 hover:text-orange-400">
//             <FiHome /> Home
//           </Link>
//           <Link to="/garages" className="flex items-center gap-1 hover:text-orange-400">
//             <FiTool /> Garages
//           </Link>
//           <Link to="/user/bookings" className="flex items-center gap-1 hover:text-orange-400">
//             <FiClipboard /> Bookings
//           </Link>
//           <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-400">
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </nav>
//       <div className="p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };




// components/user/UserNavbar.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiTool,
  FiLogOut,
  FiMenu,
  FiUser,
} from "react-icons/fi";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // 🔥 Active link style
  const activeClass = (path) =>
    location.pathname === path
      ? "text-orange-400 font-semibold"
      : "hover:text-orange-400";

  return (
    <div>
      {/* 🔥 NAVBAR */}
       {/* <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center shadow-lg relative ">  */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold text-orange-400 cursor-pointer"
        >
          E-Garage 🚗
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm md:text-base">

          <Link to="/" className={`flex items-center gap-1 ${activeClass("/")}`}>
            <FiHome /> Home
          </Link>

          <Link to="/garages" className={`flex items-center gap-1 ${activeClass("/garages")}`}>
            <FiTool /> Garages
          </Link>

          <Link to="/user/bookings" className={`flex items-center gap-1 ${activeClass("/user/bookings")}`}>
            <FiClipboard /> Bookings
          </Link>

          {/* 🔥 Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 hover:text-orange-400"
            >
              <FiUser /> Profile
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/user/bookings")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Bookings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 Mobile Menu Icon */}
        <div className="md:hidden">
          <FiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </div>

        {/* 🔥 Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-slate-900 text-white flex flex-col gap-4 p-5 md:hidden z-50">

            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link to="/garages" onClick={() => setMobileOpen(false)}>
              Garages
            </Link>

            <Link to="/user/bookings" onClick={() => setMobileOpen(false)}>
              Bookings
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/profile");
              }}
            >
              Profile
            </button>

            <button
  onClick={() => navigate("/profile")}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  My Profile
</button>

            <button
              onClick={handleLogout}
              className="text-red-400 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-15 ">
        <Outlet />
      </div>
    </div>
  );
};



