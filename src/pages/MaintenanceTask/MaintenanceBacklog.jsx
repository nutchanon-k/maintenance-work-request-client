import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardMaintenance } from '../../components/Card';
import { CardRequest } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import useUserStore from '../../store/UserStore'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';


const MaintenanceBacklog = () => {
  const navigate = useNavigate()
  
  const [selectedDate, setSelectedDate] = useState('');

  const token = useUserStore(state => state.token)
  const maintenanceTaskBacklog = useMaintenanceTaskStore(state => state.maintenanceTaskBacklog)
  const getMaintenanceTaskBacklog = useMaintenanceTaskStore(state => state.getMaintenanceTaskBacklog)
  const resetCurrentMaintenanceTask = useMaintenanceTaskStore(state => state.resetCurrentMaintenanceTask)
  const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask) 
  
  useEffect(() => {
    getMaintenanceTaskBacklog(token)
    // resetCurrentMaintenanceTask() 
  }, [])

  console.log(maintenanceTaskBacklog)
  console.log('current naaaa', currentMaintenanceTask)
  
  
  
  
  // console.log("test", selectedDate)
  return (
    <div className='flex flex-col  '>
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Maintenance Task >"}</h1>
          <Link to="/maintenance-backlog" className="text-xl">
            Backlog
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
      <div className='flex flex-1 flex-wrap p-4 gap-4'>
        {maintenanceTaskBacklog.map((el) => <CardMaintenance key={el.id} maintenanceTask={el} />)}
      </div>

    </div>
  )

  
}

export default MaintenanceBacklog