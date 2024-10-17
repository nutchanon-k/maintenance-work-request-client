import axios from "axios";


export const getMeAPI = async (token) => await axios.get("http://localhost:8000/auth/me", { headers: { Authorization: `Bearer ${token}` } }) 
