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
      setBooking(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!booking) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

      <p><strong>Service:</strong> {booking.serviceName}</p>
      <p><strong>Price:</strong> ₹ {booking.price}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(booking.bookingDate).toLocaleDateString()}
      </p>

      <hr className="my-3" />

      <p><strong>Garage:</strong> {booking.garageId?.garageName}</p>
      <p><strong>User:</strong> {booking.userId?.firstName}</p>
    </div>
  );
};

export default BookingDetails;