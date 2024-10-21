import React, { useRef } from 'react';
import axios from 'axios';

import MTTRChart from '../components/Graph/MTTRChart';
import RootCauseFailureChart from '../components/Graph/RootCauseFailureChart';
import MaintenanceStatus from '../components/Graph/MaintenanceStatus';
import RequestStatus from '../components/Graph/RequestStatus';
import LocationDepartmentChart from '../components/Graph/LocationDepartmentChart';
import useUserStore from '../store/UserStore';


const Home = () => {
  const dashboardRef = useRef(null);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  const role = user?.role;
  const level = user?.level;

  // ฟังก์ชันเพื่อ export หน้า dashboard เป็น PDF  //ยังใช้ไม่ได้
  const exportToPDF = async () => {
    try {
      // เรียก API เพื่อขอ PDF จาก server พร้อมส่ง token ใน header
      const response = await axios.get('http://localhost:8000/generate-pdf', {
        responseType: 'blob', // เพื่อให้ได้ข้อมูลแบบ binary data
        headers: {
          Authorization: `Bearer ${token}` // แทนที่ด้วยการดึง token ที่คุณเก็บไว้
        }
      });

      // สร้างลิงก์ดาวน์โหลดจาก blob data ที่ได้รับจาก server
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dashboard.pdf'); // ชื่อไฟล์ PDF
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };


  return (
    <div className='container mx-auto p-4'>
      {role === 'admin' || level !== 'staff' ?
        <>
          <div ref={dashboardRef}>

            <div className='flex flex-col items-center justify-around'>
              <div className='w-full h-full p-4 flex items-center '>
                <div className='w-1/2 h-1/4 chart-container'>
                  <RequestStatus />
                </div>
                <div className='w-full chart-container'>
                  <LocationDepartmentChart />
                </div>
              </div>
              <div className='w-full h-full p-4 flex items-center justify-around '>
                <div className='w-1/2 h-1/4 chart-container'>
                  <MaintenanceStatus />
                </div>
                <div className='w-full chart-container'>
                  <RootCauseFailureChart />
                </div>
              </div>
              <div className='chart-container w-5/6'>
                <MTTRChart />
              </div>
            </div>
          </div>

          {/* ปุ่ม Export เป็น PDF */}
          <div className='flex justify-center mt-4'>
            <button
              onClick={exportToPDF}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Export as PDF
            </button>
          </div>
        </>
        :
        role === 'maintenance' && level === 'staff' ?
          <>
            <div ref={dashboardRef}>
              <div className='flex flex-col items-center justify-around'>
                <div className='w-full h-full p-4 flex items-center justify-around '>
                  <div className='w-1/2 h-1/4 chart-container'>
                    <MaintenanceStatus />
                  </div>
                  <div className='w-full chart-container'>
                    <RootCauseFailureChart />
                  </div>
                </div>
                <div className='chart-container w-5/6'>
                  <MTTRChart />
                </div>
              </div>
            </div>

            {/* ปุ่ม Export เป็น PDF */}
            <div className='flex justify-center mt-4'>
              <button
                onClick={exportToPDF}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Export as PDF
              </button>
            </div>
          </>
          :
          <>
            <div ref={dashboardRef} h-screen>

              <div className='flex flex-col items-center justify-around'>
                <div className='w-full h-full p-4 flex items-center justify-around '>
                  <div className='w-1/3 chart-container'>
                    <RequestStatus />
                  </div>
                  <div className='w-1/3  chart-container'>
                    <MaintenanceStatus />
                  </div>
                </div>
                  <div className='w-5/6 chart-container'>
                    <LocationDepartmentChart />
                  </div>
              </div>
            </div>

            {/* ปุ่ม Export เป็น PDF */}
            <div className='flex justify-center mt-4'>
              <button
                onClick={exportToPDF}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Export as PDF
              </button>
            </div>
          </>

      }
    </div>
  );
};

export default Home;
