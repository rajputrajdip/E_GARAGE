import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";

export const AllUserList = () => {

  const [users, setUsers] = useState([]);

  // Fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/user/${id}`);
      alert("User Deleted Successfully");
      getUsers(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">

          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">First Name</th>
              <th className="py-2 px-4 border">Last Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-100">

                  <td className="py-2 px-4 border">{user.firstName}</td>
                  <td className="py-2 px-4 border">{user.lastName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>

                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};