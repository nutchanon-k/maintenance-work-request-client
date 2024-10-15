import axios from "axios";

export const createMaintenanceTaskAPI = async (token, body) => {
    const result = await axios.post("http://localhost:8000/maintenance-task", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const getMaintenanceTaskByStatusAPI = async (token, status) => {
    const result = await axios.get(`http://localhost:8000/maintenance-task?status=${status}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        
    })
    return result;

}

export const getMaintenanceTaskByIdAPI = async (token, maintenanceId ) => {
    const result = await axios.get(`http://localhost:8000/maintenance-task/?id=${maintenanceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
    }

export const deleteMaintenanceTaskAPI = async (token, maintenanceId) => {
    const result = await axios.delete(`http://localhost:8000/maintenance-task/${maintenanceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
}
    