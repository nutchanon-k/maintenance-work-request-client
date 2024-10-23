import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'
import maintenanceGear from '../../assets/maintenanceGear.json'
import staff from '../../assets/staff.json'
import Lottie from 'lottie-react'

const Login = () => {
  // import state from store
  const hdlLogin = useUserStore(state => state.hdlLogin)
  const getForgetPassword = useUserStore(state => state.getForgetPassword)

  const [errMsg, setErrMsg] = useState('')


  // For collect data (input by user) before send to DataStore 
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [showForgetPassword, setShowForgetPassword] = useState(false)
  const [emailForgetPassword, setEmailForgetPassword] = useState({emailForgetPassword: ""})

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
      const data = await hdlLogin(input)
      console.log(data)

    } catch (error) {
      console.log(error)

    }
  }

  const handleForgetPassword = async (e) => {
    e.preventDefault()
    if (!emailForgetPassword.emailForgetPassword) {
      setErrMsg('Please fill correct email')
      return 
    }

    await getForgetPassword(emailForgetPassword)
    document.getElementById('forget_password_modal').close()
  }


  console.log(emailForgetPassword)

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
              <h2 className="text-3xl font-semibold mb-6">Log in</h2>
              <Lottie animationData={staff} loop={true} className='h-16' />
            </div>
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

                <p
                  href="#"
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => {
                    setShowForgetPassword(true)
                    document.getElementById('forget_password_modal').showModal()
                  }}>
                  Forgot Password?</p>
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
      </div>
      <dialog id="forget_password_modal" className="modal" onClose={() => { setShowForgetPassword(false) }}>
        <div className="modal-box">
          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          {showForgetPassword &&
            <div>
              <h3 className="font-bold text-lg text-info">Please Input your Email</h3>
              <div className="modal-action flex-col gap-2 items-center">
                <form className='w-full '>
                  
                  {/* <label className="block text-sm mb-2">Email</label> */}
                  <input
                    type="email"
                    name="emailForgetPassword"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email address"
                    onChange={e => {
                      setEmailForgetPassword({emailForgetPassword: e.target.value})
                      setErrMsg('')
                    }}
                  />
                {errMsg && <p className="text-red-500 text-xs">{errMsg}</p>}
                <div className='w-full flex justify-end mt-2'>
                  <button
                    type='submit'
                    className="btn btn-info btn-outline w-[150px] "
                    onClick={handleForgetPassword}
                      
                    >
                    Send
                  </button>
                </div>
                </form>
              </div>
            </div>
          }
        </div>
      </dialog>
    </>
  )
}


export default Login