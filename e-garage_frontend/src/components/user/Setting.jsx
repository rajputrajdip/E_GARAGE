// import React from 'react'

// export const Setting = () => {
//   return (
//     <div style={{textAlign:'center'}}>
//         <h1>Setting</h1>
//     </div>
//   )
// }


// import React, { useState } from "react";

// const Setting = () => {
//   const [activeTab, setActiveTab] = useState("profile");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               className="w-full p-2 border rounded-lg"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Update Profile
//             </button>
//           </div>
//         );

//       case "password":
//         return (
//           <div className="space-y-4">
//             <input
//               type="password"
//               placeholder="Current Password"
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full p-2 border rounded-lg"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Change Password
//             </button>
//           </div>
//         );

//       case "vehicle":
//         return (
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Vehicle Name"
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="text"
//               placeholder="Vehicle Number"
//               className="w-full p-2 border rounded-lg"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Add Vehicle
//             </button>
//           </div>
//         );

//       case "notifications":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span>Service Reminder</span>
//               <input type="checkbox" />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Booking Updates</span>
//               <input type="checkbox" />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-5">
//         <h2 className="text-xl font-bold mb-6">Settings</h2>
//         <ul className="space-y-3">
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => setActiveTab("profile")}
//           >
//             Profile
//           </li>
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => setActiveTab("password")}
//           >
//             Password
//           </li>
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => setActiveTab("vehicle")}
//           >
//             My Vehicles
//           </li>
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => setActiveTab("notifications")}
//           >
//             Notifications
//           </li>
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-10">
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;

import React, { useState } from "react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Settings</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Update Profile
            </button>
          </div>
        );

      case "password":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Change Password
            </button>
          </div>
        );

      case "vehicle":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">My Vehicles</h3>
            <input
              type="text"
              placeholder="Vehicle Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Vehicle Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Add Vehicle
            </button>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Settings</h3>
            <div className="flex justify-between items-center">
              <span>Service Reminder</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex justify-between items-center">
              <span>Booking Updates</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          ⚙ Settings
        </h2>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === "profile"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Profile
          </li>

          <li
            onClick={() => setActiveTab("password")}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === "password"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Password
          </li>

          <li
            onClick={() => setActiveTab("vehicle")}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === "vehicle"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            My Vehicles
          </li>

          <li
            onClick={() => setActiveTab("notifications")}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === "notifications"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Notifications
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Setting;