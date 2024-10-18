import React from 'react'
import MaintenanceSidebar from '../components/Maintenance/MaintenanceSidebar'
import MaintenanceHeader from '../components/Maintenance/MaintenanceHeader'
import { Outlet } from 'react-router-dom'

const MaintenanceLayout = () => {
  return (
    <div className='flex items-start min-h-screen'>
    <MaintenanceSidebar />
    <div className='overflow-hidden h-screen w-screen '>
        <div className='flex flex-col h-full '>
            <MaintenanceHeader />
            <div className=' overflow-auto    '>
                <Outlet/>
            </div>
        </div>
    </div>
</div>
  )
}

export default MaintenanceLayout