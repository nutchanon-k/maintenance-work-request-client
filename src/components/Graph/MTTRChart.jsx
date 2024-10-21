import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
import useUserStore from '../../store/UserStore';

const MTTRChart = () => {
    const chartRef = useRef(null);

    const [taskData, setTaskData] = useState([]);
    const [typeOfFailures, setTypeOfFailures] = useState([]);
    const [selectedFailureType, setSelectedFailureType] = useState('All');

    const token = useUserStore((state) => state.token);
    const getMaintenanceTaskSuccess = useMaintenanceTaskStore((state) => state.getMaintenanceTaskSuccess);
    const getDataRootCauseFailure = useMaintenanceTaskStore((state) => state.getDataRootCauseFailure); // ฟังก์ชันสำหรับดึง Type of Failure

    // ดึงข้อมูลทั้งหมด
    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getMaintenanceTaskSuccess(token);
                setTaskData(result.data);

                // ดึงประเภทของ Failure ทั้งหมด
                const failureResult = await getDataRootCauseFailure(token);
                setTypeOfFailures(['All', ...failureResult?.typeOfFailure?.map((failure) => failure.details)]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, getMaintenanceTaskSuccess, getDataRootCauseFailure]);

    // ฟังก์ชันเพื่ออัพเดตตัวเลือก Type of Failure
    const handleFailureTypeChange = (event) => {
        setSelectedFailureType(event.target.value);
    };

    // คำนวณ MTTR และอัพเดตกราฟ
    useEffect(() => {
        if (taskData?.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        // กรองข้อมูลตาม Type of Failure ที่เลือก
        const filteredTasks = selectedFailureType === 'All'
            ? taskData
            : taskData.filter((task) => task.typeOfFailure?.details === selectedFailureType);

        // คำนวณค่า MTTR สำหรับแต่ละแผนก
        const departments = [...new Set(filteredTasks?.map((task) => task.requestTask.department.name))];
        const mttrByDepartment = departments?.map((department) => {
            const tasksInDept = filteredTasks?.filter((task) => task.requestTask.department.name === department);
            const totalRepairTime = tasksInDept?.reduce((acc, task) => {
                if (task.startTime && task.finishTime) {
                    const startTime = new Date(task.startTime);
                    const finishTime = new Date(task.finishTime);
                    if (finishTime > startTime) {
                        const repairTime = (finishTime - startTime) / (1000 * 60); // คำนวณเวลาในหน่วยนาที
                        return acc + repairTime;
                    }
                }
                return acc;
            }, 0);
            return tasksInDept.length > 0 ? totalRepairTime / tasksInDept.length : 0;
        });

        // สร้างสีที่แตกต่างกันสำหรับแต่ละแผนก
        const backgroundColors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ];

        const borderColors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ];

        // ข้อมูลสำหรับ Chart.js
        const data = {
            labels: departments,
            datasets: [
                {
                    label: 'MTTR (in minutes)',
                    data: mttrByDepartment,
                    backgroundColor: backgroundColors.slice(0, departments.length),
                    borderColor: borderColors.slice(0, departments.length),
                    borderWidth: 1,
                },
            ],
        };

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (minutes)',
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            myChart.destroy();
        };
    }, [taskData, selectedFailureType]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Mean Time to Repair (MTTR) by Department</h1>
            
            {/* Dropdown สำหรับเลือก Type of Failure */}
            <div className="mb-4 flex justify-center items-center">
                <label htmlFor="failureType" className="mr-2">Filter by Type of Failure:</label>
                <select
                    id="failureType"
                    value={selectedFailureType}
                    onChange={handleFailureTypeChange}
                    className="p-2 border border-gray-300 rounded"
                >
                    {typeOfFailures?.map((failureType, index) => (
                        <option key={index} value={failureType}>
                            {failureType}
                        </option>
                    ))}
                </select>
            </div>

            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default MTTRChart;
