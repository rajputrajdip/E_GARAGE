// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BookingsAdmin = () => {
//   const [bookings, setBookings] = useState([]);
//   const token = localStorage.getItem("token");

//   // 📦 Fetch Bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/booking/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // 🔄 Update Status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/booking/update/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBookings();
//     } catch (err) {
//       console.error("Error updating booking status:", err);
//     }
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <h2 className="text-2xl font-semibold mb-5 text-gray-800">
//         Manage Bookings
//       </h2>

//       {/* TABLE */}
//       <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
//         <table className="w-full text-sm">

//           {/* HEADER */}
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-3 text-left">#</th>
//               <th className="p-3 text-left">User</th>
//               <th className="p-3 text-left">Garage</th>
//               <th className="p-3 text-left">Service</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Status</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((b, i) => (
//                 <tr
//                   key={b._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="p-3">{i + 1}</td>
//                   <td className="p-3">
//                     {b.userId?.firstName || "N/A"}
//                   </td>
//                   <td className="p-3">
//                     {b.garageId?.garageName || "N/A"}
//                   </td>
//                   <td className="p-3">
//                     {b.serviceId?.serviceName || "N/A"}
//                   </td>
//                   <td className="p-3 text-gray-700">
//                     ₹{b.price}
//                   </td>
//                   <td className="p-3">
//                     {new Date(b.bookingDate).toLocaleDateString()}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-3">
//                     <select
//                       value={b.status || "Pending"}
//                       onChange={(e) =>
//                         updateStatus(b._id, e.target.value)
//                       }
//                       className={`px-2 py-1 rounded text-sm border ${
//                         b.status === "Completed"
//                           ? "bg-green-100 text-green-700"
//                           : b.status === "Cancelled"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       <option>Pending</option>
//                       <option>Completed</option>
//                       <option>Cancelled</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-500">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookingsAdmin;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiClipboard, FiSearch } from "react-icons/fi";

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  // 📦 Fetch Bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/booking/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔄 Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/booking/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

  // 🔍 Search Filter
  const filteredBookings = bookings.filter((b) =>
    `${b.userId?.firstName} ${b.garageId?.garageName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🎨 Status Badge Style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FiClipboard className="text-blue-500" />
          Manage Bookings
        </h2>

        <div className="text-sm text-gray-500">
          Total: {filteredBookings.length}
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by user or garage..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧾 TABLE CARD */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Garage</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b, i) => (
                <tr
                  key={b._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-500">{i + 1}</td>

                  <td className="p-4 font-medium text-gray-800">
                    {b.userId?.firstName || "N/A"}
                  </td>

                  <td className="p-4">
                    {b.garageId?.garageName || "N/A"}
                  </td>

                  <td className="p-4">
                    {b.serviceId?.serviceName || "N/A"}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{b.price}
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>

                  {/* 🔥 STATUS COLUMN */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">

                      {/* CURRENT STATUS BADGE */}
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status || "Pending"}
                      </span>

                      {/* STATUS UPDATE */}
                      {/* <select
                        value={b.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(b._id, e.target.value)
                        }
                        className="border px-2 py-1 rounded text-xs focus:ring-1 focus:ring-blue-400"
                      >
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select> */}
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-10 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <FiClipboard size={28} />
                    <p>No bookings found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BookingsAdmin;