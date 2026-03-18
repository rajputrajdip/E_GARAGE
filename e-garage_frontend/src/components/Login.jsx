
// import axios from "axios";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


// export const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const SubmitHandler = async(data) => {
//     try{
//       const res = await axios.post("/user/login",data) //fack  https://node5.onrender.com
//       console.log("res...", res);
//     //  console.log(res.data)
//       if(res.status==200){
//         //alert("data was saved")
//         toast.success("login success")

//         //navigate --- role based navigate
//         if(res.data.data.role=="user"){
//           //navigate to user dashboard
//           navigate("/user")
//         }
//         else if (res.data.data.role=="admin"){
//           //navigate to admin dashboard
//           navigate("/admin")
//         }
//       else{
//         toast.error("invalid role")
//         navigate("/") //redirect to again login page
//       }
//       }
//       }catch(err){
//         // alert("data was not saved")
//         toast.error(err.response.data.message);
      
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
//       <form 
//         onSubmit={handleSubmit(SubmitHandler)}
//         className="bg-white p-8 rounded-2xl shadow-lg w-80"
//       >
//         <h1 className="text-2xl font-bold text-center mb-6">Welcome back</h1>
//         <h6>*please login to continue</h6><br/>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             {...register("email", { required: "email is required" })}
//             required
//             />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             {...register("password", { required: "Password is required" })}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           Login
//         </button>
//       </form>

//     </div>
//   )
// };


import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const SubmitHandler = async(data) => {
    try{
      const res = await axios.post("http://localhost:3000/user/login",data)
      console.log("res...", res);

      if(res.status==200){
        toast.success("login success")
        // console.log("role...", res.data.data.role)
        // console.log(res.data.token)

        if(res.data.data.role=="user"){
          navigate("/")
        }
        else if (res.data.data.role=="admin"){
          navigate("/admin")
        }
        else{
          toast.error("invalid role")
          navigate("/")
        }
      }
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-600">

      <form 
        onSubmit={handleSubmit(SubmitHandler)}
        className="bg-white p-10 rounded-2xl shadow-2xl w-96"
      >

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Please login to continue
        </p>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            {...register("email", { required: "email is required" })}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            {...register("password", { required: "Password is required" })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <span className="text-blue-600 cursor-pointer">Signup</span>
        </p>

      </form>




    </div>
  )
};