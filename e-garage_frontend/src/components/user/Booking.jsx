
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCalendarAlt,
//   FaTools,
//   FaRupeeSign,
//   FaArrowLeft,
//   FaCheckCircle,
//   FaCar,
//   FaMotorcycle,
// } from "react-icons/fa";

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // 🔥 DATA FROM PREVIOUS PAGE
//   const { service, garageId, vehicleType, price } = location.state || {};

//   const [date, setDate] = useState("");

//   // 🔥 SAFE FALLBACKS (VERY IMPORTANT)
//   const finalPrice = price || service?.price || 0;
//   const finalVehicle = vehicleType || "unknown";

//   const getTomorrowDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today.toISOString().split("T")[0];
//   };

//   // ❌ Only block if totally invalid
//   if (!service || !garageId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500 text-lg font-semibold">
//           No service selected. Please go back.
//         </p>
//       </div>
//     );
//   }

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userId");

//     if (!userId) return alert("Please login first!");
//     if (!date) return alert("Select booking date!");

//     try {
//       // ✅ CREATE ORDER WITH FINAL PRICE
//       const { data: order } = await axios.post(
//         "http://localhost:3000/booking/create-order",
//         { amount: finalPrice }
//       );

//       const options = {
//         key: "rzp_test_SaxdSYDnrqwEpQ",
//         amount: order.amount,
//         currency: "INR",
//         name: "E-Garage",
//         description: `${service.serviceName} (${finalVehicle})`,
//         order_id: order.id,

//         handler: async function (response) {
//           await axios.post(
//             "http://localhost:3000/booking/verify-payment",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,

//               userId,
//               garageId,
//               serviceId: service._id,
//               serviceName: service.serviceName,

//               price: finalPrice,
//               vehicleType: finalVehicle,
//               bookingDate: date,
//             }
//           );

//           alert("✅ Payment Successful!");
//           navigate("/user/bookings");
//         },

//         prefill: {
//           name: "Test User",
//           email: "test@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#22c55e",
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", function (response) {
//         console.log("FAILED 👉", response);
//         alert(response.error.description);
//       });

//       rzp.open();
//     } catch (err) {
//       console.log("ERROR 👉", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-10">

//       <div className="w-full max-w-2xl">

//         {/* 🔙 BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
//         >
//           <FaArrowLeft /> Back
//         </button>

//         {/* 🔥 CARD */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

//           {/* HEADER */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
//             <div className="flex items-center gap-3">
//               <FaTools className="text-2xl text-yellow-300" />
//               <h2 className="text-2xl font-bold">Confirm Booking</h2>
//             </div>
//             <p className="text-white/90 mt-2 text-sm">
//               Complete your booking securely
//             </p>
//           </div>

//           {/* CONTENT */}
//           <div className="p-6 space-y-6">

//             {/* SERVICE DETAILS */}
//             <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">

//               <div className="flex justify-between">
//                 <p className="text-gray-600">Service</p>
//                 <p className="font-semibold text-gray-800">
//                   {service.serviceName}
//                 </p>
//               </div>

//               {/* VEHICLE */}
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Vehicle</p>
//                 <div className="flex items-center gap-2 font-semibold text-gray-800">
//                   {finalVehicle === "two" ? (
//                     <>
//                       <FaMotorcycle /> Two Wheeler
//                     </>
//                   ) : finalVehicle === "four" ? (
//                     <>
//                       <FaCar /> Four Wheeler
//                     </>
//                   ) : (
//                     "Not Selected"
//                   )}
//                 </div>
//               </div>

//               {/* PRICE */}
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Price</p>
//                 <p className="text-green-600 font-bold text-xl flex items-center gap-1">
//                   <FaRupeeSign /> {finalPrice}
//                 </p>
//               </div>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handlePayment} className="space-y-5">

//               <div>
//                 <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
//                   <FaCalendarAlt />
//                   Select Booking Date
//                 </label>

//                 <input
//                   type="date"
//                   value={date}
//                   min={getTomorrowDate()}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
//               >
//                 <FaCheckCircle />
//                 Pay ₹{finalPrice} & Confirm
//               </button>
//             </form>

//             <p className="text-xs text-gray-400 text-center">
//               🔒 Secure payment powered by Razorpay
//             </p>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;




// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCalendarAlt,
//   FaTools,
//   FaRupeeSign,
//   FaArrowLeft,
// } from "react-icons/fa";

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { service, garageId, vehicleType, price } = location.state || {};
//   const [date, setDate] = useState("");

//   const getTomorrowDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today.toISOString().split("T")[0];
//   };

//   // ❌ INVALID FLOW FIXED
//   if (!service || !garageId || !vehicleType || !price) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500 text-lg">
//           Invalid booking flow. Please start again.
//         </p>
//       </div>
//     );
//   }

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userId");

//     if (!userId) return alert("Login first");
//     if (!date) return alert("Select date");

//     try {
//       // ✅ CREATE ORDER WITH SELECTED PRICE
//       const { data: order } = await axios.post(
//         "http://localhost:3000/booking/create-order",
//         { amount: price }
//       );

//       const options = {
//         key: "rzp_test_SaxdSYDnrqwEpQ",
//         amount: order.amount,
//         currency: "INR",
//         name: "E-Garage",
//         description: service.serviceName,
//         order_id: order.id,

//         handler: async function (response) {
//           await axios.post(
//             "http://localhost:3000/booking/verify-payment",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               userId,
//               garageId,
//               serviceId: service._id,
//               serviceName: service.serviceName,
//               price, // 🔥 FINAL PRICE
//               vehicleType, // 🔥 NEW FIELD
//               bookingDate: date,
//             }
//           );

//           alert("✅ Payment Successful");
//           navigate("/user/bookings");
//         },

//         prefill: {
//           name: "User",
//           email: "test@gmail.com",
//           contact: "9999999999",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.log(err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
//       <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">

//         <button onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Back
//         </button>

//         <h2 className="text-xl font-bold mt-4 mb-4">
//           Confirm Booking
//         </h2>

//         <div className="bg-gray-50 p-4 rounded mb-4">
//           <p><b>Service:</b> {service.serviceName}</p>
//           <p><b>Vehicle:</b> {vehicleType === "two" ? "Two Wheeler" : "Four Wheeler"}</p>
//           <p className="text-green-600 font-bold flex items-center gap-1">
//             <FaRupeeSign /> {price}
//           </p>
//         </div>

//         <form onSubmit={handlePayment}>
//           <label className="block mb-2">
//             <FaCalendarAlt className="inline mr-2" />
//             Select Date
//           </label>

//           <input
//             type="date"
//             value={date}
//             min={getTomorrowDate()}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border p-2 rounded mb-4"
//           />

//           <button className="w-full bg-green-500 text-white py-2 rounded">
//             Pay & Confirm
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Booking;




import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaTools,
  FaRupeeSign,
  FaArrowLeft,
  FaCar,
  FaMotorcycle,
  FaClock,
  FaCheckCircle,
  FaShieldAlt,
  FaCreditCard,
  FaWallet,
  FaLock
} from "react-icons/fa";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, garageId, vehicleType, price } = location.state || {};
  const [date, setDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getTomorrowDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  // // Get available time slots
  // const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
  // const [selectedTime, setSelectedTime] = useState("");

  // ❌ INVALID FLOW FIXED
  if (!service || !garageId || !vehicleType || !price) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTools className="text-4xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Booking Flow</h2>
          <p className="text-gray-600 mb-6">Please start again from the garage page.</p>
          <button
            onClick={() => navigate("/garages")}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Go to Garages
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first to continue");
      navigate("/login");
      return;
    }
    if (!date) {
      alert("Please select a date");
      return;
    }
    // if (!selectedTime) {
    //   alert("Please select a time slot");
    //   return;
    // }

    setIsProcessing(true);

    try {
      // ✅ CREATE ORDER WITH SELECTED PRICE
      const { data: order } = await axios.post(
        "http://localhost:3000/booking/create-order",
        { amount: price }
      );

      const options = {
        key: "rzp_test_SaxdSYDnrqwEpQ",
        amount: order.amount,
        currency: "INR",
        name: "E-Garage",
        description: service.serviceName,
        order_id: order.id,
        image: "https://your-logo-url.com/logo.png", // Add your logo URL

        handler: async function (response) {
          await axios.post(
            "http://localhost:3000/booking/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              userId,
              garageId,
              serviceId: service._id,
              serviceName: service.serviceName,
              price,
              vehicleType,
              bookingDate: date,
              // bookingTime: selectedTime,
            }
          );

          alert("✅ Payment Successful! Your booking is confirmed.");
          navigate("/user/bookings");
        },

        prefill: {
          name: "User",
          email: "test@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3B82F6",
        },

        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert("Payment failed. Please try again.");
        setIsProcessing(false);
      });
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  // Calculate summary details
  const getVehicleIcon = () => {
    return vehicleType === "two" ? <FaMotorcycle className="text-2xl" /> : <FaCar className="text-2xl" />;
  };

  const getVehicleName = () => {
    return vehicleType === "two" ? "Two Wheeler" : "Four Wheeler";
  };

  const serviceFee = price;
  const convenienceFee = 0;
  const totalAmount = serviceFee + convenienceFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition" />
            <span>Back to Services</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Column - Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Confirm Your Booking</h2>
                <p className="text-blue-100 text-sm mt-1">Complete the details to schedule your service</p>
              </div>

              <form onSubmit={handlePayment} className="p-6">
                {/* Service Summary Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaTools className="text-blue-600" />
                    Service Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-800">{service.serviceName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vehicle Type:</span>
                      <span className="flex items-center gap-2 font-semibold text-gray-800">
                        {getVehicleIcon()}
                        {getVehicleName()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-2xl font-bold text-blue-600 flex items-center gap-1">
                        <FaRupeeSign className="text-xl" /> {price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    Select Service Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={getTomorrowDate()}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">* Earliest available date is tomorrow</p>
                </div>
 
                

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isProcessing ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard /> Proceed to Payment
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <FaLock className="text-xs" />
                  Secure payment powered by Razorpay
                </p>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FaWallet className="text-blue-600" />
                  Order Summary
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span className="flex items-center gap-1">
                      <FaRupeeSign className="text-xs" /> {serviceFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Convenience Fee</span>
                    <span className="flex items-center gap-1">
                      <FaRupeeSign className="text-xs" /> {convenienceFee}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>Total Amount</span>
                      <span className="text-xl text-blue-600 flex items-center gap-1">
                        <FaRupeeSign /> {totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaCheckCircle />
                    <span className="text-sm font-semibold">What's included?</span>
                  </div>
                  <ul className="text-xs text-green-600 mt-2 space-y-1 ml-6 list-disc">
                    <li>Expert mechanic service</li>
                    <li>Quality spare parts </li>
                    <li>Digital invoice</li>
                  </ul>
                </div>

               
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;