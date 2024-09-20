import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="flex gap-3 bg-slate-500 text-white p-3 items-center " >
    <Link to={'/'} className="flex-1">
    <h1>
        <span className="text-lg mr-2">
            Kathir
        </span>
        <span className="text-slate-800 text-2xl italic">
            TodoList 
        </span>
      </h1>
    </Link>
    <Link to={'/about'}>
      About
    </Link>
  
    <Link to='/profile'>
     {currentUser?(<li className="list-none">profile</li>):(<li className='sm:inline list-none text-white hover:underline'>sign in</li>)}
    </Link>
    </div>
  )
}
