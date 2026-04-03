import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl">
            {user.firstName[0]}
          </div>
        </div>

        <h2 className="text-center text-xl font-bold mb-4">
          My Profile
        </h2>

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 mb-2 rounded"
              placeholder="First Name"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 mb-2 rounded"
              placeholder="Last Name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 mb-2 rounded"
              placeholder="Email"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;