import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const Garages = () => {
  const [garages, setGarages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garage/all");
      setGarages(res.data || []);
    } catch (err) {
      console.log("ERROR 👉", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-10 py-10">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          🚗 Explore Garages
        </h2>

        <p className="text-gray-500 hidden md:block">
          Find trusted garages near you
        </p>
      </div>

      {/* ❌ EMPTY STATE */}
      {garages.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-xl text-gray-500">No Garages Found 😢</h3>
        </div>
      ) : (

        /* 🔥 GRID */
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {garages.map((garage) => (
            <div
              key={garage._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >

              {/* 🔥 IMAGE */}
              <div className="relative">
                <img
                  src={
                    garage.image
                      ? `http://localhost:3000/${garage.image}`
                      : "https://via.placeholder.com/400x250"
                  }
                  alt="garage"
                  className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* STATUS BADGE */}
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full text-white ${
                  garage.status === "approved"
                    ? "bg-green-500"
                    : garage.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}>
                  {garage.status}
                </span>
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {garage.garageName}
                </h3>

                <p className="text-gray-500 flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {garage.city}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/garage/${garage._id}`)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300"
                >
                  View Details
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Garages;