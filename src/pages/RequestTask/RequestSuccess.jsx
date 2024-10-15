import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardRequest } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import useUserStore from '../../store/UserStore'

const RequestSuccess = () => {

  const token = useUserStore(state => state.token)
  const getRequestTaskSuccess = useRequestTaskStore(state => state.getRequestTaskSuccess)
  const requestTasksSuccess = useRequestTaskStore(state => state.requestTasksSuccess)
  const resetCurrentTask = useRequestTaskStore(state => state.resetCurrentTask)

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getRequestTaskSuccess(token)
    resetCurrentTask()
  }, [])
  console.log(requestTasksSuccess)
  // console.log("test",selectedDate)
  return (
    <div className='flex flex-col  '>
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Request Task >"}</h1>
          <Link to="/request-success" className="text-xl">
            Success
          </Link>
        </div>
        <div className='text-3xl p-2 flex gap-2'>
          <select defaultValue="All" className="select select-bordered w-full max-w-xs">
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
        {requestTasksSuccess.map((el) => (<CardRequest key={el.id} ReqTask = {el} />))}
      </div>

    </div>
  )

}

export default RequestSuccess