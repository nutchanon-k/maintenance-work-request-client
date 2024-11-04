import axios from "axios";
import axiosInstance from "./Interceptor";


export const loginAPI = async (body) => {
    return axiosInstance.post('/auth/login', body)
}


export const getMeAPI = async (token) => {
    return axiosInstance.get('/auth/me')
}


export const forgetPasswordAPI = async (body) =>{ 
    return await axiosInstance.post("/auth/forgot-password", body)
}

export const  resetPasswordAPI = async (token , body) => {
    return await axios.patch(`http://localhost:8000/auth/reset-password`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}