import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';

const MaintenanceStatus = () => {
  const chartRef = useRef(null);
  const token = useUserStore((state) => state.token);
  const getAllMaintenanceTask = useMaintenanceTaskStore((state) => state.getAllMaintenanceTask);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllMaintenanceTask(token);
        setTaskData(result);  // เก็บข้อมูลทั้งหมดใน state
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token, getAllMaintenanceTask]);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // นับจำนวน status ที่อยู่ใน taskData
    const backlogCount = taskData?.filter(task => task.status === 'backlog').length;
    const inProgressCount = taskData?.filter(task => task.status === 'inProgress').length;
    const inReviewCount = taskData?.filter(task => task.status === 'inReview').length;
    const successCount = taskData?.filter(task => task.status === 'success').length;

    // ข้อมูลสำหรับกราฟ
    const data = {
      labels: ['backlog', 'inProgress', 'inReview', 'success'],
      datasets: [{
        label: 'Maintenance Task Status',
        data: [backlogCount, inProgressCount, inReviewCount, successCount],  // แทนที่ด้วยข้อมูลนับจาก taskData
        backgroundColor: ['#006BFF', '#FF7F3E', '#FFE700', '#36BA98'],
      }]
    };

    // สร้างกราฟโดยใช้ Chart.js
    const myChart = new Chart(ctx, {
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

    // Cleanup function เพื่อทำลายกราฟเมื่อ component ถูก unmount
    return () => {
      myChart.destroy();
    };
  }, [taskData]);  // เพิ่ม taskData ใน dependency array เพื่อให้อัปเดตเมื่อข้อมูล taskData เปลี่ยนแปลง

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Maintenance Task Status</h1>
      <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
    </div>
  );
};

export default MaintenanceStatus;
