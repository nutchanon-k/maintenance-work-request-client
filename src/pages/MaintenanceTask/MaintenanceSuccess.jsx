import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardMaintenance } from '../../components/Card';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';

const MaintenanceSuccess = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const token = useUserStore(state => state.token)
  const maintenanceTaskSuccess = useMaintenanceTaskStore(state => state.maintenanceTaskSuccess)
  const getMaintenanceTaskSuccess = useMaintenanceTaskStore(state => state.getMaintenanceTaskSuccess)


  useEffect(() => {
    getMaintenanceTaskSuccess(token)
  }, [])

  console.log("test", selectedDate)
  return (
    
    <div className='flex flex-col  '>
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Maintenance Task >"}</h1>
          <Link to="/maintenance-success" className="text-xl">
            Success
          </Link>
        </div>
        <div className='text-3xl p-2 flex gap-2'>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>Location</option>
            <option>All</option>
            <option>Factory1</option>
            <option>Factory2</option>
          </select>
          <select  className="select select-bordered w-full max-w-xs">
            <option disabled selected>Eng.Dept</option>
            <option>All</option>
            <option>Mechanical</option>
            <option>Electrical</option>
            <option>Tooling</option>
          </select>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className='flex flex-1 flex-wrap gap-4 p-4 justify-evenly '>
        {maintenanceTaskSuccess.map(el => (<CardMaintenance key={el.id} maintenanceTask={el} />))}

      </div>

    </div>
  )
}

export default MaintenanceSuccess