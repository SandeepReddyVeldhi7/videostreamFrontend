import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './App.css'
import Header from './components/Header/Header'
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Sidebar1 from './components/Header/Sidebar1'
import { BASE_URL } from "../constants";


const API = axios.create({
  baseUrl: BASE_URL,
  withCredentials: true,
});
function App() {

  const toogleBox = useSelector((state) => state.ui.isMenuOpen);
  
  const user = useSelector((state) => state.auth.userData);
  
 

   
  
  return (
    <div className=" ">
      <div>
        
        <Header />
      </div>

      <Toaster position="top-center" />
      <div className="main-content my-16   ">
        <Sidebar />
        {toogleBox && <Sidebar1 />}
        <Outlet />
      </div>
    </div>
  );
}

export default App
