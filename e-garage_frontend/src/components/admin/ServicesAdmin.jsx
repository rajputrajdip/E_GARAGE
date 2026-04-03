// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FiSearch, FiTool } from "react-icons/fi";

// const ServicesAdmin = () => {
//   const [services, setServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const token = localStorage.getItem("token");

//   // 📦 Fetch Services
//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/service/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setServices(res.data);
//     } catch (err) {
//       console.error("Error fetching services:", err);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // 🔍 Search Filter
//   const filteredServices = services.filter((s) =>
//     s.serviceName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">

//       {/* 🔥 HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//           <FiTool className="text-blue-500" />
//           Manage Services
//         </h2>

//         <div className="text-sm text-gray-500">
//           Total: {filteredServices.length}
//         </div>
//       </div>

//       {/* 🔍 SEARCH BOX */}
//       <div className="relative mb-6">
//         <FiSearch className="absolute left-3 top-3 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search services..."
//           className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* 🧾 TABLE CARD */}
//       <div className="bg-white rounded-xl shadow-md border overflow-hidden">

//         {/* TABLE */}
//         <table className="w-full text-sm">
          
//           {/* HEADER */}
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="p-4 text-left">#</th>
//               <th className="p-4 text-left">Service Name</th>
//               <th className="p-4 text-left">Price</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {filteredServices.length > 0 ? (
//               filteredServices.map((s, i) => (
//                 <tr
//                   key={s._id}
//                   className="border-t hover:bg-gray-50 transition duration-150"
//                 >
//                   <td className="p-4 text-gray-500">{i + 1}</td>

//                   <td className="p-4 font-medium text-gray-800">
//                     {s.serviceName}
//                   </td>

//                   <td className="p-4">
//                     <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
//                       ₹{s.price}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="p-10 text-center text-gray-400">
//                   <div className="flex flex-col items-center gap-2">
//                     <FiTool size={28} />
//                     <p>No services found</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServicesAdmin;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiTool, FiPlus, FiEdit, FiTrash } from "react-icons/fi";

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    serviceName: "",
    price: "",
  });

  const token = localStorage.getItem("token");

  // 📦 Fetch Services
  const fetchServices = async () => {
    const res = await axios.get("http://localhost:3000/service/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔍 Filter
  const filteredServices = services.filter((s) =>
    s.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ OPEN ADD
  const handleAdd = () => {
    setForm({ serviceName: "", price: "" });
    setEditId(null);
    setShowModal(true);
  };

  // ✏️ OPEN EDIT
  const handleEdit = (service) => {
    setForm({
      serviceName: service.serviceName,
      price: service.price,
    });
    setEditId(service._id);
    setShowModal(true);
  };

  // 💾 SAVE (ADD / EDIT)
  const handleSubmit = async () => {
    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/service/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE
        await axios.post(
          "http://localhost:3000/service/add",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setShowModal(false);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await axios.delete(`http://localhost:3000/service/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchServices();
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FiTool className="text-blue-500" />
          Manage Services
        </h2>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((s, i) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{s.serviceName}</td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{s.price}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-500 hover:underline flex items-center gap-1"
                  >
                    <FiTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Service" : "Add Service"}
            </h3>

            <input
              type="text"
              placeholder="Service Name"
              value={form.serviceName}
              onChange={(e) =>
                setForm({ ...form, serviceName: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesAdmin;