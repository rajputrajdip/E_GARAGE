
// // components/Login.jsx

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Decode JWT
//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:3000/user/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);

//       const decoded = parseJwt(res.data.token);
//       if (!decoded) throw new Error("Token decode failed");

//       localStorage.setItem("userId", decoded.id);
//       localStorage.setItem("role", decoded.role);

//       toast.success("Welcome back 👋", { autoClose: 2000 });

//       setTimeout(() => {
//         if (decoded.role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (decoded.role === "owner") {
//           navigate("/owner/dashboard");
//         } else {
//           navigate("/");
//         }
//       }, 1500);

//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      
//       {/* Card */}
//       <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-2 text-orange-400">
//           E-Garage 🚗
//         </h2>
//         <p className="text-center text-gray-300 mb-6">
//           Login to your account
//         </p>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="flex flex-col gap-4">

//           {/* Email */}
//           <div className="flex items-center bg-white/20 rounded px-3">
//             <FiMail className="text-gray-300" />
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-transparent w-full p-2 outline-none text-white placeholder-gray-300"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center bg-white/20 rounded px-3">
//             <FiLock className="text-gray-300" />
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-transparent w-full p-2 outline-none text-white placeholder-gray-300"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPass(!showPass)}
//             >
//               {showPass ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-orange-500 hover:bg-orange-600 transition p-2 rounded font-semibold"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         {/* Footer */}
//         <p className="text-center text-gray-300 mt-6 text-sm">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             className="text-orange-400 cursor-pointer hover:underline"
//           >
//             Signup
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// };





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const decoded = parseJwt(res.data.token);
      if (!decoded) throw new Error("Token decode failed");

      localStorage.setItem("userId", decoded.id);
      localStorage.setItem("role", decoded.role);

      toast.success("Welcome back 🚀");

      setTimeout(() => {
        if (decoded.role === "admin") navigate("/admin/dashboard");
        else if (decoded.role === "owner") navigate("/owner/dashboard");
        else navigate("/");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-pink-500 items-center justify-center text-white p-10">
        <div>
          <h1 className="text-5xl font-bold mb-4">E-Garage 🚗</h1>
          <p className="text-lg opacity-90">
            Manage your vehicle services smarter, faster & easier.
          </p>

          <div className="mt-10 space-y-3">
            <p>✔ Book services instantly</p>
            <p>✔ Track your bookings</p>
            <p>✔ Connect with nearby garages</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Login Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border-b-2 border-gray-300 focus:border-orange-500 outline-none p-2 bg-transparent"
              />
              <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all 
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-orange-500
                peer-valid:-top-3 peer-valid:text-xs">
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full border-b-2 border-gray-300 focus:border-orange-500 outline-none p-2 bg-transparent"
              />
              <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all 
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-orange-500
                peer-valid:-top-3 peer-valid:text-xs">
                Password
              </label>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition"
            >
              {loading ? "Please wait..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};