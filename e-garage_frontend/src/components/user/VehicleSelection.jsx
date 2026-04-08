import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMotorcycle,
  FaCar,
  FaArrowLeft,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

const VehicleSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, garageId } = location.state || {};
  const [vehicleType, setVehicleType] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No service selected</p>
      </div>
    );
  }

  // 🔥 Price calculation
  const getPrice = (type) => {
    if (type === "two") return service.priceTwoWheeler;
    if (type === "four") return service.priceFourWheeler;
    return 0;
  };

  const handleContinue = () => {
    if (!vehicleType) {
      alert("Please select a vehicle type!");
      return;
    }

    navigate("/booking", {
      state: {
        service,
        garageId,
        vehicleType,
        price: getPrice(vehicleType),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        {/* 🔥 HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Select Your Vehicle
          </h1>
          <p className="text-white/90">
            Choose vehicle type to see pricing and continue booking
          </p>
        </div>

        {/* 🔥 VEHICLE CARDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 🏍️ TWO WHEELER */}
          <div
            onClick={() => setVehicleType("two")}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 shadow-md hover:shadow-xl group ${
              vehicleType === "two"
                ? "border-green-500 bg-green-50 scale-105"
                : "border-gray-200 bg-white hover:border-indigo-400"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <FaMotorcycle className="text-4xl text-indigo-500 group-hover:scale-110 transition" />
              {vehicleType === "two" && (
                <FaCheckCircle className="text-green-500 text-xl" />
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Two Wheeler
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Bike, Scooter, Electric Two Wheelers
            </p>

            <p className="text-green-600 text-2xl font-bold flex items-center gap-1">
              <FaRupeeSign />
              {getPrice("two")}
            </p>
          </div>

          {/* 🚗 FOUR WHEELER */}
          <div
            onClick={() => setVehicleType("four")}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 shadow-md hover:shadow-xl group ${
              vehicleType === "four"
                ? "border-green-500 bg-green-50 scale-105"
                : "border-gray-200 bg-white hover:border-indigo-400"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <FaCar className="text-4xl text-indigo-500 group-hover:scale-110 transition" />
              {vehicleType === "four" && (
                <FaCheckCircle className="text-green-500 text-xl" />
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Four Wheeler
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Cars, SUVs, Electric Vehicles
            </p>

            <p className="text-green-600 text-2xl font-bold flex items-center gap-1">
              <FaRupeeSign />
              {getPrice("four")}
            </p>
          </div>

        </div>

        {/* 🔥 CONTINUE BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            Continue Booking →
          </button>
        </div>

      </div>
    </div>
  );
};

export default VehicleSelection;