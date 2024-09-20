/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e)=>
  {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try
    {
      setError(null);
      const res = await fetch('/api/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success===false)
      {
        setError(data.message);
        return;
      }
      navigate('/sign-in');
    }
    catch(error)
    {
      setError(error);
    }
  }
  return (
    <div className="flex flex-col justify-between items-center mt-32 sm:mt-52 gap-5"> 
      <h1 className="font-semibold text-2xl">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[300px] sm:w-[350px]">
        <input type="text" placeholder="Username" id="username"  onChange={handleChange} className="p-3 border rounded-md"/>
        <input type="email" placeholder="Enter your email" id="email"  onChange={handleChange} className="p-3 border rounded-md"/>
        <input type="password" placeholder="Password" id="password"  onChange={handleChange} className="p-3 border rounded-md"/>
        <button className="p-3 bg-green-700 text-white rounded-lg uppercase">
          Sign Up
        </button>
      </form>
      {
        error&&<p className="text-sm text-red-600">
          {error}
        </p>
      }
    </div>
  )
}
