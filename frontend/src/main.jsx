import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"; // ✅ Must import Tailwind CSS

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  
    <App />

  </BrowserRouter>
)
