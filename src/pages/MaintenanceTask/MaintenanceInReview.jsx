import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'
import { CardMaintenance } from '../../components/Card';
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/UserStore'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
import moment from 'moment';

const MaintenanceInReview = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectTypeOfFailure, setSelectTypeOfFailure] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  const token = useUserStore(state => state.token)
  const maintenanceTaskInReview = useMaintenanceTaskStore(state => state.maintenanceTaskInReview)
  const getMaintenanceTaskInReview = useMaintenanceTaskStore(state => state.getMaintenanceTaskInReview)
  const searchText = useUserStore(state => state.searchText)
  const setSearchText = useUserStore(state => state.setSearchText)

  useEffect(() => {
    getMaintenanceTaskInReview(token)
    
  }, [])

  useEffect(() => {
    if (maintenanceTaskInReview) {
      setAllTasks(filterTasks(maintenanceTaskInReview, selectedLocation, selectedDate, searchText, selectTypeOfFailure));
    }
  }, [maintenanceTaskInReview, selectedLocation, selectedDate, searchText, selectTypeOfFailure]);

  const filterTasks = (tasks, location, date, search, typeOfFailure) => {
    return tasks.filter(task => {
      const locationMatch = !location || task.requestTask?.machine?.locationId === Number(location);
      const dateMatch = !date || moment(task.startTime).format('YYYY-MM-DD') === date;
      const typeofFailureMatch = !typeOfFailure || task.typeOfFailureId === Number(typeOfFailure);
      const searchLower = search.toLowerCase();
      const searchMatch = !search ||
        task.id.toString().includes(searchLower) ||
        task.employee.firstName.toLowerCase().includes(searchLower) ||
        task.employee.lastName.toLowerCase().includes(searchLower) ||
        task.requestTask.machine.name.toLowerCase().includes(searchLower) ||
        task.requestTask.faultSymptoms.toLowerCase().includes(searchLower) ||
        task.requestTask.department.name.toLowerCase().includes(searchLower);

      return locationMatch && dateMatch && typeofFailureMatch && searchMatch;
    });
  };

  const handleChangeLocation = (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    setAllTasks(filterTasks(maintenanceTaskInReview, newLocation, selectedDate, searchText, selectTypeOfFailure));
  };

  const handleChangeDate = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setAllTasks(filterTasks(maintenanceTaskInReview, selectedLocation, newDate, searchText, selectTypeOfFailure));
  };

  const handleChangeTypeofFailure = (e) => {
    const newTypeofFailure = e.target.value;
    setSelectTypeOfFailure(newTypeofFailure);
    setAllTasks(filterTasks(maintenanceTaskInReview, selectedLocation, selectedDate, searchText, newTypeofFailure));
  };

  const handleReset = () => {
    setSelectedLocation('');
    setSelectedDate('');
    setSearchText('');
    setSelectTypeOfFailure('');
    setAllTasks(maintenanceTaskInReview);
  };

  // console.log(maintenanceTaskInReview)
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
        <div className='flex items-center  gap-2 transition-all  '>

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
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={handleChangeTypeofFailure}
                value={selectTypeOfFailure}
              >
                <option disabled selected>Eng.Dept</option>
                <option value={''}>All</option>
                <option value={'1'}>Mechanical</option>
                <option value={'2'}>Electrical</option>
                <option value={'3'}>Tooling</option>
              </select>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} handleChangeDate={handleChangeDate} />
            </div>
          }
        <label className="btn btn-circle swap swap-rotate ">
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
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className='flex flex-1 flex-wrap gap-4 p-4 justify-evenly '>
        {allTasks?.map((el) => (<CardMaintenance key={el.id} maintenanceTask={el} />))}
      </div>

    </div>
  )
}

export default MaintenanceInReview