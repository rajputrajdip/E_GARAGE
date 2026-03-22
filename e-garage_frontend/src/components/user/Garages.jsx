import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Garages = () => {
  const [garages, setGarages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garage/all");
      console.log("DATA 👉", res.data); // 🔥 DEBUG
      setGarages(res.data || []);
    } catch (err) {
      console.log("ERROR 👉", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Garages</h2>

      {garages.length === 0 ? (
        <p>No Garages Found ❌</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {garages.map((garage) => (
            <div key={garage._id} className="border p-4 rounded shadow">
              <img
                src={garage.image || "https://via.placeholder.com/300"}
                alt=""
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">
                {garage.garageName}
              </h3>
              <p>{garage.city}</p>

              <button
                onClick={() => navigate(`/garage/${garage._id}`)}
                className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
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

export default Garages;