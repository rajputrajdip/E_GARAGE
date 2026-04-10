
// // // components/owner/GarageOwnerDashboard.jsx
// // // components/owner/GarageOwnerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const GarageOwnerDashboard = () => {
//   const [garages, setGarages] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState("garages");

//   const [newGarageName, setNewGarageName] = useState("");
//   const [newCity, setNewCity] = useState("");
//   const [file, setFile] = useState(null); // 🔥 NEW

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

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

//   // ================= ADD GARAGE (UPDATED 🔥) =================
//   const handleAddGarage = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("garageName", newGarageName);
//       formData.append("city", newCity);
//       formData.append("image", file); // 🔥 IMPORTANT

//       const res = await axios.post(
//         "http://localhost:3000/garage/add",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setGarages([...garages, res.data]);

//       setNewGarageName("");
//       setNewCity("");
//       setFile(null);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= EDIT =================
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

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete?")) return;

//     await axios.delete(
//       `http://localhost:3000/garageowner/garages/${id}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     fetchGarages();
//   };

//   // ================= ADD SERVICE =================
//  const handleAddService = async (garageId) => {
//   const name = prompt("Service Name");
//   const twoPrice = prompt("Two Wheeler Price");
//   const fourPrice = prompt("Four Wheeler Price");

//   if (!name || !twoPrice || !fourPrice) return;

//   await axios.post("http://localhost:3000/service/add", {
//     serviceName: name,
//     priceTwoWheeler: Number(twoPrice),
//     priceFourWheeler: Number(fourPrice),
//     garageId,
//   });

//   alert("Service Added ✅");
// };

//   // ================= BOOKING =================
//   const updateStatus = async (id, status) => {
//   try {
//     await axios.put(
//       `http://localhost:3000/booking/status/${id}`,
//       { status },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setBookings((prev) =>
//       prev.map((b) =>
//         b._id === id ? { ...b, status } : b
//       )
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };



//   // ================= UI =================
//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Owner Panel</h2>

//           <button
//             onClick={() => setActiveTab("garages")}
//             className={`block w-full text-left px-4 py-2 rounded mb-2 ${
//               activeTab === "garages" ? "bg-blue-600" : "hover:bg-gray-700"
//             }`}
//           >
//             My Garages
//           </button>

//           <button
//             onClick={() => setActiveTab("bookings")}
//             className={`block w-full text-left px-4 py-2 rounded ${
//               activeTab === "bookings" ? "bg-blue-600" : "hover:bg-gray-700"
//             }`}
//           >
//             Bookings
//           </button>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-6"
//         >
//           Logout
//         </button>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-4 md:p-8">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6">
//           Garage Owner Dashboard
//         </h1>

//         {/* GARAGES */}
//         {activeTab === "garages" && (
//           <div>

//             {/* ADD GARAGE */}
//             <div className="bg-white p-5 rounded-xl shadow mb-6">
//               <h2 className="font-semibold mb-3">Add Garage</h2>

//               <div className="flex gap-3 flex-wrap">

//                 <input
//                   type="text"
//                   placeholder="Garage Name"
//                   value={newGarageName}
//                   onChange={(e) => setNewGarageName(e.target.value)}
//                   className="px-4 py-2 border rounded-lg"
//                 />

//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={newCity}
//                   onChange={(e) => setNewCity(e.target.value)}
//                   className="px-4 py-2 border rounded-lg"
//                 />

//                 {/* 🔥 FILE INPUT */}
//                 <input
//                   type="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="px-2 py-2 border rounded-lg"
//                 />

//                 {/* 🔥 IMAGE PREVIEW */}
//                 {file && (
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt="preview"
//                     className="h-16 rounded"
//                   />
//                 )}

//                 <button
//                   onClick={handleAddGarage}
//                   className="bg-green-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* GARAGE LIST */}
//             <div className="bg-white rounded-xl shadow overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="p-3">#</th>
//                     <th className="p-3">Image</th> {/* 🔥 NEW */}
//                     <th className="p-3">Garage</th>
//                     <th className="p-3">City</th>
//                     <th className="p-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {garages.map((g, i) => (
//                     <tr key={g._id} className="border-b">
//                       <td className="p-3">{i + 1}</td>

//                       {/* 🔥 SHOW IMAGE */}
//                       <td className="p-3">
//                         <img
//                           src={
//                             g.image
//                               ? `http://localhost:3000/${g.image}`
//                               : "https://via.placeholder.com/80"
//                           }
//                           alt="garage"
//                           className="h-12 w-16 object-cover rounded"
//                         />
//                       </td>

//                       <td className="p-3">{g.garageName}</td>
//                       <td className="p-3">{g.city}</td>

//                       <td className="p-3 flex gap-2">
//                         <button onClick={() => handleEdit(g)} className="bg-yellow-400 px-3 py-1 rounded">
//                           Edit
//                         </button>

//                         <button onClick={() => handleDelete(g._id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                           Delete
//                         </button>

//                         <button onClick={() => handleAddService(g._id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//                           Add Service
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         )}

