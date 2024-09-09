import {  useState } from "react"


export default function TodoList() {
  const [todoData,setTodoData] = useState('');
  const [todoArray,setTodoArray] = useState([]);
  const handleChange = (e)=>
  {
  setTodoData(e.target.value);
  }
  const addButton = (e)=>
  {
  e.preventDefault();
  setTodoArray([...todoArray,todoData]);
  setTodoData('');
  document.getElementById('todo').value = "";
  }
 const handleDelete = (index)=>
 {
 const newArray = todoArray.filter((_,i)=>i!==index);
 setTodoArray(newArray);
 }
  return (
    <form>
     <div className="flex flex-col gap-6 items-center my-52 ">
          <h1 className="font-semibold text-3xl text-slate-500">
            <span className="text-green-500">TodoList</span> for your greater productivity
          </h1>
          <div className="flex gap-2">
            <input type="text" id="todo" className="border rounded-lg p-3 w-80  focus:outline-indigo-600" onChange={handleChange} placeholder="Enter your Todo"/>
            <button type="button" className="border p-3 h-12 rounded-lg text-white bg-green-700 uppercase hover:opacity-90" onClick={addButton}>
              Add
            </button>
          </div> 
          <ul className="w-[500px] text-left">
            {
              todoArray.length>0&&(
                todoArray.map((todo,index)=>(
                <li key={index} className="flex gap-2 items-center m-3  font-bold  rounded-lg shadow MD  p-3">
                 <p className="text-xl flex-1">
                  {todo}
                 </p>
                 <div className="flex items-center gap-1 border p-2 shadow-lg">
                 <label>
                  Done
                 </label>
                 <input type="checkbox" className="w-5 h-4"/>
                 </div>
                 <button type="button" className="bg-red-600 text-white rounded-lg p-2" onClick={()=> handleDelete(index)}>
                  Delete
                </button> 
                </li>
                ))
              )
            }
            </ul>
          <button className="w-full bg-blue-700 max-w-sm p-3 text-white uppercase rounded-lg hover:opacity-95">
           Update
          </button>
      </div>
     
    </form>
   
  )
}
