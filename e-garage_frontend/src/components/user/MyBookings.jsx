


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaTools, 
//   FaCalendarAlt, 
//   FaMapMarkerAlt, 
//   FaRupeeSign, 
//   FaClock, 
//   FaCheckCircle, 
//   FaTimesCircle,
//   FaHourglassHalf,
//   FaEye,
//   FaReceipt,
//   FaCar,
//   FaWrench,
//   FaArrowLeft
// } from "react-icons/fa";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (userId) {
//       fetchBookings();
//     }
//   }, [userId]);

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

//   // Status styling
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Pending":
//         return { 
//           bg: "bg-yellow-100", 
//           text: "text-yellow-700", 
//           border: "border-yellow-200",
//           icon: <FaHourglassHalf className="text-yellow-500" />,
//           label: "Pending"
//         };
//       case "Accepted":
//         return { 
//           bg: "bg-blue-100", 
//           text: "text-blue-700", 
//           border: "border-blue-200",
//           icon: <FaCheckCircle className="text-blue-500" />,
//           label: "Accepted"
//         };
//       case "Completed":
//         return { 
//           bg: "bg-green-100", 
//           text: "text-green-700", 
//           border: "border-green-200",
//           icon: <FaCheckCircle className="text-green-500" />,
//           label: "Completed"
//         };
//       case "Rejected":
//       case "Cancelled":
//         return { 
//           bg: "bg-red-100", 
//           text: "text-red-700", 
//           border: "border-red-200",
//           icon: <FaTimesCircle className="text-red-500" />,
//           label: status
//         };
//       default:
//         return { 
//           bg: "bg-gray-100", 
//           text: "text-gray-700", 
//           border: "border-gray-200",
//           icon: <FaClock className="text-gray-500" />,
//           label: status || "Unknown"
//         };
//     }
//   };

//   // Filter bookings
//   const filteredBookings = bookings.filter((booking) => {
//     if (filterStatus === "all") return true;
//     return booking.servicestatus?.toLowerCase() === filterStatus.toLowerCase();
//   });

//   // Stats
//   const totalBookings = bookings.length;
//   const pendingCount = bookings.filter(b => b.serviceStatus === "Pending").length;
//   const completedCount = bookings.filter(b => b.serviceStatus === "Completed").length;

//   if (!userId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaCar className="text-red-500 text-3xl" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Please Login First</h3>
//           <p className="text-gray-500 mb-6">You need to be logged in to view your bookings.</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all duration-300"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-lg">Loading your bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 md:py-12">
      
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm mb-3">
//                 <FaReceipt />
//                 <span>Your Bookings</span>
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//                 My Bookings
//               </h1>
//               <p className="text-gray-500 mt-2">
//                 Track and manage all your service appointments
//               </p>
//             </div>
//             <button
//               onClick={fetchBookings}
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 shadow-sm"
//             >
//               <i className="fas fa-sync-alt"></i>
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {bookings.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
//                 <p className="text-3xl font-bold text-gray-800">{totalBookings}</p>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
//                 <FaReceipt className="text-xl" />
//               </div>
//             </div>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Pending</p>
//                 <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
//                 <FaHourglassHalf className="text-xl" />
//               </div>
//             </div>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Completed</p>
//                 <p className="text-3xl font-bold text-green-600">{completedCount}</p>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
//                 <FaCheckCircle className="text-xl" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Filter Bar */}
//         {bookings.length > 0 && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => setFilterStatus("all")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
//                   filterStatus === "all"
//                     ? "bg-indigo-500 text-white shadow-md"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilterStatus("pending")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
//                   filterStatus === "pending"
//                     ? "bg-yellow-500 text-white shadow-md"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Pending
//               </button>
//               {/* <button
//                 onClick={() => setFilterStatus("completed")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
//                   filterStatus === "completed"
//                     ? "bg-green-500 text-white shadow-md"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Completed
//               </button> */}
//               <button
//                 onClick={() => setFilterStatus("compeleted")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
//                   filterStatus === "compeleted"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Completed
//               </button>
//             </div>
//           </div>
//         )}

//         {/* NO DATA */}
//         {bookings.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FaWrench className="text-gray-400 text-4xl" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-600 mb-2">
//               No Bookings Yet
//             </h3>
//             <p className="text-gray-400 mb-6">
//               You haven't made any service bookings yet.
//             </p>
//             <button
//               onClick={() => navigate("/garages")}
//               className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Browse Garages
//             </button>
//           </div>
//         ) : filteredBookings.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FaReceipt className="text-gray-400 text-4xl" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No {filterStatus} Bookings
//             </h3>
//             <p className="text-gray-400">
//               You don't have any {filterStatus} bookings at the moment.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Results Count */}
//             <div className="flex justify-between items-center mb-5">
//               <p className="text-sm text-gray-500">
//                 Showing <span className="font-semibold text-gray-700">{filteredBookings.length}</span> of{" "}
//                 <span className="font-semibold text-gray-700">{bookings.length}</span> bookings
//               </p>
//             </div>

//             {/* BOOKINGS GRID */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredBookings.map((booking) => {
//                 const statusStyle = getStatusStyle(booking.servicestatus);
//                 const bookingDate = new Date(booking.bookingDate);
//                 const isUpcoming = bookingDate > new Date() && booking.servicestatus === "Pending";
                
//                 return (
//                   <div
//                     key={booking._id}
//                     className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
//                   >
//                     {/* Card Header with Gradient */}
//                     <div className={`relative p-5 pb-3 ${
//                       booking.servicestatus === "Pending" 
//                         ? "bg-gradient-to-r from-yellow-50 to-white" 
//                         : booking.servicestatus === "Completed" 
//                         ? "bg-gradient-to-r from-green-50 to-white"
//                         : "bg-gradient-to-r from-blue-50 to-white"
//                     }`}>
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
//                             <FaTools className="text-indigo-500 text-xl" />
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                               {booking.serviceName}
//                             </h3>
//                             {isUpcoming && (
//                               <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
//                                 <FaClock className="text-xs" />
//                                 Upcoming
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Card Body */}
//                     <div className="p-5 space-y-3">
//                       {/* Price */}
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-500 text-sm">Price</span>
//                         <span className="text-xl font-bold text-green-600 flex items-center gap-0.5">
//                           <FaRupeeSign className="text-sm" /> {booking.price}
//                         </span>
//                       </div>

//                       {/* Date */}
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-indigo-400 text-sm" />
//                         <span className="text-sm">
//                           {bookingDate.toLocaleDateString('en-US', { 
//                             year: 'numeric', 
//                             month: 'short', 
//                             day: 'numeric' 
//                           })}
//                         </span>
//                       </div>

//                       {/* Garage */}
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FaMapMarkerAlt className="text-orange-400 text-sm" />
//                         <span className="text-sm font-medium text-gray-700">
//                           {booking.garageId?.garageName || "N/A"}
//                         </span>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="pt-2">
//                         <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
//                           {statusStyle.icon}
//                           {statusStyle.label}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Divider */}
//                     <div className="border-t border-gray-100 mx-5"></div>

//                     {/* Button */}
//                     <div className="p-5 pt-4">
//                       <button
//                         onClick={() => navigate(`/booking/${booking._id}`)}
//                         className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
//                       >
//                         <FaEye className="text-sm" />
//                         <span>View Details</span>
//                       </button>
//                     </div>

