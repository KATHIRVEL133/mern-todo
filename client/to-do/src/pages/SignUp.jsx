/* eslint-disable no-unused-vars */
import { useState } from "react";
export default function SignUp() {
  const [formData,setFormData] = useState({});
  const handleChange = (e)=>
  {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  return (
    <div className="flex flex-col justify-between items-center mt-52 gap-5"> 
      <h1 className="font-semibold text-2xl">
        Sign Up
      </h1>
      <form className="flex flex-col gap-3 w-[300px] sm:w-[350px]">
        <input type="text" placeholder="Username" id="username"  onChange={handleChange} className="p-3 border rounded-md"/>
        <input type="email" placeholder="Enter your email" id="email"  onChange={handleChange} className="p-3 border rounded-md"/>
        <input type="password" placeholder="Password" id="password"  onChange={handleChange} className="p-3 border rounded-md"/>
        <button className="p-3 bg-green-700 text-white rounded-lg uppercase">
          Sign Up
        </button>
      </form>
    </div>
  )
}
