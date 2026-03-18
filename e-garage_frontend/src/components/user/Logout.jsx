import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {

    // Remove user data or token
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
    }, 1500);

  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-10 text-center">

        <h1 className="text-2xl font-bold mb-4 text-red-500">
          Logging Out...
        </h1>

        <p className="text-gray-600">
          You are being logged out. Please wait.
        </p>

      </div>

    </div>
  );
}

export default Logout;