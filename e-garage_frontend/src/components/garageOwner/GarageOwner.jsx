import React, { useState } from "react";
import axios from "axios";


function GarageOwner() {

  const [garageOwner, setGarageOwner] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    document: null
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "document") {
      setGarageOwner({ ...garageOwner, document: files[0] });
    } else {
      setGarageOwner({ ...garageOwner, [name]: value });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", garageOwner.name);
    formData.append("email", garageOwner.email);
    formData.append("password", garageOwner.password);
    formData.append("phone", garageOwner.phone);
    formData.append("document", garageOwner.document);

    try {

      const res = await axios.post(
        "http://localhost:3000/garageOwner/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      alert("Garage Owner Registered Successfully");

      // reset form
      setGarageOwner({
        name: "",
        email: "",
        password: "",
        phone: "",
        document: null
      });

    } catch (error) {

      console.error(error);
      alert("Error registering garage owner");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Garage Owner Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={garageOwner.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={garageOwner.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={garageOwner.password}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={garageOwner.phone}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Upload Document</label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register Garage Owner
          </button>

        </form>

      </div>

    </div>
  );
}

export default GarageOwner;