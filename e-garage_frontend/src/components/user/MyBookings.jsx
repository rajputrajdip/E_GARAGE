import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // ✅ dynamic user

  useEffect(() => {
  if (userId) {
    fetchBookings();
  }
}, [userId]);

  const fetchBookings = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(
        `http://localhost:3000/booking/user/${userId}`
      );
      setBookings(res.data || []);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return <p className="p-6">Please login first</p>;
  if (loading) return <p className="p-6">Loading your bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet ❌</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {booking.serviceName}
              </h3>

              <p><b>Price:</b> ₹ {booking.price}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    booking.status === "Pending"
                      ? "text-orange-500"
                      : booking.status === "Completed"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {booking.status}
                </span>
              </p>

              <p>
                <b>Date:</b>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>

              <p>
                <b>Garage:</b>{" "}
                {booking.garageId?.garageName || "N/A"}
              </p>



              {/* 🔥 View Details Button */}
              <button
                onClick={() => navigate(`/booking/${booking._id}`)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
              >
                View Full Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;