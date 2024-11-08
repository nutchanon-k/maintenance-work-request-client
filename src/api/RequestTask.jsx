import axios from "axios";

export const getDataMachine = async (token, machineId) => {
    const result = await axios.get(`http://localhost:8000/request-task/data-machine/${machineId}`, {
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
export const editRequestTaskAPI = async (token, body, requestId) => {
    const result = await axios.patch(`http://localhost:8000/request-task/${requestId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return result;
}
export const deleteRequestTaskAPI = async (token, requestId) => {
    const result = await axios.delete(`http://localhost:8000/request-task/${requestId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const updateIsAssignedAPI = async (token, body, requestId) => {
    const result = await axios.patch(`http://localhost:8000/request-task/isAssigned/${requestId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const updateRTStatusAPI = async (token, body, requestId) => {
    const result = await axios.patch(`http://localhost:8000/request-task/update-status/${requestId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const getAllRequestTaskAPI = async (token) => {
    const result = await axios.get(`http://localhost:8000/request-task`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}