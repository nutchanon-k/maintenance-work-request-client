import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar';
import { SearchIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
import useRequestTaskStore from '../../store/RequestTaskStore';

const RequesterHeader = () => {
  const hdlLogout = useUserStore(state => state.hdlLogout)
  const user = useUserStore(state => state.user)
  const clearAllMaintenanceStore = useMaintenanceTaskStore(state => state.clearAllMaintenanceStore)
  const clearAllRequestTaskStore = useRequestTaskStore(state => state.clearAllRequestTaskStore)
  const setSearchText = useUserStore(state => state.setSearchText)
  const searchText = useUserStore(state => state.searchText)

  const [text, setText] = useState(searchText)
  // console.log(user)

  const handleLogout = () => {
    hdlLogout()
    clearAllMaintenanceStore()
    clearAllRequestTaskStore()
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchText(text)
    }, 500)
    return () => clearTimeout(delay)
  }, [text])

  return (
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
          <SearchIcon/>
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
              
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequesterHeader