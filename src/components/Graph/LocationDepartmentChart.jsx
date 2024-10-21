import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useUserStore from '../../store/UserStore';
import useRequestTaskStore from '../../store/RequestTaskStore';

const LocationDepartmentChart = () => {
    const chartRef = useRef(null);
    const token = useUserStore((state) => state.token);
    const getAllRequestTask = useRequestTaskStore((state) => state.getAllRequestTask);
    const [taskData, setTaskData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
  
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
  
    // ฟังก์ชันที่ใช้กรองข้อมูลตาม employee และ status ที่เลือก
    const filteredData = taskData?.filter(task => {
      const employeeMatch = selectedEmployee ? `${task.employee.firstName} ${task.employee.lastName}` === selectedEmployee : true;
      const statusMatch = selectedStatus ? task.status === selectedStatus : true;
      return employeeMatch && statusMatch;
    });
  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      // ดึง department.name ทั้งหมดจาก filteredData
      const departments = [...new Set(filteredData?.map(task => task.department.name))]; // ดึงเฉพาะ department.name ที่ไม่ซ้ำ
  
      // นับจำนวน request task ที่แยกตาม department.name
      const countsByDepartment = departments?.map(department => {
        return filteredData?.filter(task => task.department.name === department).length;
      });
  
      // กำหนดสีโปร่งแสงและขอบสีเข้มสำหรับแต่ละ department (6 สี)
      const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',  // สีแดงอ่อน
        'rgba(54, 162, 235, 0.2)',  // สีฟ้าอ่อน
        'rgba(255, 206, 86, 0.2)',  // สีเหลืองอ่อน
        'rgba(75, 192, 192, 0.2)',  // สีเขียวอ่อน
        'rgba(153, 102, 255, 0.2)', // สีม่วงอ่อน
        'rgba(255, 159, 64, 0.2)'   // สีส้มอ่อน
      ];
  
      const borderColors = [
        'rgba(255, 99, 132, 1)',  // สีแดงเข้ม
        'rgba(54, 162, 235, 1)',  // สีฟ้าเข้ม
        'rgba(255, 206, 86, 1)',  // สีเหลืองเข้ม
        'rgba(75, 192, 192, 1)',  // สีเขียวเข้ม
        'rgba(153, 102, 255, 1)', // สีม่วงเข้ม
        'rgba(255, 159, 64, 1)'   // สีส้มเข้ม
      ];
  
      // สร้างข้อมูลกราฟ
      const data = {
        labels: departments, // แสดง department.name ในแกน X
        datasets: [{
          label: 'จำนวนงานตามแผนก',
          data: countsByDepartment, // ข้อมูลจำนวนของแต่ละ department
          backgroundColor: backgroundColors.slice(0, departments.length), // ใช้สีโปร่งแสงสำหรับแต่ละแท่ง
          borderColor: borderColors.slice(0, departments.length), // สีขอบของแต่ละแท่ง
          borderWidth: 2, // กำหนดขอบให้ชัดเจน
        }],
      };
  
      const myChart = new Chart(ctx, {
        type: 'bar', // ประเภทของกราฟเป็นแท่ง
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'จำนวนงาน',
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        }
      });
  
      // Cleanup เมื่อ component ถูก unmount
      return () => {
        myChart.destroy();
      };
    }, [filteredData]);
  
    // ดึงรายชื่อพนักงานทั้งหมดจาก taskData
    const employees = [...new Set(taskData?.map(task => `${task.employee.firstName} ${task.employee.lastName}`))];
    // ดึงสถานะทั้งหมดจาก taskData
    const statuses = [...new Set(taskData?.map(task => task.status))];
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Request Tasks by Department</h1>
  
        {/* การจัดวางตัวกรองให้อยู่ในบรรทัดเดียวกัน */}
        <div className="flex space-x-4 mb-4"> {/* ใช้ Flexbox จัดวาง */}
          {/* ตัวเลือกสำหรับกรองตาม employee */}
          <div>
            <label htmlFor="employeeFilter" className="mr-2">Filter by Employee:</label>
            <select
              id="employeeFilter"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Employees</option>
              {employees?.map((employee, index) => (
                <option key={index} value={employee}>{employee}</option>
              ))}
            </select>
          </div>
  
          {/* ตัวเลือกสำหรับกรองตาม status */}
          <div>
            <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Statuses</option>
              {statuses?.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
  
        <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
      </div>
    );
  };
  

export default LocationDepartmentChart;

