

// // components/owner/GarageOwnerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const GarageOwnerDashboard = () => {
//   const [garages, setGarages] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState("garages");
//   const [newGarageName, setNewGarageName] = useState("");
//   const [newCity, setNewCity] = useState("");

//   const token = localStorage.getItem("token");

//   // ================= FETCH =================
//   const fetchGarages = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/garageowner/garages", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setGarages(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/garageowner/bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchGarages();
//     fetchBookings();
//   }, []);

//   // ================= GARAGE =================
//   const handleAddGarage = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/garageowner/garages",
//         { garageName: newGarageName, city: newCity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setGarages([...garages, res.data]);
//       setNewGarageName("");
//       setNewCity("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = async (garage) => {
//     const newName = prompt("Enter new name", garage.garageName);
//     if (!newName) return;

//     await axios.put(
//       `http://localhost:3000/garageowner/garages/${garage._id}`,
//       { garageName: newName },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     fetchGarages();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete?")) return;

//     await axios.delete(
//       `http://localhost:3000/garageowner/garages/${id}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     fetchGarages();
//   };

//   const handleAddService = async (garageId) => {
//     const name = prompt("Service Name");
//     const price = prompt("Price");

//     if (!name || !price) return;

//     await axios.post("http://localhost:3000/service/add", {
//       serviceName: name,
//       price,
//       garageId,
//     });

//     alert("Service Added ✅");
//   };

//   // ================= BOOKING =================
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:3000/booking/status/${id}`, {
//         status,
//       });

//       // 🔥 instant UI update (NO reload)
//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === id ? { ...b, status: status } : b
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6">
//         Garage Owner Dashboard
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={() => setActiveTab("garages")}
//           className={`px-4 py-2 rounded-lg shadow ${
//             activeTab === "garages"
//               ? "bg-blue-600 text-white"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           My Garages
//         </button>

//         <button
//           onClick={() => setActiveTab("bookings")}
//           className={`px-4 py-2 rounded-lg shadow ${
//             activeTab === "bookings"
//               ? "bg-blue-600 text-white"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           Bookings
//         </button>
//       </div>

//       {/* ================= GARAGES ================= */}
//       {activeTab === "garages" && (
//         <div>
//           <div className="bg-white p-4 md:p-6 rounded-2xl shadow mb-6">
//             <h2 className="text-lg font-semibold mb-4">Add New Garage</h2>

//             <div className="flex flex-col md:flex-row gap-3">
//               <input
//                 type="text"
//                 placeholder="Garage Name"
//                 value={newGarageName}
//                 onChange={(e) => setNewGarageName(e.target.value)}
//                 className="flex-1 px-4 py-2 border rounded-lg"
//               />

//               <input
//                 type="text"
//                 placeholder="City"
//                 value={newCity}
//                 onChange={(e) => setNewCity(e.target.value)}
//                 className="flex-1 px-4 py-2 border rounded-lg"
//               />

//               <button
//                 onClick={handleAddGarage}
//                 className="bg-green-500 text-white px-6 py-2 rounded-lg"
//               >
//                 Add
//               </button>
//             </div>
//           </div>

//           <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3">#</th>
//                   <th className="p-3">Garage Name</th>
//                   <th className="p-3">City</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {garages.map((g, idx) => (
//                   <tr key={g._id} className="border-b">
//                     <td className="p-3">{idx + 1}</td>
//                     <td className="p-3">{g.garageName}</td>
//                     <td className="p-3">{g.city}</td>

//                     <td className="p-3 flex gap-2">
//                       <button onClick={() => handleEdit(g)} className="bg-yellow-400 px-3 py-1 rounded">
//                         Edit
//                       </button>

//                       <button onClick={() => handleDelete(g._id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                         Delete
//                       </button>

//                       <button onClick={() => handleAddService(g._id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//                         Add Service
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ================= BOOKINGS ================= */}
//       {activeTab === "bookings" && (
//         <div>
//           <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3">#</th>
//                   <th className="p-3">User</th>
//                   <th className="p-3">Garage</th>
//                   <th className="p-3">Service</th>
//                   <th className="p-3">Price</th>
//                   <th className="p-3">Date</th>
//                   <th className="p-3">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b, idx) => (
//                   <tr key={b._id} className="border-b">
//                     <td className="p-3">{idx + 1}</td>
//                     <td className="p-3">{b.userId?.firstName} {b.userId?.lastName}</td>
//                     <td className="p-3">{b.garageId?.garageName}</td>
//                     <td className="p-3">{b.serviceId?.serviceName}</td>
//                     <td className="p-3">₹{b.price}</td>
//                     <td className="p-3">{new Date(b.bookingDate).toLocaleDateString()}</td>

//                     <td className="p-3">
//                       {b.status === "Pending" && (
//                         <div className="flex gap-2">
//                           <button onClick={() => updateStatus(b._id, "Accepted")} className="bg-green-500 text-white px-2 py-1 rounded">
//                             Accept
//                           </button>

//                           <button onClick={() => updateStatus(b._id, "Rejected")} className="bg-red-500 text-white px-2 py-1 rounded">
//                             Reject
//                           </button>
//                         </div>
//                       )}

//                       {b.status === "Accepted" && (
//                         <span className="text-green-600 font-semibold">Accepted ✅</span>
//                       )}

//                       {b.status === "Rejected" && (
//                         <span className="text-red-600 font-semibold">Rejected ❌</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden space-y-4">
//             {bookings.map((b) => (
//               <div key={b._id} className="bg-white p-4 rounded-xl shadow">
//                 <p><b>User:</b> {b.userId?.firstName} {b.userId?.lastName}</p>
//                 <p><b>Garage:</b> {b.garageId?.garageName}</p>
//                 <p><b>Service:</b> {b.serviceId?.serviceName}</p>
//                 <p><b>Price:</b> ₹{b.price}</p>
//                 <p><b>Date:</b> {new Date(b.bookingDate).toLocaleDateString()}</p>

