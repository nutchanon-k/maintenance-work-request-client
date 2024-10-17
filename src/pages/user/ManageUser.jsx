import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import  { CardRequest, CardUser } from '../../components/Card'
import useUserStore from '../../store/UserStore'


const ManageMember = () => {
    const allUser = useUserStore((state) => state.allUser)
    const token = useUserStore((state) => state.token)
    const getAllUser =  useUserStore((state) => state.getAllUser)


    useEffect(() => {
      getAllUser(token)
    }, [])
    
    console.log(allUser)
    return (
        <div className='flex flex-col  '>
          <div className='flex justify-between p-4 '>
            <div className='text-3xl p-2 flex items-baseline gap-2  '>
              <h1>{"Manage User"}</h1>

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
                <option>Maintenance</option>
                <option>Requester</option>
              </select>
              <Link 
                to="/create-user" 
                className="btn btn-secondary"
              >
                +  Add New Member
              </Link>
            </div>
          </div>
          {/* <div className="divider"></div> */}
          <div className='flex flex-1 flex-wrap gap-4 p-4 justify-evenly '>
           
            {allUser?.map((el) => <CardUser key={el.id} member ={el} />) }

          </div>
    
        </div>
  )
}

export default ManageMember