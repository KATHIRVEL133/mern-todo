
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header.jsx'
import TodoList from './pages/TodoList.jsx'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute.jsx'
function App() {


  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/to-do' element={<TodoList/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
