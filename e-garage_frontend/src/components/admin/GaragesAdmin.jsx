import React, { useEffect, useState } from "react";
import axios from "axios";

const GaragesAdmin = () => {
  const [garages, setGarages] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  // 📦 Fetch Garages
  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garage/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarages(res.data);
    } catch (err) {
      console.error("Error fetching garages:", err);
    }
  };

  useEffect(() => {
    fetchGarages();
  }, []);

  // 🔄 Update Status
  const updateGarageStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/garage/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGarages();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // 🔍 Search Filter
  const filteredGarages = garages.filter((g) =>
    `${g.garageName} ${g.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        Manage Garages
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search garages..."
        className="w-full mb-5 p-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Garage Name</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredGarages.length > 0 ? (
              filteredGarages.map((g, i) => (
                <tr
                  key={g._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{g.garageName}</td>
                  <td className="p-3">{g.city}</td>
                  <td className="p-3">
                    {g.garageOwnerId?.firstName || "N/A"}
                  </td>

                  <td className="p-3">
                    <select
                      value={g.status || "pending"}
                      onChange={(e) =>
                        updateGarageStatus(g._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm border ${
                        g.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : g.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No garages found
                </td>
                
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default GaragesAdmin;