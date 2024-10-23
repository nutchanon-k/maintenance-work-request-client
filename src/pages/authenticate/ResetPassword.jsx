import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'
import maintenanceGear from '../../assets/maintenanceGear.json'
import staff from '../../assets/staff.json'
import Lottie from 'lottie-react'
import { useNavigate, useParams } from 'react-router-dom'


const ResetPassword = () => {
  // import state from store
  const getResetPassword = useUserStore(state => state.getResetPassword)
  const {token} = useParams()

  const navigate = useNavigate()


  // For collect data (input by user) before send to DataStore 
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  })


  // set state Login  
  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  // After user click login button send data form Login state  to DataStore 
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault()
      
      if (!input.password || !input.confirmPassword) {
        return toast.error('Please fill in all fields')
      }
      if (input.password !== input.confirmPassword) {
        return toast.error('Password not match')
      }

      const result = await getResetPassword(token, input)
      
      if(result){
        navigate('/login')
      }
     

    } catch (error) {
      console.log(error)

    }
  }
  console.log(input)

  return (
    <>
      <div className="flex min-h-screen justify-between">

        {/* Left Side - Image and Text */}
        <div className=" flex w-1/2 flex-col  items-center justify-around h-screen shadow-xl " >
          <div className='w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-200'>
            <Lottie animationData={maintenanceGear} loop={true} className='w-2/3' />
          </div>
          <div className='w-full  flex justify-center items-end'>
            <div className="bg-gradient-to-r from-blue-100 to-blue-600 text-white bg-opacity-60 px-4 py-8  w-full flex justify-end items-center shadow-lg">
              <div className='flex flex-col justify-end items-end'>
                <h3 className="text-4xl font-bold mb-2">Maintenance Work Request</h3>
                <p className="text-lg font-semibold">Engineering system</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side - Login Form */}

        <div className='flex w-1/2 justify-center items-center'>
          <div className="w-[36rem] flex flex-col justify-center px-16 bg-white mb-10">
            <div className='flex gap-2 items-end '>
              <h2 className="text-3xl font-semibold mb-6">Reset Password</h2>
            </div>

            <form className="space-y-6">
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

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your Password"
                  onChange={hdlChange}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={hdlSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}


export default ResetPassword
