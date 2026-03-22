// components/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const token = localStorage.getItem("token");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch Garages
  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garage/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarages(res.data);
    } catch (err) {
      console.error("Error fetching garages:", err);
    }
  };

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/booking/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGarages();
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "garages" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("garages")}
        >
          Garages
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "bookings" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Users */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Users List</h2>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Garages */}
        {activeTab === "garages" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Garages List</h2>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Garage Name</th>
                  <th className="border px-4 py-2">City</th>
                  <th className="border px-4 py-2">Owner</th>
                </tr>
              </thead>
              <tbody>
                {garages.map((garage, idx) => (
                  <tr key={garage._id}>
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{garage.garageName}</td>
                    <td className="border px-4 py-2">{garage.city}</td>
                    <td className="border px-4 py-2">{garage.garageOwner?.firstName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Bookings List</h2>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Garage</th>
                  <th className="border px-4 py-2">Service</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={b._id}>
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{b.userId?.firstName || "N/A"}</td>
                    <td className="border px-4 py-2">{b.garageId?.garageName || "N/A"}</td>
                    <td className="border px-4 py-2">{b.serviceName || b.serviceId?.serviceName || "N/A"}</td>
                    <td className="border px-4 py-2">{b.price}</td>
                    <td className="border px-4 py-2">{new Date(b.bookingDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;