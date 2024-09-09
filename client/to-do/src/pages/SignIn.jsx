/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const handleChange = (e)=>
    {
      setFormData({...formData,[e.target.id]:e.target.value})
    }
  const handleSubmit = async (e) =>
  {
  e.preventDefault();
  try
  {
  setError(null);
  const res = await fetch('/api/auth/sign-in',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  });
  const data = await res.json();
  if(data.success===false)
  {
    setError(data.message);
    return;
  }

  navigate(`/to-do/${data._id}`);
  }
  catch(error)
  {
    setError(error);
  }
  }
  return (
    <div className="flex flex-col justify-between items-center mt-52 gap-5"> 
      <h1 className="font-semibold text-2xl">
        Sign In 
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[300px] sm:w-[350px]">
        <input type="email" placeholder="Enter your email" id="email" className="p-3 border rounded-md" onChange={handleChange}/>
        <input type="password" placeholder="Password"  id="password" className="p-3 border rounded-md" onChange={handleChange}/>
        <button className="p-3 bg-green-700 text-white rounded-lg uppercase">
          Sign In
        </button>
      </form>
      {
        error&&<p className="text-red-600 text-sm">
          {error}
        </p>
      }
    </div>
  )
}
