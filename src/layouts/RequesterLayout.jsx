import React from 'react'
import RequesterSidebar from '../components/Requester/RequesterSidebar'
import RequesterHeader from '../components/Requester/RequesterHeader'
import { Outlet } from 'react-router-dom'

const RequesterLayout = () => {
  return (
    <div className='flex items-start min-h-screen'>
    <RequesterSidebar />
    <div className='overflow-hidden h-screen w-screen '>
        <div className='flex flex-col h-full '>
            <RequesterHeader />
            <div className=' overflow-auto    '>
                <Outlet/>
            </div>
        </div>
    </div>
</div>
  )
}

export default RequesterLayout