//                 {b.status === "Pending" && (
//                   <div className="flex gap-2 mt-3">
//                     <button onClick={() => updateStatus(b._id, "Accepted")} className="flex-1 bg-green-500 text-white py-1 rounded">
//                       Accept
//                     </button>

//                     <button onClick={() => updateStatus(b._id, "Rejected")} className="flex-1 bg-red-500 text-white py-1 rounded">
//                       Reject
//                     </button>
//                   </div>
//                 )}

//                 {b.status === "Accepted" && (
//                   <p className="text-green-600 font-semibold mt-2">Accepted ✅</p>
//                 )}

//                 {b.status === "Rejected" && (
//                   <p className="text-red-600 font-semibold mt-2">Rejected ❌</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GarageOwnerDashboard;








// components/owner/GarageOwnerDashboard.jsx
// components/owner/GarageOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GarageOwnerDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("garages");

  const [newGarageName, setNewGarageName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [file, setFile] = useState(null); // 🔥 NEW

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ================= FETCH =================
  const fetchGarages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garageowner/garages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garageowner/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGarages();
    fetchBookings();
  }, []);

  // ================= ADD GARAGE (UPDATED 🔥) =================
  const handleAddGarage = async () => {
    try {
      const formData = new FormData();

      formData.append("garageName", newGarageName);
      formData.append("city", newCity);
      formData.append("image", file); // 🔥 IMPORTANT

      const res = await axios.post(
        "http://localhost:3000/garage/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      setGarages([...garages, res.data]);

      setNewGarageName("");
      setNewCity("");
      setFile(null);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = async (garage) => {
    const newName = prompt("Enter new name", garage.garageName);
    if (!newName) return;

    await axios.put(
      `http://localhost:3000/garageowner/garages/${garage._id}`,
      { garageName: newName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchGarages();
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    await axios.delete(
      `http://localhost:3000/garageowner/garages/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchGarages();
  };

  // ================= ADD SERVICE =================
  const handleAddService = async (garageId) => {
    const name = prompt("Service Name");
    const price = prompt("Price");

    if (!name || !price) return;

    await axios.post("http://localhost:3000/service/add", {
      serviceName: name,
      price,
      garageId,
    });

    alert("Service Added ✅");
  };

  // ================= BOOKING =================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/booking/status/${id}`, {
        status,
      });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: status } : b
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Owner Panel</h2>

          <button
            onClick={() => setActiveTab("garages")}
            className={`block w-full text-left px-4 py-2 rounded mb-2 ${
              activeTab === "garages" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            My Garages
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "bookings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Bookings
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-6"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Garage Owner Dashboard
        </h1>

        {/* GARAGES */}
        {activeTab === "garages" && (
          <div>

            {/* ADD GARAGE */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <h2 className="font-semibold mb-3">Add Garage</h2>

              <div className="flex gap-3 flex-wrap">

                <input
                  type="text"
                  placeholder="Garage Name"
                  value={newGarageName}
                  onChange={(e) => setNewGarageName(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                />

                <input
                  type="text"
                  placeholder="City"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                />

                {/* 🔥 FILE INPUT */}
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="px-2 py-2 border rounded-lg"
                />

                {/* 🔥 IMAGE PREVIEW */}
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-16 rounded"
                  />
                )}

                <button
                  onClick={handleAddGarage}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>

            {/* GARAGE LIST */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Image</th> {/* 🔥 NEW */}
                    <th className="p-3">Garage</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {garages.map((g, i) => (
                    <tr key={g._id} className="border-b">
                      <td className="p-3">{i + 1}</td>

                      {/* 🔥 SHOW IMAGE */}
                      <td className="p-3">
                        <img
                          src={
                            g.image
                              ? `http://localhost:3000/${g.image}`
                              : "https://via.placeholder.com/80"
                          }
                          alt="garage"
                          className="h-12 w-16 object-cover rounded"
                        />
                      </td>

                      <td className="p-3">{g.garageName}</td>
                      <td className="p-3">{g.city}</td>

                      <td className="p-3 flex gap-2">
                        <button onClick={() => handleEdit(g)} className="bg-yellow-400 px-3 py-1 rounded">
                          Edit
                        </button>

                        <button onClick={() => handleDelete(g._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                          Delete
                        </button>

                        <button onClick={() => handleAddService(g._id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                          Add Service
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Garage</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b">
                    <td className="p-3">{b.userId?.firstName}</td>
                    <td className="p-3">{b.garageId?.garageName}</td>
                    <td className="p-3">{b.serviceId?.serviceName}</td>
                    <td className="p-3">₹{b.price}</td>
                    <td className="p-3">{new Date(b.bookingDate).toLocaleDateString()}</td>

                    <td className="p-3">
                      {b.status === "Pending" && (
                        <div className="flex gap-2">
                          <button onClick={() => updateStatus(b._id, "Accepted")} className="bg-green-500 text-white px-2 py-1 rounded">
                            Accept
                          </button>

                          <button onClick={() => updateStatus(b._id, "Rejected")} className="bg-red-500 text-white px-2 py-1 rounded">
                            Reject
                          </button>
                        </div>
                      )}

                      {b.status === "Accepted" && (
                        <span className="text-green-600 font-semibold">Accepted</span>
                      )}

                      {b.status === "Rejected" && (
                        <span className="text-red-600 font-semibold">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageOwnerDashboard;