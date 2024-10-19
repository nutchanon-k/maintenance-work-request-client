import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardUser } from '../../components/Card'
import useUserStore from '../../store/UserStore'
import { LuFilter, LuFilterX } from "react-icons/lu";


const ManageMember = () => {
  const allUser = useUserStore((state) => state.allUser)
  const token = useUserStore((state) => state.token)
  const getAllUser = useUserStore((state) => state.getAllUser)
  const getLocationAndDepartmentData = useUserStore((state) => state.getLocationAndDepartmentData)
  const searchText = useUserStore(state => state.searchText)
  const setSearchText = useUserStore(state => state.setSearchText)

  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [showFilter, setShowFilter] = useState(false)


  useEffect(() => {
    getAllUser(token)
    getLocationAndDepartmentData(token)
  }, [])

  useEffect(() => {
    filterUsers()
  }, [allUser, selectedLocation, selectedRole, searchText])

  const filterUsers = () => {
    let filtered = allUser || []

    if (selectedLocation) {
      filtered = filtered.filter(user => user.locationId === Number(selectedLocation))
    }

    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole)
    }

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase()
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(lowerSearchText) ||
        user.lastName.toLowerCase().includes(lowerSearchText) ||
        user.email.toLowerCase().includes(lowerSearchText) ||
        user.id.toString().includes(lowerSearchText)
      )
    }

    setFilteredUsers(filtered)
  }

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }



  const handleReset = () => {
    setSelectedLocation('')
    setSelectedRole('')
    setSearchText('')
  }


  // console.log(allUser)
  return (
    <div className='flex flex-col transition-all'>
      <div className='flex justify-between p-4'>
        <div className='text-3xl p-2 flex items-baseline gap-2'>
          <h1>{"Manage User"}</h1>
        </div>


        <div className='flex items-center  gap-2 transition-all  '>
          
          {showFilter && 
          <div className='text-3xl p-2 flex gap-2 transition-all   '>
            <button
              className="btn btn-outline"
              onClick={handleReset}
            >
              Reset Filters
            </button>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              <option value="2">Factory1</option>
              <option value="3">Factory2</option>
              <option value="4">Engineering</option>
              <option value="1">Office</option>
            </select>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="maintenance">Maintenance</option>
              <option value="requester">Requester</option>
            </select>
          </div>
          }
          <label className="btn btn-circle swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={() => setShowFilter(!showFilter)} type="checkbox"
            />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <polygon
                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>


          </label>
          <Link
              to="/create-user"
              className="btn btn-secondary"
            >
              +  Add New Member
            </Link>
        </div>
      </div>
      <div className='flex flex-1 flex-wrap gap-4 p-4 justify-evenly'>
        {filteredUsers.map((el) => <CardUser key={el.id} member={el} />)}
      </div>
    </div>
  )
}




export default ManageMember