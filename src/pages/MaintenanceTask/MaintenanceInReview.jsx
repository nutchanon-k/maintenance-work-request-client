import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardMaintenance } from '../../components/Card';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';

const MaintenanceInReview = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const token = useUserStore(state => state.token)
  const maintenanceTaskInReview = useMaintenanceTaskStore(state => state.maintenanceTaskInReview)
  const getMaintenanceTaskInReview = useMaintenanceTaskStore(state => state.getMaintenanceTaskInReview)


  useEffect(() => {
    getMaintenanceTaskInReview(token)
  }, [])
  console.log(maintenanceTaskInReview)
  // console.log("test", selectedDate)
  return (
    <div className='flex flex-col  '>
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Maintenance Task >"}</h1>
          <Link to="/maintenance-in-review" className="text-xl">
            In Review
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
      <div className='flex flex-1 flex-wrap gap-4 p-4 '>
        {maintenanceTaskInReview.map((el) => (<CardMaintenance key={el.id} maintenanceTask={el} />))}
      </div>

    </div>
  )
}

export default MaintenanceInReview