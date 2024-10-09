import React from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminHeader from '../components/Admin/AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='flex items-start min-h-screen'>
            <AdminSidebar />
            <div className='overflow-hidden h-screen w-screen '>
                <div className='flex flex-col h-full '>
                    <AdminHeader />
                    <div className=' overflow-auto   '>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout