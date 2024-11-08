import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Chart from 'chart.js/auto';
import useUserStore from '../../store/UserStore';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';

const MaintenanceStatus = forwardRef((props, ref) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // ใช้เพื่อเก็บอินสแตนซ์ของ Chart.js
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

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // ทำลายกราฟเก่าก่อนสร้างใหม่
    }

    // สร้างกราฟโดยใช้ Chart.js
    chartInstanceRef.current = new Chart(ctx, {
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
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [taskData]);  // เพิ่ม taskData ใน dependency array เพื่อให้อัปเดตเมื่อข้อมูล taskData เปลี่ยนแปลง

  // ใช้ forwardRef เพื่อให้สามารถเรียกใช้ toBase64Image จาก component อื่นๆ ได้
  useImperativeHandle(ref, () => ({
    toBase64Image: () => {
      if (chartInstanceRef.current) {
        return chartInstanceRef.current.toBase64Image();
      }
      return null;
    }
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Maintenance Task Status</h1>
      <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
    </div>
  );
});

export default MaintenanceStatus;

