import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Chart from 'chart.js/auto';
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore';
import useUserStore from '../../store/UserStore';

const FailureTypeChart = forwardRef((props, ref) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // เก็บอินสแตนซ์ของ Chart.js

    const [taskData, setTaskData] = useState([]);
    const [typeOfFailure, setTypeOfFailure] = useState([]);
    const [statusFilter, setStatusFilter] = useState(''); 
    const [machineFilter, setMachineFilter] = useState(''); 

    const token = useUserStore((state) => state.token);
    const getDataRootCauseFailure = useMaintenanceTaskStore((state) => state.getDataRootCauseFailure);
    const getAllMaintenanceTask = useMaintenanceTaskStore((state) => state.getAllMaintenanceTask);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllMaintenanceTask(token);
                setTaskData(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, getAllMaintenanceTask]);

    useEffect(() => {
        const fetchFailureTypes = async () => {
            try {
                const result = await getDataRootCauseFailure(token);
                setTypeOfFailure(result.typeOfFailure);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFailureTypes();
    }, [token, getDataRootCauseFailure]);

    // กรองข้อมูลตาม status และ machine ที่เลือก โดยเข้าถึงผ่าน requestTask
    const filteredData = taskData?.filter(task => {
        const statusMatch = statusFilter ? task.status === statusFilter : true;
        const machineMatch = machineFilter ? task.requestTask.machine.name === machineFilter : true;
        return statusMatch && machineMatch;
    });

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // นำข้อมูลจาก filteredData มาจัดกลุ่มตาม typeOfFailure
        const failureTypes = typeOfFailure?.map((failureType) => failureType.details); 

        // นับจำนวนการเกิดปัญหาที่แยกตาม typeOfFailure
        const countsByFailureType = failureTypes?.map((failureType) => {
            return filteredData?.filter(
                (task) => task?.typeOfFailure?.details === failureType
            ).length;
        });

        // กำหนดสีสำหรับแต่ละแท่ง
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

        const data = {
            labels: failureTypes, 
            datasets: [{
                label: 'Amount of Failures',
                data: countsByFailureType, 
                backgroundColor: backgroundColors.slice(0, failureTypes.length), // ใช้สีต่างกันสำหรับแต่ละแท่ง
                borderColor: borderColors.slice(0, failureTypes.length), // สีขอบของแต่ละแท่ง
                borderWidth: 1,
            }],
        };

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // ทำลายกราฟเก่าก่อนสร้างใหม่
        }

        const myChart = new Chart(ctx, {
            type: 'bar', // ประเภทกราฟเป็นแท่ง
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount of Failures',
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
                },
            },
        });
        // if (ref) {
        //     ref.current = myChart;  // ให้ ref สามารถเข้าถึง Chart.js instance
        //   }
        chartInstanceRef.current = myChart;

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [filteredData, typeOfFailure]);

    // ใช้ forwardRef เพื่อให้สามารถเรียกใช้ toBase64Image จาก component อื่นๆ ได้
    useImperativeHandle(ref, () => ({
     toBase64Image: () => {
            if (chartInstanceRef.current) {
                return chartInstanceRef.current.toBase64Image();
            }
            return null;
        }
    }));

    
    // ดึงสถานะที่มีอยู่ทั้งหมดจาก taskData
    const statuses = [...new Set(taskData?.map((task) => task.status))];
    // ดึงชื่อเครื่องจักรทั้งหมดจาก taskData โดยเข้าถึงผ่าน requestTask
    const machines = [...new Set(taskData?.map((task) => task.requestTask.machine.name))];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Maintenance Tasks by Type of Failure</h1>
            {/* ตัวกรองสถานะ */}
            <div className="mb-4 flex space-x-4">
                <div>
                    <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All Statuses</option>
                        {statuses?.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {/* ตัวกรองเครื่องจักร */}
                <div>
                    <label htmlFor="machineFilter" className="mr-2">Filter by Machine:</label>
                    <select
                        id="machineFilter"
                        value={machineFilter}
                        onChange={(e) => setMachineFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All Machines</option>
                        {machines?.map((machine, index) => (
                            <option key={index} value={machine}>{machine}</option>
                        ))}
                    </select>
                </div>
            </div>

            <canvas ref={chartRef}></canvas> {/* ใช้ <canvas> เพื่อสร้างกราฟ */}
        </div>
    );
});

export default FailureTypeChart;

