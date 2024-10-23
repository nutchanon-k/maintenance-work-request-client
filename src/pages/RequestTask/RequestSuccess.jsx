import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardRequest } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import useUserStore from '../../store/UserStore'
import moment from 'moment';

const RequestSuccess = () => {

  const token = useUserStore(state => state.token)
  const getRequestTaskSuccess = useRequestTaskStore(state => state.getRequestTaskSuccess)
  const requestTasksSuccess = useRequestTaskStore(state => state.requestTasksSuccess)
  const searchText = useUserStore(state => state.searchText)
  const setSearchText = useUserStore(state => state.setSearchText)


  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const [typeCard, setTypeCard] = useState(true);

  useEffect(() => {
    getRequestTaskSuccess(token)
  }, [])

  useEffect(() => {
    if (requestTasksSuccess) {
      setAllTasks(filterTasks(requestTasksSuccess, selectedLocation, selectedDate, searchText));
    }
  }, [requestTasksSuccess, selectedLocation, selectedDate, searchText]);

  const filterTasks = (tasks, location, date, search) => {
    return tasks.filter(task => {
      const locationMatch = !location || task?.machine?.locationId === Number(location);
      const dateMatch = !date || moment(task?.requestTime).format('YYYY-MM-DD') === date;
      const searchLower = search.toLowerCase();
      const searchMatch = !search ||
        task.id.toString().includes(searchLower) ||
        task.employee.firstName.toLowerCase().includes(searchLower) ||
        task.employee.lastName.toLowerCase().includes(searchLower) ||
        task.machine.name.toLowerCase().includes(searchLower) ||
        task.faultSymptoms.toLowerCase().includes(searchLower) ||
        task.department.name.toLowerCase().includes(searchLower);

      return locationMatch && dateMatch && searchMatch;
    });
  };


  const handleChangeLocation = (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    setAllTasks(filterTasks(requestTasksSuccess, newLocation, selectedDate, searchText));
  };

  const handleChangeDate = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setAllTasks(filterTasks(requestTasksSuccess, selectedLocation, newDate, searchText));
  };

  // สำหรับการรีเซ็ตตัวกรอง
  const handleReset = () => {
    setSelectedLocation('');
    setSelectedDate('');
    setSearchText('');
    setAllTasks(requestTasksSuccess);
  };


  // console.log(requestTasksSuccess)
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

        <div className='flex items-center  gap-2 transition-all  '>
          {/* <input type="checkbox" value="synthwave" className="toggle theme-controller" onChange={() => setTypeCard(!typeCard)} /> */}
          {showFilter &&

            <div className='text-3xl p-2 flex gap-2'>
              <button
                className="btn btn-ghost btn-outline" onClick={handleReset}>Reset Filters</button>
              <select
                className="select select-bordered w-full max-w-xs "
                onChange={handleChangeLocation}
                value={selectedLocation}
              >
                <option disabled selected>Location</option>
                <option value={''}>All</option>
                <option value={2}>Factory1</option>
                <option value={3}>Factory2</option>
              </select>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} handleChangeDate={handleChangeDate} />
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
          <Link to={"/create-request-task"} className="btn btn-secondary">+  Add New Task</Link>
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className='flex flex-1 flex-wrap gap-4 p-4 justify-evenly '>
        {allTasks?.map((el) => (<CardRequest key={el.id} ReqTask={el} typeCard={typeCard} />))}
      </div>

    </div>
  )

}

export default RequestSuccess