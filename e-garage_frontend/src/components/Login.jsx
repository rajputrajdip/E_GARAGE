// import React from 'react'

// export const Login = () => {
//   return (
//     <div style={{textAlign:'center'}}>
//       <h1>login</h1>
//     </div>
//   )
// }

// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'

// export const Login = () => {
// const {register,handleSubmit} = useForm()
// const [useData, setuseData] = useState('')
// const submitHandler = (data)=>{
//   console.log(data);
//   setuseData(data)
  
// }

//   return (
//     <div style={{textAlign:'center'}}>
//       <h1>FormDemo1</h1>
//       <form onSubmit={handleSubmit(submitHandler)}>
//     <div>
//       <label>Name</label>
//       <input type='Text' placehoder='Enter Name' {...register("firstname")}></input>
//     </div>
//     <div>
//       <label>age</label>
//       <input type='Text'{...register("age")}></input>
//       </div> 
//       <div>
//       <label>gender</label><br/>
//       male:<input type = 'radio' valaue='male' {...register("gender")}></input>
//       female:<input type ='radio' value='female' {...register("gender")}></input>
//       </div>
//       <div>
//         <label>hobbies</label><br/>
//         CHEESS:<input type='checkbox' value='chess' {...register("hobbies")}></input>
//         SLEEPING:<input type='checkbox' value='sleeping' {...register("hobbies")}></input>
//         CRICKET:<input type='checkbox' value='cricket' {...register("hobbies")}></input>
//       </div>
//       <div>
//         <input type='submit' />
//       </div>
//       </form>
//       <h1> name {useData.firstname}</h1>
//       <h1>age {useData.firstname}</h1>
//       <h1>gender {useData.gender}</h1> 
    
//     </div>
//   )
// }

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
      const res = await axios.post("/user/login",data) //fack  https://node5.onrender.com
      console.log("res...", res);
    //  console.log(res.data)
      if(res.status==200){
        //alert("data was saved")
        toast.success("login success")

        //navigate --- role based navigate
        if(res.data.data.role=="user"){
          //navigate to user dashboard
          navigate("/user")
        }
        else if (res.data.data.role=="admin"){
          //navigate to admin dashboard
          navigate("/admin")
        }
      else{
        toast.error("invalid role")
        navigate("/") //redirect to again login page
      }
      }
      }catch(err){
        // alert("data was not saved")
        toast.error(err.response.data.message);
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form 
        onSubmit={handleSubmit(SubmitHandler)}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Welcome back</h1>
        <h6>*please login to continue</h6><br/>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", { required: "email is required" })}
            required
            />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", { required: "Password is required" })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>

    </div>
  )
};
