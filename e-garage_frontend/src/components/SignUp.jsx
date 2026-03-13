import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {

      const res = await axios.post("http://localhost:3000/user/register",data);  //fake   http://localhost:3000

      console.log("response..", res);

      if (res.status === 201) {
        toast.success("User registered successfully 🎉");
        navigate("/"); // go to login page
      }

    } catch (error) {
      console.log("error..", error);
      toast.error("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="office"
          className="object-cover w-full h-full"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Create Account 🚀</h2>
          <p className="text-gray-500 mb-6">Signup to get started</p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

            {/* FIRST NAME */}
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-lg"
                {...register("firstName", { required: "First Name is required" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            {/* LAST NAME */}
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded-lg"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Signup
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}   





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Form Validation
//   const validate = () => {
//     let newErrors = {};

//     if (!formData.firstname.trim()) {
//       newErrors.firstname = "First Name is required";
//     }
//     if (!formData.lastname.trim()) {
//       newErrors.lastname = "Last Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:3000/user/register/",
//         {
//           firstName: formData.firstname,
//           lastName: formData.lastname,
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       console.log("Signup Success:", response.data);

//       alert("Account Created Successfully 🎉");
//       navigate("/login");

//     } catch (error) {
//       console.error("Signup Error:", error.response?.data || error.message);

//       if (error.response?.data?.message) {
//         alert(error.response.data.message);
//       } else {
//         alert("Registration Failed ❌");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Create Account 🚀
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Full Name */}
//           <div>
//             <label className="block text-gray-700 mb-1">First Name</label>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="Enter your first name"
//               value={formData.firstname}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.firstname && (
//               <p className="text-red-500 text-sm">{errors.firstname}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Last Name</label>
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Enter your last name"
//               value={formData.lastname}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.lastname && (
//               <p className="text-red-500 text-sm">{errors.lastname}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <span
//                 className="absolute right-3 top-2 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁"}
//               </span>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-5">
//           Already have an account?{" "}
//           <span
//             className="text-indigo-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Form Validation
//   const validate = () => {
//     let newErrors = {};

//     if (!formData.firstname.trim()) {
//       newErrors.firstname = "First Name is required";
//     }
//     if (!formData.lastname.trim()) {
//       newErrors.lastname = "Last Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:3000/user/register/",
//         {
//           firstName: formData.firstname,
//           lastName: formData.lastname,
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       console.log("Signup Success:", response.data);

//       alert("Account Created Successfully 🎉");
//       navigate("/login");

//     } catch (error) {
//       console.error("Signup Error:", error.response?.data || error.message);

//       if (error.response?.data?.message) {
//         alert(error.response.data.message);
//       } else {
//         alert("Registration Failed ❌");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Create Account 🚀
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Full Name */}
//           <div>
//             <label className="block text-gray-700 mb-1">First Name</label>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="Enter your first name"
//               value={formData.firstname}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.firstname && (
//               <p className="text-red-500 text-sm">{errors.firstname}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Last Name</label>
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Enter your last name"
//               value={formData.lastname}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.lastname && (
//               <p className="text-red-500 text-sm">{errors.lastname}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <span
//                 className="absolute right-3 top-2 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁"}
//               </span>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-5">
//           Already have an account?{" "}
//           <span
//             className="text-indigo-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;