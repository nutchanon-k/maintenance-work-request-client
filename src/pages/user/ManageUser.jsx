import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import  { CardRequest, CardUser } from '../../components/Card'


const ManageMember = () => {
  
    return (
        <div className='flex flex-col  '>
          <div className='flex justify-between p-4 '>
            <div className='text-3xl p-2 flex items-baseline gap-2  '>
              <h1>{"Manage User >"}</h1>
              <Link to="/request-in-progress" className="text-xl">
                Users
              </Link>
            </div>
            <div className='text-3xl p-2 flex gap-2'>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Location</option>
                <option>All</option>
                <option>Factory1</option>
                <option>Factory2</option>
                <option>Engineering</option>
                <option>Office</option>
              </select>
              <select  className="select select-bordered w-full max-w-xs">
                <option disabled selected>Role</option>
                <option>All</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Leader</option>
                <option>Staff</option>
              </select>
              <button className="btn btn-secondary">+  Add New Member</button>
            </div>
          </div>
          {/* <div className="divider"></div> */}
          <div className='flex flex-1 flex-wrap gap-4 p-4 '>
            <CardUser />
            <CardUser />
            <CardUser />
            <CardUser />
            <CardUser />
            <CardUser />
            <CardUser />
          </div>
    
        </div>
  )
}

export default ManageMember