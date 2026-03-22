import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "65fabc1234567890abcd1234"; // TEMP: logged-in user id, replace with actual auth

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
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

  if (loading) return <p className="p-6">Loading your bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet ❌</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded shadow">
              <p>
                <strong>Service:</strong> {booking.serviceName}
              </p>
              <p>
                <strong>Garage:</strong> {booking.garageId?.garageName || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> ₹ {booking.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
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
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;