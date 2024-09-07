/* eslint-disable no-unused-vars */
import { useState } from "react"

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const handleChange = (e)=>
    {
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    
  return (
    <div className="flex flex-col justify-between items-center mt-52 gap-5"> 
      <h1 className="font-semibold text-2xl">
        Sign In 
      </h1>
      <form className="flex flex-col gap-3 w-[300px] sm:w-[350px]">
        <input type="email" placeholder="Enter your email" id="email" className="p-3 border rounded-md" onChange={handleChange}/>
        <input type="password" placeholder="Password"  id="password" className="p-3 border rounded-md" onChange={handleChange}/>
        <button className="p-3 bg-green-700 text-white rounded-lg uppercase">
          Sign In
        </button>
      </form>
    </div>
  )
}
