import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiTool, FiClipboard, FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    garages: 0,
    bookings: 0,
    revenue: 0,
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const [users, garages, bookings] = await Promise.all([
        axios.get("http://localhost:3000/user/all", { headers: { Authorization: `Bearer ${token}` }}),
        axios.get("http://localhost:3000/garage/all", { headers: { Authorization: `Bearer ${token}` }}),
        axios.get("http://localhost:3000/booking/all", { headers: { Authorization: `Bearer ${token}` }}),
      ]);

      const revenue = bookings.data.reduce((sum, b) => sum + (b.price || 0), 0);

      setStats({
        users: users.data.length,
        garages: garages.data.length,
        bookings: bookings.data.length,
        revenue,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    { title: "Users", value: stats.users, icon: <FiUsers /> },
    { title: "Garages", value: stats.garages, icon: <FiTool /> },
    { title: "Bookings", value: stats.bookings, icon: <FiClipboard /> },
    { title: "Revenue", value: `₹${stats.revenue}`, icon: <FiDollarSign /> },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{c.title}</p>
                <h2 className="text-xl font-bold">{c.value}</h2>
              </div>
              <div className="text-2xl text-blue-500">{c.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




