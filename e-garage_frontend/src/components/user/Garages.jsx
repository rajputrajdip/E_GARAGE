// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const Garages = () => {
//   const [garages, setGarages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchGarages();
//   }, []);

//   const fetchGarages = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/garage/all");
//       setGarages(res.data || []);
//     } catch (err) {
//       console.log("ERROR 👉", err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen px-6 md:px-10 py-10">

//       {/* 🔥 HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//           🚗 Explore Garages
//         </h2>

//         <p className="text-gray-500 hidden md:block">
//           Find trusted garages near you
//         </p>
//       </div>

//       {/* ❌ EMPTY STATE */}
//       {garages.length === 0 ? (
//         <div className="text-center mt-20">
//           <h3 className="text-xl text-gray-500">No Garages Found 😢</h3>
//         </div>
//       ) : (

//         /* 🔥 GRID */
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {garages.map((garage) => (
//             <div
//               key={garage._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
//             >

//               {/* 🔥 IMAGE */}
//               <div className="relative">
//                 <img
//                   src={
//                     garage.image
//                       ? `http://localhost:3000/${garage.image}`
//                       : "https://via.placeholder.com/400x250"
//                   }
//                   alt="garage"
//                   className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
//                 />

//                 {/* STATUS BADGE */}
//                 <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full text-white ${
//                   garage.status === "approved"
//                     ? "bg-green-500"
//                     : garage.status === "rejected"
//                     ? "bg-red-500"
//                     : "bg-yellow-500"
//                 }`}>
//                   {garage.status}
//                 </span>
//               </div>

//               {/* 🔥 CONTENT */}
//               <div className="p-5">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {garage.garageName}
//                 </h3>

//                 <p className="text-gray-500 flex items-center gap-2 mb-4">
//                   <FaMapMarkerAlt className="text-orange-500" />
//                   {garage.city}
//                 </p>

//                 {/* BUTTON */}
//                 <button
//                   onClick={() => navigate(`/garage/${garage._id}`)}
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300"
//                 >
//                   View Details
//                 </button>
//               </div>

//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Garages;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaWrench, FaArrowRight, FaShieldAlt, FaCalendarCheck, FaHeadset, FaRupeeSign } from "react-icons/fa";

const Garages = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/garage/all");
      setGarages(res.data || []);
    } catch (err) {
      console.log("ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: "fa-check-circle", label: "Approved" };
      case "rejected":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: "fa-times-circle", label: "Rejected" };
      default:
        return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: "fa-clock", label: "Pending" };
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-10 text-center">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-3"></div>
            <div className="h-5 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
          </div>
          {/* Grid Skeleton */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <FaWrench className="text-yellow-300" />
              <span>Trusted Garages</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Explore Top Garages
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Find trusted, verified garages near you for all your vehicle needs
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* ❌ EMPTY STATE */}
        {garages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaWrench className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Garages Found
            </h3>
            <p className="text-gray-400 mb-6">
              No garages are currently available. Check back later!
            </p>
          </div>
        ) : (
          <>
            {/* 🔥 GARAGES GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {garages.map((garage) => {
                const statusStyle = getStatusBadge(garage.status);
                
                return (
                  <div
                    key={garage._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={
                          garage.image
                            ? `http://localhost:3000/${garage.image}`
                            : "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=300&fit=crop"
                        }
                        alt={garage.garageName}
                        className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Status Badge */}
                      <span className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} backdrop-blur-sm shadow-sm flex items-center gap-1.5`}>
                        <i className={`fas ${statusStyle.icon}`}></i>
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {garage.garageName}
                        </h3>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="text-orange-500 text-xs" />
                        </div>
                        <span className="text-gray-600 text-sm">{garage.city}</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          <i className="fas fa-certificate mr-1 text-indigo-500"></i>
                          Verified
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          <i className="fas fa-user-clock mr-1 text-blue-500"></i>
                          Expert Mechanics
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-3"></div>

                      {/* Button */}
                      <button
                        onClick={() => navigate(`/garage/${garage._id}`)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                      >
                        <span>View Details</span>
                        <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"></div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-500" />
                  <span>Verified Garages</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarCheck className="text-blue-500" />
                  <span>Easy Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeadset className="text-purple-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-green-500" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Garages;