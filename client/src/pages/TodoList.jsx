/* eslint-disable no-unused-vars */
import {  useEffect, useState } from "react"
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useSelector } from "react-redux";

export default function TodoList() {
  const {currentUser} = useSelector((state)=>state.user)
  const [todoData,setTodoData] = useState('');
  const [error,setError] = useState(null);
  const [existTodo,setExistsTodo] = useState(false);
  const [todoId,setTodoId] = useState(null);
  const [todoArray,setTodoArray] = useState({
    todo:[],
  });
  useEffect(()=>
  {
    const userExist = async () =>
    {
    setExistsTodo(false);
    const res = await fetch(`/api/user/existUserTodo/${currentUser._id}`);
    const data = await res.json();
    if(data.success===false)
    {
      console.log(data.message);
      return;
    }
    if(data==='yes')
    {
      setExistsTodo(true);
      fetchData();
    }
    else 
      return ;
    }
    const fetchData = async () =>
    {
    const res = await fetch(`/api/user/getUserTodo/${currentUser._id}`);
    const data = await res.json();
    if(data.success===false)
    {
      console.log(data.message);
      return ;
    }
    setTodoArray({todo:data.todo});
    setTodoId(data._id);
    }
    userExist();
  },[])
  const handleChange = (e)=>
  {
  if(e.target.id=='todo')
  {
    setTodoData(e.target.value);
  }
  }
  const addButton = (e)=>
  {
  e.preventDefault();
  setTodoArray({...todoArray,todo:todoArray.todo.concat(todoData)});
  setTodoData('');
  document.getElementById('todo').value = "";
  }
 const handleDelete = (index)=>
 {
 const newArray = todoArray.todo.filter((_,i)=>i!==index);
 setTodoArray({todo:newArray});
 }
 const handleUp = (index)=>
 {
 
 if(index>0)
 {
  const newArray = [...todoArray.todo];
  [newArray[index],newArray[index-1]] = [newArray[index-1],newArray[index]];
  setTodoArray({...todoArray,todo:newArray});
 }
 }
 const handleDown = (index)=>
 {
if(index<todoArray.todo.length-1)
{
  const newArray = [...todoArray.todo];
  [newArray[index],newArray[index+1]] = [newArray[index+1],newArray[index]];
  setTodoArray({...todoArray,todo:newArray});
}
 }
 const handleUpdate = async ()=>
 {
  try
  {
  const res = await fetch(`/api/user/update/${todoId}`,{
    method:'POST',
    headers:
    {
         'Content-Type':'application/json',
    },
    body:JSON.stringify(todoArray)
   ,
  });
  const data = await res.json();
  if(data.success===false)
  {
    console.log(error);
    return ;
  }
  console.log(data);
  setTodoArray({todo:data.todo});
  }
  catch(error)
  {
    console.log(error);
  }
 }
 const handleSubmit = async ()=>
 {
  try
  {
  const res = await fetch(`/api/user/create`,{
    method:'post',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({...todoArray,userRef:currentUser._id})
  });
  const data = await res.json();
  if(data.success===false)
  {
    console.log(data);
    return;
  }
  setTodoArray({todo:data.todo});
  }
  catch(error)
  {
    console.log(error);
  }
 }
  return (
    <form onSubmit={handleSubmit}>
     <div className="flex flex-col gap-6 items-center my-52">
          <h1 className="font-semibold text-xl sm:text-3xl text-slate-500">
            <span className="text-green-500">TodoList</span> for your greater productivity
          </h1>
          <div className="flex gap-2">
            <input type="text" id="todo" className="border rounded-lg p-3 w-80  focus:outline-indigo-600" onChange={handleChange} placeholder="Enter your Todo"/>
            <button type="button" className="border p-3 h-12 rounded-lg text-white bg-green-700 uppercase hover:opacity-90" onClick={addButton}>
              Add
            </button>
          </div> 
          <ul className="w-full sm:w-[500px] text-left">
            {
              todoArray.todo.length>0&&(
                todoArray.todo.map((todo,index)=>(
                <li key={index} className="flex gap-2 items-center m-3  font-bold  rounded-lg shadow MD  p-3">
                 <p className="text-xl flex-1">
                  {todo}
                 </p>
                 <FaArrowUp className="text-lg cursor-pointer" onClick={()=>handleUp(index)}/>
                 <FaArrowDown  className="text-blue-700 text-lg cursor-pointer" onClick={()=>handleDown(index)}/>
                 <button type="button" className="bg-red-600 text-white rounded-lg p-2" onClick={()=> handleDelete(index)}>
                  Delete
                </button> 
                </li>
                ))
              )
            }
          </ul>
          {
            existTodo && 
            <button type="button" onClick={handleUpdate} className="rounded-lg w-full sm:w-[500px] p-3 bg-red-600 text-white uppercase">
              Update
            </button>
          }
          {
            !existTodo&&
            <button  className="rounded-lg w-full sm:w-[500px] p-3 bg-green-600 text-white uppercase">
              Create
            </button>
          }
          {
            error && 
            <p className=" mt-3 text-sm text-red-500">
              {error}
            </p>
          }
      </div>
     
    </form>
   
  )
}
