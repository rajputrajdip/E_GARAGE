// src/pages/ForgotPassword.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/user/forgotpassword", {
        email,
      });

      toast.success("Reset link sent to your email 📩");

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500">

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Forgot Password 🔐
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a reset link
        </p>

        {/* Email Input */}
        <div className="relative mb-6">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition font-semibold"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Back to login */}
        <p className="text-center text-sm mt-5">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;