//       {activeTab === "bookings" && (
//   <div className="bg-white rounded-xl shadow overflow-hidden">
//     <table className="w-full">
//       <thead className="bg-gray-200">
//         <tr>
//           <th className="p-3">User</th>
//           <th className="p-3">Garage</th>
//           <th className="p-3">Service</th>
//           <th className="p-3">Price</th>
//           <th className="p-3">Date</th>
//           <th className="p-3">Service Status</th>
//         </tr>
//       </thead>

//       <tbody>
//         {bookings.map((b) => (
//           <tr key={b._id} className="border-b">
//             <td className="p-3">{b.userId?.firstName}</td>
//             <td className="p-3">{b.garageId?.garageName}</td>
//             <td className="p-3">{b.serviceId?.serviceName}</td>
//             <td className="p-3">₹{b.price}</td>
//             <td className="p-3">
//               {new Date(b.bookingDate).toLocaleDateString()}
//             </td>

//             {/* ✅ MAIN LOGIC */}
//            <td className="p-3">
//   {!b.status || b.status === "pending" ? (
//     <button
//       onClick={() => updateStatus(b._id, "completed")}
//       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//     >
//       Complete
//     </button>
//   ) : (
//     <span className="text-green-600 font-semibold">
//       Completed ✅
//     </span>
//   )}
// </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// export default GarageOwnerDashboard;







