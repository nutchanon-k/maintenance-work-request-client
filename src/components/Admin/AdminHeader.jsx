import React from 'react'
import Avatar from '../Avatar';
import { SearchIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';

const AdminHeader = () => {
  const hdlLogout = useUserStore(state => state.hdlLogout)


  return (
    <div className="navbar bg-base-100 shadow-md p-4">
      <div className="flex-1">
        {/* Search Box */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow " placeholder="Search " />
          <SearchIcon/>
        </label>
      </div>

      <div className="flex-none gap-4">
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="font-semibold">Nutchanon Nut</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Avatar
                  className="w-11 h-11 rounded-full !flex justify-center items-center"
                  // imgSrc={user.profileImage}
                  menu={true}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Settings</a></li>
              <li onClick={hdlLogout}><a>Logout</a></li>
            </ul>
          </div>



        </div>
      </div>
    </div>
  );
};


export default AdminHeader