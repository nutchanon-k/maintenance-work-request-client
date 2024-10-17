import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'


const Login = () => {
  // import state from store
  const hdlLogin = useUserStore(state => state.hdlLogin)


  // For collect data (input by user) before send to DataStore 
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  // set state Login  
  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  // After user click login button send data form Login state  to DataStore 
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!input.email.trim() || !input.password.trim()) {
        return toast.error('Please fill in all fields')
      }
      const data  = await hdlLogin(input)
      console.log(data)
      toast.success(data.message)
    }catch (error) {
      console.log(error)
      toast.error(error.response)
    }
  }


    console.log(input)

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
              <div className="flex items-center justify-end">

                <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={hdlSubmit}
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