// components/owner/GarageOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaCalendarAlt, 
  FaSignOutAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCog,
  FaCheckCircle,
  FaClock,
  FaImage,
  FaCity,
  FaBuilding,
  FaWrench,
  FaMotorcycle,
  FaCar,
  FaTimes,
  FaList
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const GarageOwnerDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("garages");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showServicesListModal, setShowServicesListModal] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const [newGarageName, setNewGarageName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [newService, setNewService] = useState({
    name: "",
    twoWheelerPrice: "",
    fourWheelerPrice: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const fetchGarages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/garageowner/garages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarages(res.data);
    } catch (err) {
      toast.error("Failed to fetch garages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/garageowner/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
      console.error(err);
    }
  };

  const fetchServicesForGarage = async (garageId) => {
    try {
      const res = await axios.get(`http://localhost:3000/service/garage/${garageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServicesList(res.data);
    } catch (err) {
      toast.error("Failed to fetch services");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGarages();
    fetchBookings();
  }, []);

  const handleAddGarage = async () => {
    if (!newGarageName || !newCity || !file) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("garageName", newGarageName);
      formData.append("city", newCity);
      formData.append("image", file);

      const res = await axios.post(
        "http://localhost:3000/garage/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGarages([...garages, res.data]);
      setNewGarageName("");
      setNewCity("");
      setFile(null);
      setPreviewUrl(null);
      setShowAddModal(false);
      toast.success("Garage added successfully!");
    } catch (err) {
      toast.error("Failed to add garage");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (garage) => {
    const newName = prompt("Enter new garage name", garage.garageName);
    if (!newName) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/garageowner/garages/${garage._id}`,
        { garageName: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGarages();
      toast.success("Garage updated successfully!");
    } catch (err) {
      toast.error("Failed to update garage");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this garage?")) return;

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:3000/garageowner/garages/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGarages();
      toast.success("Garage deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete garage");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.twoWheelerPrice || !newService.fourWheelerPrice) {
      toast.error("Please fill all service fields");
      return;
    }

    setLoading(true);
    try {
      if (editingService) {
        // Update existing service
        await axios.put(
          `http://localhost:3000/service/update/${editingService._id}`,
          {
            serviceName: newService.name,
            priceTwoWheeler: Number(newService.twoWheelerPrice),
            priceFourWheeler: Number(newService.fourWheelerPrice),
            garageId: selectedGarage._id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Service updated successfully!");
      } else {
        // Add new service
        await axios.post(
          "http://localhost:3000/service/add",
          {
            serviceName: newService.name,
            priceTwoWheeler: Number(newService.twoWheelerPrice),
            priceFourWheeler: Number(newService.fourWheelerPrice),
            garageId: selectedGarage._id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Service added successfully!");
      }

      setShowServiceModal(false);
      setEditingService(null);
      setNewService({ name: "", twoWheelerPrice: "", fourWheelerPrice: "" });
      fetchServicesForGarage(selectedGarage._id);
    } catch (err) {
      toast.error(editingService ? "Failed to update service" : "Failed to add service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:3000/service/delete/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Service deleted successfully!");
      fetchServicesForGarage(selectedGarage._id);
    } catch (err) {
      toast.error("Failed to delete service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      name: service.serviceName,
      twoWheelerPrice: service.priceTwoWheeler,
      fourWheelerPrice: service.priceFourWheeler
    });
    setShowServiceModal(true);
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/booking/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
      toast.success(`Booking marked as ${status}!`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const openServiceModal = async (garage) => {
    setSelectedGarage(garage);
    setEditingService(null);
    setNewService({ name: "", twoWheelerPrice: "", fourWheelerPrice: "" });
    setShowServiceModal(true);
  };

  const openServicesList = async (garage) => {
    setSelectedGarage(garage);
    await fetchServicesForGarage(garage._id);
    setShowServicesListModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <div className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl fixed h-full">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <FaWrench className="text-3xl text-blue-400" />
            <h2 className="text-2xl font-bold">Garage Owner</h2>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("garages")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "garages"
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaHome />
              <span>My Garages</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "bookings"
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaCalendarAlt />
              <span>Bookings</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-72 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-72 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {activeTab === "garages" ? "My Garages" : "Booking Management"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "garages"
                ? "Manage your garage locations and services"
                : "View and manage customer bookings"}
            </p>
          </div>

          {/* GARAGES TAB */}
          {activeTab === "garages" && (
            <div>
              {/* Add Garage Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md"
              >
                <FaPlus />
                <span>Add New Garage</span>
              </button>

              {/* Garages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {garages.map((garage) => (
                  <div
                    key={garage._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={
                          garage.image
                            ? `http://localhost:3000/${garage.image}`
                            : "https://images.unsplash.com/photo-1487754180451-456d677ae38f?auto=format&fit=crop&w=800"
                        }
                        alt={garage.garageName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => handleEdit(garage)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(garage._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {garage.garageName}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaCity className="mr-2" />
                        <span>{garage.city}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => openServiceModal(garage)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
                        >
                          <FaPlus size={14} />
                          <span>Add Service</span>
                        </button>
                        <button
                          onClick={() => openServicesList(garage)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
                        >
                          <FaList size={14} />
                          <span>View Services</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {garages.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow">
                  <FaBuilding className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No garages found</p>
                  <p className="text-gray-400">Click "Add New Garage" to get started</p>
                </div>
              )}
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-left">Garage</th>
                      <th className="p-4 text-left">Service</th>
                      <th className="p-4 text-left">Vehicle Type</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50 transition-all duration-200">
                        <td className="p-4">
                          <div>
                            <div className="font-semibold text-gray-800">
                              {booking.userId?.firstName} {booking.userId?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.userId?.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-700">
                          {booking.garageId?.garageName}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {booking.serviceId?.serviceName}
                          </span>
                        </td>
                        <td className="p-4">
                          {booking.vehicleType === "twoWheeler" ? (
                            <span className="flex items-center text-purple-600">
                              <FaMotorcycle className="mr-1" /> Two Wheeler
                            </span>
                          ) : (
                            <span className="flex items-center text-orange-600">
                              <FaCar className="mr-1" /> Four Wheeler
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-semibold text-green-600">
                          ₹{booking.price}
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4">
                          {!booking.status || booking.status === "pending" ? (
                            <button
                              onClick={() => updateStatus(booking._id, "completed")}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
                            >
                              <FaCheckCircle />
                              <span>Mark Complete</span>
                            </button>
                          ) : (
                            <span className="flex items-center text-green-600 font-semibold">
                              <FaCheckCircle className="mr-2" />
                              Completed
                            </span>
                          )}
                        </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No bookings found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Garage Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Garage</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Garage Name"
                value={newGarageName}
                onChange={(e) => setNewGarageName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="City"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Garage Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddGarage}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
                >
                  {loading ? "Adding..." : "Add Garage"}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showServiceModal && selectedGarage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingService ? "Edit Service" : "Add Service"}
              </h2>
              <button onClick={() => {
                setShowServiceModal(false);
                setEditingService(null);
              }} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600 mb-4">For: {selectedGarage.garageName}</p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name (e.g., Oil Change, Engine Repair)"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaMotorcycle className="mr-2 text-purple-600" />
                  Two Wheeler Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price for two wheeler"
                  value={newService.twoWheelerPrice}
                  onChange={(e) => setNewService({...newService, twoWheelerPrice: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCar className="mr-2 text-orange-600" />
                  Four Wheeler Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price for four wheeler"
                  value={newService.fourWheelerPrice}
                  onChange={(e) => setNewService({...newService, fourWheelerPrice: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddService}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200"
                >
                  {loading ? "Processing..." : (editingService ? "Update Service" : "Add Service")}
                </button>
                <button
                  onClick={() => {
                    setShowServiceModal(false);
                    setEditingService(null);
                    setNewService({ name: "", twoWheelerPrice: "", fourWheelerPrice: "" });
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Services Modal */}
      {showServicesListModal && selectedGarage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Services - {selectedGarage.garageName}</h2>
              <button onClick={() => setShowServicesListModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            
            {servicesList.length === 0 ? (
              <div className="text-center py-8">
                <FaWrench className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No services added yet</p>
                <button
                  onClick={() => {
                    setShowServicesListModal(false);
                    openServiceModal(selectedGarage);
                  }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Add First Service
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {servicesList.map((service) => (
                  <div key={service._id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          {service.serviceName}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <FaMotorcycle className="text-purple-600" />
                            <div>
                              <p className="text-sm text-gray-500">Two Wheeler</p>
                              <p className="text-lg font-bold text-green-600">₹{service.priceTwoWheeler}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaCar className="text-orange-600" />
                            <div>
                              <p className="text-sm text-gray-500">Four Wheeler</p>
                              <p className="text-lg font-bold text-green-600">₹{service.priceFourWheeler}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setShowServicesListModal(false);
                            handleEditService(service);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all duration-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GarageOwnerDashboard;