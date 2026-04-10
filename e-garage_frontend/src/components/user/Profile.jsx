
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserEdit, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:3000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUser(res.data);
    setFormData(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-lg">
            {user.firstName?.[0]}
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          My Profile
        </h2>

        {!editMode ? (
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl transition"
            >
              <FaUserEdit /> Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="First Name"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Last Name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Email"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl transition"
              >
                <FaSave /> Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 py-2.5 rounded-xl transition"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;



