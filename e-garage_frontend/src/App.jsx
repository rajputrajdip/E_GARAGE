import { useState } from 'react'
import AppRouter from './router/AppRouter'
import { ToastContainer, Bounce } from 'react-toastify'
import SignUp from './components/SignUp'
import axios from 'axios'
import { FiHome, FiUser, FiLogOut, FiClipboard } from "react-icons/fi";

//import './App.css'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:3000"

  return (
    
      <>
      <AppRouter></AppRouter>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
        />
     </>
        
  )
}

export default App
