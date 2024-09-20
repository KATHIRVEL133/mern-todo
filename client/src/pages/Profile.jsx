/* eslint-disable no-unused-vars */
import { useSelector,useDispatch } from "react-redux"
import { useRef, useState } from "react"
import { signOutStart, signOutSuccess, singOutFailure, updateFailure, updateSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {currentUser,error} = useSelector((state)=> state.user);
    const [file,setFile] = useState(undefined);
    const fileRef = useRef(null);
    const [formData,setFormData] = useState({});
    console.log(formData);
    const handleUpdate = async (e)=>
    {
    e.preventDefault();
    try
    {
    const res = await fetch(`/api/user/updateUser/${currentUser._id}`,{
      method:'POST',
      headers:
      {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    });
   
    const data = await res.json();
    console.log(data);
    if(data.success===false)
    {
      dispatch(updateFailure(data.message));
      return;
    }
      dispatch(updateSuccess(data));
    }
    catch(error)
    {
      dispatch(updateFailure(error));
    }
    }
  const handleChange = (e) =>
  {
  setFormData({...formData,[e.target.id]:e.target.value});
  }
  const handleSignOut = async ()=>
  {
 try
 {
 const res = await fetch(`/api/auth/signOut`);
 const data = await res.json();
 if(data.success===false)
 {
  dispatch(singOutFailure(data.message));
  return;
 }
 dispatch(signOutSuccess(null));
 navigate('/sign-in');
 }
 catch(error)
 {
  dispatch(singOutFailure(error));
 }
  }
  return (
    <div className="flex flex-col gap-3 max-w-lg mx-auto my-44">
       <h1 className="font-semibold  text-2xl text-center sm:ml-28">
        Profile
      </h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3 w-full sm:w-[300px] sm:w-[350px]">
        <input type="text"  onChange={handleChange} defaultValue={currentUser.username} placeholder="Username" id="username"   className="p-3 border rounded-md"/>
        <input type="email"   onChange={handleChange}  defaultValue={currentUser.email} placeholder="Enter your email" id="email"   className="p-3 border rounded-md"/>
        <input type="password"   onChange={handleChange}  placeholder="Password" id="password"   className="p-3 border rounded-md"/>
        <button type="submit" className="p-3 bg-green-700 text-white rounded-lg uppercase">
          Update
        </button>
      </form>
      <button type="button" className="p-3 text-white bg-red-600 w-full sm:w-[350px] rounded-lg" onClick={handleSignOut}>
        Sign Out
      </button>
      {
        error&&error
      }
    </div>
  )
}
