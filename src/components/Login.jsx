import React from 'react'
import { useState } from 'react'
import useDataStore from '../store/DataStore'
import { useShallow } from 'zustand/shallow'





const Login = () => {
// import state from store
const {dataLogin, hdlLogin} = useDataStore(useShallow((state)=>({
  dataLogin : state.dataLogin,
  hdlLogin : state.hdlLogin
})))
// const dataLogin = useDataStore((state)=> state.dataLogin)






// For collect data (input by user) before send to DataStore 
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  })

// set state Login  
  const hdlChange = e => {
    setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


// After user click login button send data form Login state  to DataStore 
  const hdlSubmit =  async (e) =>{
    e.preventDefault()
    await hdlLogin(Login.email, Login.password)
  }

  
  
  
  
  console.log(Login)
  return (
    <div className="flex h-screen justify-between">
      {/* Left Side - Login Form */}
      <div className='flex w-1/2 justify-center items-center'>
        <div className="w-[36rem] flex flex-col justify-center px-16 bg-white mb-10 mr-10">
          <h2 className="text-3xl font-semibold mb-6">Log in</h2>
          <p className="text-gray-500 mb-1">If you don't have an account register</p>
          <p className="text-gray-500 mb-8">Please contact admin <span className='text-blue-400 font-semibold text-sm'>Tel: 02-345-6789 to 123</span></p>

          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email address"
                onChange={hdlChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your Password"
                onChange={hdlChange}
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              // type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image and Text */}
      <div className="w-1/2 flex justify-end items-end login-image" >
        <div className="bg-blue-600 bg-opacity-60 p-8 rounded-lg w-full">
          <h3 className="text-3xl font-semibold mb-2">Maintenance Work Request</h3>
          <p className="text-lg">Engineering system</p>
        </div>
      </div>
    </div>
  )
}

export default Login