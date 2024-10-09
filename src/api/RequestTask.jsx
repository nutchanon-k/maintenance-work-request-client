import axios from "axios";

export const getDataMachine = async (token, machineId) => {
    const result = await axios.get(`http://localhost:8000/request-task/data-machine/${machineId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
};

export const createRequestTaskAPI = async (token, body) => {
    const result = await axios.post("http://localhost:8000/request-task", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const getRequestTaskAPI = async (token, requestId) => {
    const result = await axios.get(`http://localhost:8000/request-task?requestId=${requestId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}
export const getRequestTaskByStatus = async (token, status) => {
    const result = await axios.get(`http://localhost:8000/request-task?status=${status}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}