//                     {/* Bottom accent bar */}
//                     <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 ${
//                       booking.serviceStatus === "Pending" 
//                         ? "bg-gradient-to-r from-yellow-500 to-orange-500" 
//                         : booking.serviceStatus === "Completed" 
//                         ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                         : "bg-gradient-to-r from-blue-500 to-indigo-500"
//                     }`}></div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Footer Note */}
//             <div className="mt-8 text-center">
//               <p className="text-xs text-gray-400 flex items-center justify-center gap-4">
//                 <span>✓ Need help with your booking?</span>
//                 <span>✓ Contact support@egarage.com</span>
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaTools, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHourglassHalf,
  FaEye,
  FaReceipt,
  FaCar,
  FaWrench,
  FaSyncAlt
} from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const fetchBookings = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(
        `http://localhost:3000/booking/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
     res.data.forEach((b) => {
  console.log("ID:", b._id, "STATUS:", b.status);
}); // ✅ Debug: Check what comes from backend
      setBookings(res.data || []);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Use 'status' field from database
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { 
          bg: "bg-yellow-100", 
          text: "text-yellow-700", 
          border: "border-yellow-200",
          icon: <FaHourglassHalf className="text-yellow-500" />,
          label: "Pending"
        };
      case "completed":
        return { 
          bg: "bg-green-100", 
          text: "text-green-700", 
          border: "border-green-200",
          icon: <FaCheckCircle className="text-green-500" />,
          label: "Completed"
        };
      case "cancelled":
      case "rejected":
        return { 
          bg: "bg-red-100", 
          text: "text-red-700", 
          border: "border-red-200",
          icon: <FaTimesCircle className="text-red-500" />,
          label: status
        };
      default:
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-700", 
          border: "border-gray-200",
          icon: <FaClock className="text-gray-500" />,
          label: status || "Pending"
        };
    }
  };

  // ✅ FIXED: Filter using 'status' field
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") {
      return booking.status?.toLowerCase() === "completed";
    }
    if (filterStatus === "pending") {
      return booking.status?.toLowerCase() === "pending";
    }
    return true;
  });

  // ✅ FIXED: Stats using 'status' field
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const completedCount = bookings.filter(b => b.status?.toLowerCase() === "completed").length;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCar className="text-red-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Please Login First</h3>
          <p className="text-gray-500 mb-6">You need to be logged in to view your bookings.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm mb-3">
                <FaReceipt />
                <span>Your Bookings</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                My Bookings
              </h1>
              <p className="text-gray-500 mt-2">
                Track and manage all your service appointments
              </p>
            </div>
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 shadow-sm"
            >
              <FaSyncAlt />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{totalBookings}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FaReceipt className="text-xl" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <FaHourglassHalf className="text-xl" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FaCheckCircle className="text-xl" />
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  filterStatus === "all"
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  filterStatus === "pending"
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  filterStatus === "completed"
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        )}

        {/* NO DATA */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaWrench className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-400 mb-6">
              You haven't made any service bookings yet.
            </p>
            <button
              onClick={() => navigate("/garages")}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Browse Garages
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaReceipt className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {filterStatus === "pending" ? "Pending" : "Completed"} Bookings
            </h3>
            <p className="text-gray-400">
              You don't have any {filterStatus === "pending" ? "pending" : "completed"} bookings at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredBookings.length}</span> of{" "}
                <span className="font-semibold text-gray-700">{bookings.length}</span> bookings
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => {
                // ✅ FIXED: Use 'status' field
                const statusStyle = getStatusStyle(booking.status);
                const bookingDate = new Date(booking.bookingDate);
                const isUpcoming = bookingDate > new Date() && booking.status?.toLowerCase() === "pending";
                
                return (
                  <div
                    key={booking._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
                  >
                    <div className={`relative p-5 pb-3 ${
                      booking.status?.toLowerCase() === "pending" 
                        ? "bg-gradient-to-r from-yellow-50 to-white" 
                        : booking.status?.toLowerCase() === "completed" 
                        ? "bg-gradient-to-r from-green-50 to-white"
                        : "bg-gradient-to-r from-blue-50 to-white"
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                            <FaTools className="text-indigo-500 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                              {booking.serviceName}
                            </h3>
                            {isUpcoming && (
                              <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <FaClock className="text-xs" />
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Price</span>
                        <span className="text-xl font-bold text-green-600 flex items-center gap-0.5">
                          <FaRupeeSign className="text-sm" /> {booking.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-indigo-400 text-sm" />
                        <span className="text-sm">
                          {bookingDate.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-orange-400 text-sm" />
                        <span className="text-sm font-medium text-gray-700">
                          {booking.garageId?.garageName || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCar className="text-blue-400 text-sm" />
                        <span className="text-sm font-medium text-gray-700">
                          {booking.vehicleType === "two" ? "Two Wheeler" : "Four Wheeler"}
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                          {statusStyle.icon}
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mx-5"></div>

                    <div className="p-5 pt-4">
                      <button
                        onClick={() => navigate(`/booking/${booking._id}`)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <FaEye className="text-sm" />
                        <span>View Details</span>
                      </button>
                    </div>

                    <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 ${
                      booking.status?.toLowerCase() === "pending" 
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500" 
                        : booking.status?.toLowerCase() === "completed" 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}></div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-4">
                <span>✓ Need help with your booking?</span>
                <span>✓ Contact support@egarage.com</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;