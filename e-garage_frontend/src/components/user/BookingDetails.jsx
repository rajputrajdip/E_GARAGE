import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/booking/${id}`);
      console.log(res.data);
      setBooking(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Loading Booking...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Booking Details
        </h2>

        <div className="space-y-3">

          <p>
            <span className="font-semibold">Service:</span> {booking.serviceName}
          </p>

          <p>
            <span className="font-semibold">Price:</span> ₹ {booking.price}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                booking.status === "Pending"
                  ? "bg-yellow-500"
                  : booking.status === "Completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {booking.status}
            </span>
          </p>

          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </p>

        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Garage:</span>{" "}
            {booking.garageId?.garageName || "N/A"}
          </p>

          <p>
            <span className="font-semibold">User:</span>{" "}
            {booking.userId?.firstName || "N/A"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default BookingDetails;