import React from "react";
import { FaTools, FaCar, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <FaCalendarAlt className="text-3xl text-orange-500 mb-3"/>
          <h2 className="text-xl font-semibold">12</h2>
          <p className="text-gray-600">Total Bookings</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <FaTools className="text-3xl text-blue-500 mb-3"/>
          <h2 className="text-xl font-semibold">3</h2>
          <p className="text-gray-600">Pending Services</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <FaCheckCircle className="text-3xl text-green-500 mb-3"/>
          <h2 className="text-xl font-semibold">9</h2>
          <p className="text-gray-600">Completed Services</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <FaCar className="text-3xl text-purple-500 mb-3"/>
          <h2 className="text-xl font-semibold">5</h2>
          <p className="text-gray-600">Nearby Garages</p>
        </div>

      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b">
              <th className="py-2">Garage</th>
              <th className="py-2">Service</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-2">AutoFix Garage</td>
              <td className="py-2">Oil Change</td>
              <td className="py-2">20 March</td>
              <td className="py-2 text-yellow-500">Pending</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">Speed Motors</td>
              <td className="py-2">General Repair</td>
              <td className="py-2">18 March</td>
              <td className="py-2 text-green-600">Completed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;