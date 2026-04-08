// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const BookingDetails = () => {
//   const { id } = useParams();
//   const [booking, setBooking] = useState(null);

//   useEffect(() => {
//     fetchBooking();
//   }, []);

//   const fetchBooking = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/booking/${id}`);
//       console.log(res.data);
//       setBooking(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!booking) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold animate-pulse">Loading Booking...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
//           Booking Details
//         </h2>

//         <div className="space-y-3">

//           <p>
//             <span className="font-semibold">Service:</span> {booking.serviceName}
//           </p>

//           <p>
//             <span className="font-semibold">Price:</span> ₹ {booking.price}
//           </p>

//           <p>
//             <span className="font-semibold">Status:</span>{" "}
//             <span
//               className={`px-2 py-1 rounded text-white ${
//                 booking.status === "Pending"
//                   ? "bg-yellow-500"
//                   : booking.status === "Completed"
//                   ? "bg-green-500"
//                   : "bg-red-500"
//               }`}
//             >
//               {booking.status}
//             </span>
//           </p>

//           <p>
//             <span className="font-semibold">Date:</span>{" "}
//             {new Date(booking.bookingDate).toLocaleDateString()}
//           </p>

//         </div>

//         <hr className="my-4" />

//         <div className="space-y-2">
//           <p>
//             <span className="font-semibold">Garage:</span>{" "}
//             {booking.garageId?.garageName || "N/A"}
//           </p>

//           <p>
//             <span className="font-semibold">User:</span>{" "}
//             {booking.userId?.firstName || "N/A"}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BookingDetails;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaRupeeSign, 
  FaTools, 
  FaStore, 
  FaUser, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaInfoCircle,
  FaReceipt,
  FaIdCard
} from "react-icons/fa";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/booking/${id}`);
      console.log(res.data);
      setBooking(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: <FaClock className="text-yellow-500" />, label: "Pending" };
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: <FaCheckCircle className="text-green-500" />, label: "Completed" };
      case "Cancelled":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: <FaTimesCircle className="text-red-500" />, label: "Cancelled" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", icon: <FaInfoCircle className="text-gray-500" />, label: status || "Unknown" };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading Booking Details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaReceipt className="text-red-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Not Found</h3>
          <p className="text-gray-500 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/user/bookings")}
            className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all duration-300"
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(booking.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 md:py-12">
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Bookings</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm mb-3">
            <FaReceipt />
            <span>Booking Confirmation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Booking Details
          </h1>
          <p className="text-gray-500 mt-2">
            Booking ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{id}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Main Content - 2 columns */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Service Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaTools className="text-xl" />
                  <h3 className="font-semibold">Service Information</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service Name</span>
                  <span className="font-semibold text-gray-800">{booking.serviceName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="text-2xl font-bold text-green-600 flex items-center gap-0.5">
                    <FaRupeeSign className="text-xl" /> {booking.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="text-gray-700 flex items-center gap-1">
                    <FaCalendarAlt className="text-indigo-400 text-xs" />
                    {formatDate(booking.bookingDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Garage & User Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaInfoCircle className="text-xl" />
                  <h3 className="font-semibold">Additional Information</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaStore className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Garage</p>
                    <p className="font-medium text-gray-800">{booking.garageId?.garageName || "N/A"}</p>
                    {booking.garageId?.city && (
                      <p className="text-xs text-gray-500 mt-1">{booking.garageId.city}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaUser className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Customer</p>
                    <p className="font-medium text-gray-800">
                      {booking.userId?.firstName || "N/A"} {booking.userId?.lastName || ""}
                    </p>
                    {booking.userId?.email && (
                      <p className="text-xs text-gray-500 mt-1">{booking.userId.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 px-5 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaCheckCircle className="text-xl" />
                  <h3 className="font-semibold">Quick Actions</h3>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <button
                  onClick={() => navigate("/user/bookings")}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <FaReceipt />
                  View All Bookings
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <FaArrowLeft />
                  Go Back
                </button>
              </div>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-5 border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <FaIdCard className="text-indigo-500" />
                <h4 className="font-semibold text-gray-700">Booking Summary</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID</span>
                  <span className="font-mono text-xs text-gray-600">{id?.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Type</span>
                  <span className="text-gray-700">{booking.serviceName?.length > 20 ? booking.serviceName.slice(0,20)+"..." : booking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-bold text-green-600">₹{booking.price}</span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-2xl shadow-md p-5 text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Need Help?</p>
              <p className="text-sm text-gray-600">Contact our support team</p>
              <p className="text-xs text-indigo-500 mt-1">support@egarage.com</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <span>✓ This is your official booking confirmation</span>
            <span>✓ Please keep this for reference</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;