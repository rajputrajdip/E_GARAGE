import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Services = () => {
  const { id } = useParams(); // garageId
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchServices();
    }
  }, [id]); // ✅ important

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/service/garage/${id}`
      );
      console.log("SERVICES 👉", res.data); // 🔥 debug
      setServices(res.data || []);
    } catch (err) {
      console.log("ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return <p className="p-6">Loading services...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Garage Services</h2>

      {/* ❌ No Data */}
      {services.length === 0 ? (
        <p>No services found for this garage ❌</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">
                {service.serviceName}
              </h3>
              <p>{service.description}</p>
              <p className="text-green-600 font-bold">
                ₹ {service.price}
              </p>

              <button
                onClick={() =>
                  navigate("/booking", {
                    state: { service, garageId: id },
                  })
                }
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;