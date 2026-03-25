import React, { useEffect, useState } from "react";
import axios from "axios";

const Garages = () => {
  const [garages, setGarages] = useState([]);
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

  // 🔥 Update Status (Approve / Reject)
  const updateGarageStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/garage/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGarages(); // refresh
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Garages</h2>

      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">#</th>
            <th>Name</th>
            <th>City</th>
            <th>Owner</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {garages.map((g, i) => (
            <tr key={g._id} className="text-center border-t">
              <td>{i + 1}</td>
              <td>{g.garageName}</td>
              <td>{g.city}</td>
              <td>{g.garageOwnerId?.firstName || "N/A"}</td>

              {/* 🔥 STATUS CONTROL */}
              <td>
                <select
                  value={g.status || "pending"}
                  onChange={(e) =>
                    updateGarageStatus(g._id, e.target.value)
                  }
                  className={`p-1 rounded ${
                    g.status === "approved"
                      ? "bg-green-200"
                      : g.status === "rejected"
                      ? "bg-red-200"
                      : "bg-yellow-200"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Garages;