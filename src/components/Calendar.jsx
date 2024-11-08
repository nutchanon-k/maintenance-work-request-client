import React, { useEffect, useState } from 'react'

const Calendar = ({selectedDate, setSelectedDate, handleChangeDate}) => {
    
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // setSelectedDate(getTodayDate());
  }, []);

  // const handleDateChange = (e) => {
  //   setSelectedDate(e.target.value);
    
  // };
  
  return (
    <input
            type="date"
            name="date"
            value={selectedDate}
            onChange={handleChangeDate}
            className="input input-bordered w-full max-w-xs"
          />
  )
}

export default Calendar