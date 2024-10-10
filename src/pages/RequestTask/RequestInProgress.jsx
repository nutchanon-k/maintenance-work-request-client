import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardRequest } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import useUserStore from '../../store/UserStore'

const RequestInProgress = () => {
  const navigate = useNavigate()
  
  const [selectedDate, setSelectedDate] = useState('');

  const token = useUserStore(state => state.token)
  const getRequestTaskInprogress = useRequestTaskStore(state => state.getRequestTaskInprogress)
  const requestTasksInprogress = useRequestTaskStore(state => state.requestTasksInprogress)
  const currentTask = useRequestTaskStore(state => state.currentTask)
  const  resetCurrentTask = useRequestTaskStore(state => state.resetCurrentTask)

  // console.log(requestTasksInprogress)
  useEffect(() => {
    getRequestTaskInprogress(token)
    resetCurrentTask()
  }, [])

  console.log(currentTask)
  // console.log(requestTasks)
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
          <select  className="select select-bordered w-full max-w-xs ">
            <option disabled selected>Location</option>
            <option>All</option>
            <option>Factory1</option>
            <option>Factory2</option>
          </select>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <Link to={"/create-request-task"} className="btn btn-secondary">+  Add New Task</Link>
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className='flex flex-1 flex-wrap gap-4 p-4 '>
        {requestTasksInprogress.map((el) => <CardRequest key={el.id} ReqTask = {el} />)}
      </div>

    </div>
  )
}

export default RequestInProgress