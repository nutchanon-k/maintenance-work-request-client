// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import useUserStore from '../../store/UserStore';
// import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
// import useRequestTaskStore from '../../store/RequestTaskStore'

// const RequestStatus = () => {
//     const chartRef = useRef(null);
//     const token = useUserStore((state) => state.token);
//     const getAllRequestTask = useRequestTaskStore(state => state.getAllRequestTask)
//     const [taskData, setTaskData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const result = await getAllRequestTask(token);
//             setTaskData(result);  // เก็บข้อมูลทั้งหมดใน state
//           } catch (error) {
//             console.error(error);
//           }
//         };
//         fetchData();
//       }, [token, getAllRequestTask]);
//       console.log(taskData)
//       useEffect(() => {
//         const ctx = chartRef.current.getContext('2d');
    
//         // นับจำนวน status ที่อยู่ใน taskData
//         const inProgressCount = taskData?.filter(task => task.status === 'inProgress').length;
//         const successCount = taskData?.filter(task => task.status === 'success').length;
    
//         // ข้อมูลสำหรับกราฟ
//         const data = {
//           labels: ['inProgress',  'success'],
//           datasets: [{
//             label: 'Request Task Status',
//             data: [ inProgressCount, successCount],  // แทนที่ด้วยข้อมูลนับจาก taskData
//             backgroundColor: [ '#FFE700',  '#36BA98'],
//           }]
//         };
    
//         // สร้างกราฟโดยใช้ Chart.js
//         const myChart = new Chart(ctx, {
//           type: 'pie',  // ประเภทของกราฟ เช่น pie, bar, line
//           data: data,
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               }
//             }
//           }
//         });
    
//         // Cleanup function เพื่อทำลายกราฟเมื่อ component ถูก unmount
//         return () => {
//           myChart.destroy();
//         };
//       }, [taskData]);  // เพิ่ม taskData ใน dependency array เพื่อให้อัปเดตเมื่อข้อมูล taskData เปลี่ยนแปลง
    
//       return (
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4 text-center">Request Task Status</h1>
//           <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
//         </div>
//       );
//     };

// export default RequestStatus



import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useUserStore from '../../store/UserStore';
import useRequestTaskStore from '../../store/RequestTaskStore'

const RequestStatus = React.forwardRef((props, ref) => { // ใช้ forwardRef เพื่อเชื่อมต่อ ref
  const chartRef = useRef(null);
  const token = useUserStore((state) => state.token);
  const getAllRequestTask = useRequestTaskStore(state => state.getAllRequestTask)
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllRequestTask(token);
        setTaskData(result);  // เก็บข้อมูลทั้งหมดใน state
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token, getAllRequestTask]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
  
      // นับจำนวน status ที่อยู่ใน taskData
      const inProgressCount = taskData?.filter(task => task.status === 'inProgress').length;
      const successCount = taskData?.filter(task => task.status === 'success').length;
  
      // ข้อมูลสำหรับกราฟ
      const data = {
        labels: ['inProgress', 'success'],
        datasets: [{
          label: 'Request Task Status',
          data: [inProgressCount, successCount],  // แทนที่ด้วยข้อมูลนับจาก taskData
          backgroundColor: ['#FFE700', '#36BA98'],
        }]
      };
  
      // สร้างกราฟโดยใช้ Chart.js
      const chartInstance = new Chart(ctx, {
        type: 'pie',  // ประเภทของกราฟ เช่น pie, bar, line
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
  
      // เชื่อมต่อ Chart.js อินสแตนซ์กับ ref ที่ส่งมาจากภายนอก (ใช้ forwardRef)
      if (ref) {
        ref.current = chartInstance;  // ให้ ref สามารถเข้าถึง Chart.js instance
      }
  
      // Cleanup function เพื่อทำลายกราฟเมื่อ component ถูก unmount
      return () => {
        chartInstance.destroy();
      };
    }
  }, [taskData, ref]);  // เพิ่ม taskData ใน dependency array เพื่อให้อัปเดตเมื่อข้อมูล taskData เปลี่ยนแปลง

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Request Task Status</h1>
      <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
    </div>
  );
});

export default RequestStatus;
