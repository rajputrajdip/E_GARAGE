import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTools, FaRupeeSign } from "react-icons/fa";

const Services = () => {
  const { id } = useParams(); // garageId
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchServices();
    }
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

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-10 py-10">

      {/* 🔥 HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          🔧 Garage Services
        </h2>
        <p className="text-gray-500 mt-2">
          Choose a service and book instantly
        </p>
      </div>

      {/* ❌ NO DATA */}
      {services.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-xl text-gray-500">
            No services available 😢
          </h3>
        </div>
      ) : (

        /* 🔥 GRID */
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
            >

              {/* 🔧 ICON + NAME */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FaTools className="text-orange-500 text-xl" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.serviceName}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mb-4">
                  {service.description || "Professional service for your vehicle"}
                </p>
              </div>

              {/* 🔥 PRICE + BUTTON */}
              <div className="flex items-center justify-between mt-auto">

                <p className="text-green-600 font-bold text-lg flex items-center gap-1">
                  <FaRupeeSign /> {service.price}
                </p>

                <button
                  onClick={() =>
                    navigate("/booking", {
                      state: { service, garageId: id },
                    })
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Services;