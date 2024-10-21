import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar';
import { SearchIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
import useRequestTaskStore from '../../store/RequestTaskStore';

const MaintenanceHeader = () => {
  const hdlLogout = useUserStore(state => state.hdlLogout)
  const user = useUserStore(state => state.user)
  const clearAllMaintenanceStore = useMaintenanceTaskStore(state => state.clearAllMaintenanceStore)
  const clearAllRequestTaskStore = useRequestTaskStore(state => state.clearAllRequestTaskStore)
  const setSearchText = useUserStore(state => state.setSearchText)
  const searchText = useUserStore(state => state.searchText)
  const token = useUserStore(state => state.token)

  const changePassword = useUserStore(state => state.changePassword)
  
  const [text, setText] = useState(searchText)

  const [showChangePassword, setShowChangePassword] = useState(false)
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogout = () => {
    hdlLogout()
    clearAllMaintenanceStore()
    clearAllRequestTaskStore()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrorMessage('')
  }
  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (formData.newPassword !== formData.confirmNewPassword) {
        setErrorMessage('Password and Confirm Password do not match.');
      }
      const result =  await changePassword(token, formData, user.id)
      if(result){ 
        document.getElementById('change_password_modal').close()
      }
     
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(errorMessage)

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchText(text)
    }, 500)
    return () => clearTimeout(delay)
  }, [text])



  return (
    <>
      <div className="navbar bg-base-100 shadow-md p-4 h-20">
        <div className="flex-1">
          {/* Search Box */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={text}
              className="grow"
              placeholder="Search "
              onChange={(e) => setText(e.target.value)}
            />
            <SearchIcon />
          </label>
        </div>

        <div className="flex-none gap-4">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="font-semibold">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-sm text-gray-500">{user?.role + " " + user?.level}</p>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Avatar
                    className="w-11 h-11 rounded-full !flex justify-center items-center"
                    imgSrc={user?.picture}
                    menu={true}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li onClick={() => {
                  setShowChangePassword(true)
                  document.getElementById('change_password_modal').showModal()
                }}
                >
                  <a>Change Password</a>
                </li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Change password Modal */}
      <dialog id="change_password_modal" className="modal" onClose={() => { setShowChangePassword(false) }}>
        <div className="modal-box">
          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          {showChangePassword &&
            <div>
              <h3 className="font-bold text-lg text-info">Change PassWord</h3>
              <div className="modal-action flex-col gap-2 items-center">
                <form className='w-full ' >
                  <div className=' flex flex-col '>
                    <label className="label">
                      <span className="label-text font-semibold">Old Password <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="input old password here"
                      className="input input-bordered w-full"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">New Password <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="input new password here"
                      className="input input-bordered w-full"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Confirm New password <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      placeholder="input confirm new password here"
                      className="input input-bordered w-full"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      required
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-xs">{errorMessage}</p>
                    )}
                  </div>
                </form>
                <div className='w-full flex justify-center mt-4'>
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className="btn btn-info btn-outline w-[150px] "
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </dialog>
    </>
  );
};

export default MaintenanceHeader