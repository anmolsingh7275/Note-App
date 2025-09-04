import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route , Routes } from 'react-router-dom'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import AddNote from './pages/AddNote'
import Dashboard from './pages/Dashboard'
import EditNote from './pages/Edit'
function App() {

  return (
    <>
 
   <Routes>
<Route path='/Signup' element = {<Signup />}/>
<Route path='/Login' element = {<Login />}/>
<Route path='/AddNote' element = {<AddNote />}/>
<Route path='/Dashboard' element = {<Dashboard/>}/>
<Route path='/Edit' element = {<EditNote/>}/>
   </Routes>
    </>
  )
}

export default App
