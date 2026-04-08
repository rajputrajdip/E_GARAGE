// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   FaTools,
//   FaRupeeSign,
//   FaWrench,
//   FaOilCan,
//   FaCar,
//   FaBolt,
//   FaArrowLeft,
//   FaStar,
// } from "react-icons/fa";

// const Services = () => {
//   const { id } = useParams();
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) fetchServices();
//   }, [id]);

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/service/garage/${id}`
//       );
//       setServices(res.data || []);
//     } catch (err) {
//       console.log("ERROR 👉", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookingNavigate = (service) => {
//     navigate("/booking", {
//       state: {
//         service: {
//           _id: service._id,
//           serviceName: service.serviceName,
//           price: service.price,
//         },
//         garageId: id,
//       },
//     });
//   };

//   const getServiceIcon = (name = "") => {
//     const n = name.toLowerCase();
//     if (n.includes("oil")) return <FaOilCan className="text-orange-500" />;
//     if (n.includes("wash")) return <FaCar className="text-blue-500" />;
//     if (n.includes("ac")) return <FaBolt className="text-cyan-500" />;
//     return <FaWrench className="text-indigo-500" />;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-gray-500 animate-pulse text-lg">
//           Loading services...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">

//       {/* 🔥 HEADER */}
//       <div className="max-w-7xl mx-auto mb-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
//         >
//           <FaArrowLeft /> Back
//         </button>

//         <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-8 shadow-lg">
//           <div className="flex items-center gap-3 mb-2">
//             <FaTools className="text-yellow-300 text-2xl" />
//             <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//               Professional Services
//             </span>
//           </div>

//           <h1 className="text-4xl font-bold mb-2">Garage Services</h1>
//           <p className="text-white/90">
//             Choose from top-quality services and book instantly 🚗
//           </p>
//         </div>
//       </div>

//       {/* ❌ NO DATA */}
//       {services.length === 0 ? (
//         <div className="text-center mt-20">
//           <p className="text-gray-500 text-xl">No services available 😢</p>
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {services.map((service) => (
//             <div
//               key={service._id}
//               className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between border border-gray-100 hover:-translate-y-1"
//             >
//               {/* ICON + TITLE */}
//               <div>
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-3 bg-gray-100 rounded-xl shadow-sm group-hover:scale-110 transition">
//                     {getServiceIcon(service.serviceName)}
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-gray-800">
//                       {service.serviceName}
//                     </h2>

//                     {/* ⭐ fake rating */}
//                     <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} />
//                       ))}
//                       <span className="text-gray-400 ml-1">(24)</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-500 text-sm mb-5">
//                   {service.description ||
//                     "Professional service for your vehicle with guaranteed quality."}
//                 </p>
//               </div>

//               {/* PRICE + BUTTON */}
//               <div className="flex items-center justify-between">
//                 <p className="text-green-600 font-bold text-xl flex items-center gap-1">
//                   <FaRupeeSign /> {service.price}
//                 </p>

//                 <button
//                   onClick={() => handleBookingNavigate(service)}
//                   className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition"
//                 >
//                   Book Now
//                 </button>
//               </div>

//               {/* Hover bottom bar */}
//               <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-pink-500 mt-4 transition-all duration-300"></div>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaTools,
  FaWrench,
  FaOilCan,
  FaCar,
  FaBolt,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";

const Services = () => {
  const { id } = useParams(); // garageId
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchServices();
  }, [id]);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/service/garage/${id}`
      );
      setServices(res.data || []);
    } catch (err) {
      console.log("ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 NEW NAVIGATION → Vehicle Selection Page
  const handleBookingNavigate = (service) => {
    navigate("/vehicle-selection", {
      state: {
        service,
        garageId: id,
      },
    });
  };

  const getServiceIcon = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("oil")) return <FaOilCan className="text-orange-500" />;
    if (n.includes("wash")) return <FaCar className="text-blue-500" />;
    if (n.includes("ac")) return <FaBolt className="text-cyan-500" />;
    return <FaWrench className="text-indigo-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">

      {/* 🔙 HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaTools className="text-yellow-300 text-2xl" />
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              Professional Services
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-2">Garage Services</h1>
          <p className="text-white/90">
            Select a service and continue to choose your vehicle 🚗🏍️
          </p>
        </div>
      </div>

      {/* ❌ NO DATA */}
      {services.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl">No services available 😢</p>
        </div>
      ) : (

        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between border border-gray-100 hover:-translate-y-1"
            >
              {/* ICON + TITLE */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl shadow-sm group-hover:scale-110 transition">
                    {getServiceIcon(service.serviceName)}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {service.serviceName}
                    </h2>

                    {/* ⭐ rating */}
                    <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="text-gray-400 ml-1">(24)</span>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mb-5">
                  {service.description ||
                    "Professional service for your vehicle with guaranteed quality."}
                </p>
              </div>

              {/* BUTTON ONLY (NO PRICE) */}
              <button
                onClick={() => handleBookingNavigate(service)}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition"
              >
                View Details
              </button>

              {/* Hover line */}
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-pink-500 mt-4 transition-all duration-300"></div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Services;