import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"; // ✅ Must import Tailwind CSS
import { ToastProvider } from "./Components/Toast"; 

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
)
