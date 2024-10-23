import axios from "axios";


export const getMeAPI = async (token) => {
    return await axios.get("http://localhost:8000/auth/me", { 
        headers: { 
            Authorization: `Bearer ${token}` 
        } 
    }) 
}


export const forgetPasswordAPI = async (body) =>{ 
    return await axios.post("http://localhost:8000/auth//forgot-password", body)
}

export const  resetPasswordAPI = async (token , body) => {
    return await axios.patch(`http://localhost:8000/auth/reset-password`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}