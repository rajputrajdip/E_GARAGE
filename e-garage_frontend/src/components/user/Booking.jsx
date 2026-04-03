import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaTools } from "react-icons/fa";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, garageId } = location.state || {};
  const [date, setDate] = useState("");

  // 🔥 Tomorrow date
  const getTomorrowDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  // ❌ If no data
  if (!service || !garageId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          No service selected!
        </p>
      </div>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");

    // 🔥 NEW VALIDATION
    if (!date) {
      alert("Please select a booking date!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/booking/create", {
        userId,
        garageId,
        serviceId: service._id,
        serviceName: service.serviceName,
        price: service.price,
        bookingDate: date, // ✅ ONLY selected date
      });

      alert("Booking Successful!");
      navigate("/user/bookings");
    } catch (err) {
      console.log("Booking Error:", err);
      alert("Booking Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <FaTools className="text-orange-500 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            Confirm Your Booking
          </h2>
        </div>

        {/* DETAILS */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Service:</span>{" "}
            {service.serviceName}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Price:</span>{" "}
            <span className="text-green-600 font-bold">
              ₹ {service.price}
            </span>
          </p>

          <p className="text-gray-500 text-sm break-all">
            <span className="font-semibold">Garage ID:</span> {garageId}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleBooking} className="space-y-5">

          {/* DATE INPUT */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaCalendarAlt />
              Select Booking Date
            </label>

            <input
              type="date"
              value={date}
              min={getTomorrowDate()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Confirm Booking
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          You must select a date to confirm your booking.
        </p>
      </div>
    </div>
  );
};

export default Booking;