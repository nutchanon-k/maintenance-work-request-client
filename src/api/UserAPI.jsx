import axios from "axios";

export const getMaintenanceMembersAPI =  async (token) => {
        const result =  await axios.get("http://localhost:8000/user/assign-users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
}

export const getLocationAndDepartmentAPI =  async (token) => {
    const result =  await axios.get("http://localhost:8000/user/location-department-data", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}


export const getUserAPI =  async (token) => {
    const result =  await axios.get("http://localhost:8000/user/all-users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

// export const getUserByIdAPI =  async (token, userId) => {
    
// }

export const createUserAPI =  async (token, body) => {
    const result =  await axios.post("http://localhost:8000/user", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const getUserByIdAPI =  async (token, userId) => {
    const result =  await axios.get(`http://localhost:8000/user/user-detail/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const deleteUserAPI = async (token, userId) => {
    const result = await axios.delete(`http://localhost:8000/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const updateUserAPI = async (token, body, userId ) => {
    const result = await axios.patch(`http://localhost:8000/user/${userId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}

export const changePasswordAPI = async (token, body, userId) => {
    const result = await axios.patch(`http://localhost:8000/user/change-password/${userId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result;
}