import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, garageId } = location.state || {};

  const [date, setDate] = useState("");

  // ✅ Get logged-in user
  const userId = localStorage.getItem("userId");

  // ❌ If no data
  if (!service || !garageId) {
    return <p className="p-6 text-red-500">No service selected!</p>;
  }

  const handleBooking = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  if (!userId) return alert("Please login first!");

  
  console.log("Sending Data:", {
    userId,
    garageId: garageId,
    serviceId: service._id,
  });

  try {
    const res = await axios.post("http://localhost:3000/booking/create", {
      userId,
      garageId: garageId, // 🔥 FIX HERE
      serviceId: service._id,
      serviceName: service.serviceName,
      price: service.price,
      bookingDate: date || new Date(),
    });

    alert("Booking Successful!");
    navigate("/user/bookings");
  } catch (err) {
    console.log("Booking Error:", err);
    alert("Booking Failed!");
  }
};
  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Booking Service</h2>

      <p>
        <strong>Service:</strong> {service.serviceName}
      </p>
      <p>
        <strong>Price:</strong> ₹ {service.price}
      </p>
      <p>
        <strong>Garage ID:</strong> {garageId}
      </p>

      <form onSubmit={handleBooking} className="mt-4 flex flex-col gap-4">
        <label>
          Booking Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;