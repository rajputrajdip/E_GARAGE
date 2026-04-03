// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId"); // ✅ dynamic user

//   useEffect(() => {
//   if (userId) {
//     fetchBookings();
//   }
// }, [userId]);

//   const fetchBookings = async () => {
//     try {
//       if (!userId) return;
//       const res = await axios.get(
//         `http://localhost:3000/booking/user/${userId}`
//       );
//       setBookings(res.data || []);
//     } catch (err) {
//       console.log("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userId) return <p className="p-6">Please login first</p>;
//   if (loading) return <p className="p-6">Loading your bookings...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings yet ❌</p>
//       ) : (
//         <div className="grid gap-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="border p-5 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold mb-2">
//                 {booking.serviceName}
//               </h3>

//               <p><b>Price:</b> ₹ {booking.price}</p>

//               <p>
//                 <b>Status:</b>{" "}
//                 <span
//                   className={
//                     booking.status === "Pending"
//                       ? "text-orange-500"
//                       : booking.status === "Completed"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }
//                 >
//                   {booking.status}
//                 </span>
//               </p>

//               <p>
//                 <b>Date:</b>{" "}
//                 {new Date(booking.bookingDate).toLocaleDateString()}
//               </p>

//               <p>
//                 <b>Garage:</b>{" "}
//                 {booking.garageId?.garageName || "N/A"}
//               </p>



//               {/* 🔥 View Details Button */}
//               <button
//                 onClick={() => navigate(`/booking/${booking._id}`)}
//                 className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 View Full Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTools, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

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

  // 🔥 STATUS STYLE
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Accepted":
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500 font-semibold">
          Please login first
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        My Bookings
      </h2>

      {/* NO DATA */}
      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No bookings yet ❌
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col justify-between"
            >
              
              {/* TOP */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaTools className="text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.serviceName}
                  </h3>
                </div>

                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Price:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹ {booking.price}
                  </span>
                </p>

                <p className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt />
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>

                <p className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaMapMarkerAlt />
                  {booking.garageId?.garageName || "N/A"}
                </p>

                {/* STATUS BADGE */}
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/booking/${booking._id}`)}
                className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;