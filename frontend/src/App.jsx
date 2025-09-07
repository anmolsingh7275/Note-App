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
import Navbar from './Components/Navbar'
import NoteCard from './Components/Notecard'
import Home from './pages/Home'
import { fromUnixTime } from 'date-fns'

function App() {

  return (
    <>
 
        <div className="min-h-screen w-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navbar />



        {/* main should take the remaining space; keep it full width */}

        <main className="w-full min-h-[calc(100vh-64px)]"> 
          <Routes>
               <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AddNote" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>

    </>
  )
}

export default App
