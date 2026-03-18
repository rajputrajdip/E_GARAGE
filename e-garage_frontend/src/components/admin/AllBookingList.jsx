import React, { useEffect, useState } from "react";
import { API } from "../../api";

export const AllBookingList = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from backend
  const getBookings = async () => {
    try {
      const res = await API.get("/bookings"); // Your backend route
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Garage</th>
                <th className="py-2 px-4 border">Service</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-4 border">{booking.userName}</td>
                  <td className="py-2 px-4 border">{booking.garageName}</td>
                  <td className="py-2 px-4 border">{booking.service}</td>
                  <td className="py-2 px-4 border">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};