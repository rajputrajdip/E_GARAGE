// import React from 'react'

// export const AllUserList = () => {
//   return (
//     <div>
//         <h1>AllUserList</h1>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export const AllUserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // show 5 users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Filtered users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div className="bg-gray-900 text-white w-64 p-5 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-3 hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
            Dashboard
          </li>
          <li className="mb-3 hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
            All Users
          </li>
          <li className="mb-3 hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
            Garage Owners
          </li>
          <li className="mb-3 hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
            Services
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-4">All Users</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, idx) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{idx + 1 + (currentPage - 1) * usersPerPage}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-gray-800 text-white" : "bg-white border"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};