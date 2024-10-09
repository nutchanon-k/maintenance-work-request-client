import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardRequest } from '../../components/Card'

const RequestInProgress = () => {
  const [selectedDate, setSelectedDate] = useState('');

  console.log(selectedDate)
  return (
    <div className='flex flex-col  '>
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Request Task >"}</h1>
          <Link to="/request-in-progress" className="text-xl">
            In Progress
          </Link>
        </div>
        <div className='text-3xl p-2 flex gap-2'>
          {/* map from db */}
          <select className="select select-bordered w-full max-w-xs ">
            <option disabled selected>Is Assign</option>
            <option>All</option>
            <option>Waiting</option>
            <option>Assign</option>
          </select>
          {/* map from db */}
          <select className="select select-bordered w-full max-w-xs ">
            <option disabled selected>Location</option>
            <option>All</option>
            <option>Factory1</option>
            <option>Factory2</option>
          </select>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <button className="btn btn-secondary">+  Add New Task</button>
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className='flex flex-1 flex-wrap gap-4 p-4 '>
        <CardRequest />
        <CardRequest />
        <CardRequest />
        <CardRequest />
        <CardRequest />
        <CardRequest />
        <CardRequest />
        <CardRequest />
      </div>

    </div>
  )
}

export default RequestInProgress