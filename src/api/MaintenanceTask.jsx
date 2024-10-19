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


export const updateMaintenanceTaskAPI = async (token, body, maintenanceId) => {
    const result = await axios.patch(`http://localhost:8000/maintenance-task/${maintenanceId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
    
}

export const getTypeOfRootCausesAPI = async (token, typeOfFailureId, machineTypeId) => {
    const result = await axios.get(`http://localhost:8000/maintenance-task/data-type-of-root-cause?typeOfFailureId=${typeOfFailureId}&machineTypeId=${machineTypeId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
}

export const getMaintenanceTaskByRequestIdAPI = async (token, requestId) => {
    const result = await axios.get(`http://localhost:8000/maintenance-task?requestId=${requestId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
}

export const updateMaintenanceTaskStatusAPI = async (token, body, machineId) => {
    const result = await axios.patch(`http://localhost:8000/maintenance-task/update-status/${machineId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return result;
}