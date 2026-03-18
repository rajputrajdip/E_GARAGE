import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function Bookings() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Temporary booking data (later fetch from API)
  const bookingsData = [
    {
      id: 1,
      garage: "AutoFix Garage",
      service: "Oil Change",
      date: "20 Mar 2026",
      status: "Pending"
    },
    {
      id: 2,
      garage: "Speed Motors",
      service: "General Repair",
      date: "18 Mar 2026",
      status: "Completed"
    },
    {
      id: 3,
      garage: "City Garage",
      service: "Engine Check",
      date: "15 Mar 2026",
      status: "Cancelled"
    }
  ];

  const filteredBookings = bookingsData.filter((booking) => {
    return (
      booking.garage.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || booking.status === statusFilter)
    );
  });

  const cancelBooking = (id) => {
    alert("Cancel booking ID: " + id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">

        <div className="flex items-center border rounded px-3 py-2 w-full md:w-1/3">
          <FaSearch className="text-gray-400 mr-2"/>
          <input
            type="text"
            placeholder="Search garage..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* Booking Table */}
      <div className="bg-white rounded shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4">Garage</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Booking Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredBookings.map((booking) => (

              <tr key={booking.id} className="border-b hover:bg-gray-50">

                <td className="py-3 px-4">{booking.garage}</td>

                <td className="py-3 px-4">{booking.service}</td>

                <td className="py-3 px-4">{booking.date}</td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    booking.status === "Pending"
                      ? "text-yellow-500"
                      : booking.status === "Completed"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </td>

                <td className="py-3 px-4">

                  {booking.status === "Pending" && (
                    <button
                      onClick={()=>cancelBooking(booking.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <FaTimes/> Cancel
                    </button>
                  )}

                </td>

              </tr>

            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Bookings;