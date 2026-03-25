import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Data
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/user/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const fetchGarages = async () => {
    const res = await axios.get("http://localhost:3000/garage/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGarages(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:3000/booking/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchGarages();
    fetchBookings();
  }, []);

  // 🔥 Update Booking Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/booking/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Filter
  const filteredUsers = users.filter((u) =>
    u.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const updateGarageStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:3000/garage/status/${id}`,
      { status }
    );
    fetchGarages();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded">
          Users: {users.length}
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          Garages: {garages.length}
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded">
          Bookings: {bookings.length}
        </div>
        <div className="bg-purple-500 text-white p-4 rounded">
          Revenue: ₹
          {bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["users", "garages", "bookings"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* USERS */}
      {activeTab === "users" && (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={u._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* GARAGES */}
      {activeTab === "garages" && (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((g, i) => (
              <tr key={g._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{g.garageName}</td>
                <td>{g.city}</td>
                <td>{g.garageOwner?.firstName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* BOOKINGS */}
      {activeTab === "bookings" && (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Garage</th>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{b.userId?.firstName || "N/A"}</td>
                <td>{b.garageId?.garageName || "N/A"}</td>
                <td>{b.serviceId?.serviceName || "N/A"}</td>
                <td>₹{b.price}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>

                {/* 🔥 STATUS UPDATE */}
                <td>
                  <select
                    value={b.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(b._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;