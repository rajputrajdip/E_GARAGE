// components/owner/GarageOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GarageOwnerDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("garages");
  const [newGarageName, setNewGarageName] = useState("");
  const [newCity, setNewCity] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH DATA =================

  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garageowner/garages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garageowner/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGarages();
    fetchBookings();
  }, []);

  // ================= GARAGE =================

  const handleAddGarage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/garageowner/garages",
        { garageName: newGarageName, city: newCity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGarages([...garages, res.data]);
      setNewGarageName("");
      setNewCity("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (garage) => {
    const newName = prompt("Enter new name", garage.garageName);
    if (!newName) return;

    await axios.put(
      `http://localhost:3000/garageowner/garages/${garage._id}`,
      { garageName: newName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchGarages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    await axios.delete(
      `http://localhost:3000/garageowner/garages/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchGarages();
  };

  const handleAddService = async (garageId) => {
    const name = prompt("Service Name");
    const price = prompt("Price");

    if (!name || !price) return;

    await axios.post("http://localhost:3000/service/add", {
      serviceName: name,
      price,
      garageId,
    });

    alert("Service Added ✅");
  };

  // ================= BOOKING =================

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/booking/status/${id}`, {
        status,
      });

      alert("Status Updated ✅");
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Garage Owner Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "garages" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("garages")}
        >
          My Garages
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

      {/* ================= GARAGES ================= */}
      {activeTab === "garages" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Garages</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Garage Name"
              value={newGarageName}
              onChange={(e) => setNewGarageName(e.target.value)}
              className="border p-2 rounded mr-2"
            />

            <input
              type="text"
              placeholder="City"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="border p-2 rounded mr-2"
            />

            <button
              onClick={handleAddGarage}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Garage
            </button>
          </div>

          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Garage Name</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {garages.map((g, idx) => (
                <tr key={g._id}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{g.garageName}</td>
                  <td className="border px-4 py-2">{g.city}</td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(g)}
                      className="bg-yellow-400 px-2 py-1 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(g._id)}
                      className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleAddService(g._id)}
                      className="bg-blue-500 text-white px-2 py-1"
                    >
                      Add Service
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= BOOKINGS ================= */}
      {activeTab === "bookings" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Bookings for My Garages
          </h2>

          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Garage</th>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Booking Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, idx) => (
                <tr key={b._id}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">
                    {b.userId?.firstName} {b.userId?.lastName}
                  </td>
                  <td className="border px-4 py-2">
                    {b.garageId?.garageName}
                  </td>
                  <td className="border px-4 py-2">
                    {b.serviceId?.serviceName}
                  </td>
                  <td className="border px-4 py-2">{b.price}</td>
                  <td className="border px-4 py-2">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>

                  {/* ✅ ACCEPT / REJECT BUTTONS */}
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => updateStatus(b._id, "Accepted")}
                      className="bg-green-500 text-white px-2 py-1 mr-2"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(b._id, "Rejected")}
                      className="bg-red-500 text-white px-2 py-1"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GarageOwnerDashboard;