import React, { useEffect, useState } from "react";
import { API } from "../../api";

export const AllGarageList = () => {

  const [garages, setGarages] = useState([]);

  const getGarages = async () => {
    try {
      const res = await API.get("/garages");
      setGarages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGarages();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Garages</h2>

      <table className="min-w-full border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Location</th>
            <th className="p-2">Owner</th>
          </tr>
        </thead>

        <tbody>
          {garages.map((g) => (
            <tr key={g._id} className="text-center border">
              <td className="p-2">{g.name}</td>
              <td className="p-2">{g.location}</td>
              <td className="p-2">{g.ownerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};