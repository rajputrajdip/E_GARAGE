import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:3000/user/resetpassword/${token}`,
        { password }
      );

      toast.success("Password updated successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2">
          Reset Password 🔐
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your new password
        </p>

        {/* Password */}
        <div className="relative mb-5">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPass ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition font-semibold"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {/* Back */}
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

export default ResetPassword;