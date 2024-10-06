import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import useDataStore from './store/DataStore';
import SideBar from './components/SideBar';



function App() {

  return (
    <div>
      <ToastContainer/>
      {/* <Login/> */}
      <SideBar/>
      
    </div>
  )
}

export default App
