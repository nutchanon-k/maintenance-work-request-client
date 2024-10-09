import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layouts/AdminLayout';
import AppRouter from './router/AppRoute';
import Login from './pages/authenticate/Login';




function App() {

  return (
    <div>
      <ToastContainer/>
      <AppRouter />
    </div>
  )
}

export default App
