import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex gap-3 bg-slate-500 text-white p-3 items-center">
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
    <Link to={'/sign-in'}>
     Sign In
    </Link>
    <Link to={'/sign-up'}>
     Sign Up
    </Link>
    </div>
  )
}
