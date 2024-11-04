import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL || 'http://localhost:8000', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    // console.log("token from interceptor", token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Please log in again.');
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
