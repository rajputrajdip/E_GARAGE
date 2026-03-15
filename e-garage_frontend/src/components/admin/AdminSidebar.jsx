// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";

// export const AdminSidebar = () => {

//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen">

//       {/* SIDEBAR */}
//       <div className={`bg-gray-900 text-white p-5 transition-all duration-300 
//         ${isOpen ? "w-64" : "w-16"}`}>

//         <button
//           className="mb-6 text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>

//         <ul className="space-y-4 font-medium">

//           <li>
//             <Link to="/admin/dashboard" className="block hover:text-blue-400">
//               Dashboard
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/users" className="block hover:text-blue-400">
//               Users
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/settings" className="block hover:text-blue-400">
//               Settings
//             </Link>
//           </li>

//           <li>
//             <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
//               Logout
//             </button>
//           </li>

//         </ul>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 p-6 bg-gray-100">
//         <Outlet/>
//       </div>

//     </div>
//   );
// };

import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div
        className={`bg-gray-900 text-white flex flex-col justify-between transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}`}
      >
        <div>
          {/* Toggle Button */}
          <button
            className="p-3 focus:outline-none hover:bg-gray-800 w-full text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* Menu Items */}
          <ul className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded hover:bg-gray-800 transition-colors duration-200 ${
                    location.pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  {/* Optional icon placeholder */}
                  <span className="text-lg">{item.name[0]}</span>
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mb-4 px-2">
          <button className="bg-red-500 w-full py-2 rounded hover:bg-red-600 transition-colors duration-200">
            {isOpen ? "Logout" : "⎋"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};



