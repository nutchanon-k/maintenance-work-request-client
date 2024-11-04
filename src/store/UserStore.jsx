import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { changePasswordAPI, createUserAPI, deleteUserAPI, getLocationAndDepartmentAPI, getMaintenanceMembersAPI, getUserAPI, getUserByIdAPI, updateUserAPI } from '../api/UserAPI';
import { toast } from 'react-toastify';
import { forgetPasswordAPI, getMeAPI, loginAPI, resetPasswordAPI } from '../api/AuthAPI';
import Swal from 'sweetalert2'



const useUserStore = create(persist((set, get) => ({
  user: null,
  token: "",
  maintenanceMembers: [],
  locationData: [],
  departmentData: [],
  allUser : [],
  currentUser : null,
  searchText : '',

  setSearchText : (text) => {
    set({searchText : text})
  },

  hdlLogin: async (body) => {
    try{
      const result = await loginAPI(body)
      set({ token: result.data.token, user: result.data.user })
      localStorage.setItem('token', result.data.token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome Back ${result.data.user.firstName}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result.data
    }catch(error){
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: "please try again"
      });
      // toast.error(error.response.data.message)
    }
  },

  hdlLogout: () => {
    set({ 
      user: null, 
      token: "",
      maintenanceMembers: [],
      locationData: [],
      departmentData: [],
      allUser : [],
      currentUser : null 
    })
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      
      
  },

  getMaintenanceMembers: async (token) => {
    try{
      const result = await getMaintenanceMembersAPI(token)
      set({ maintenanceMembers: result.data.data })
      // console.log("xxxxxxxx", result.data.data)
      return result.data.data
    }catch(error){
      console.log(error)
      
    }
  },
  getLocationAndDepartmentData: async (token) => {
    try{
      const result = await getLocationAndDepartmentAPI(token)
      set({ locationData: result.data.locations})
      set({ departmentData: result.data.departments})
      // console.log(result.data)
      return result.data
    }catch(error){
      console.log(error)
    }
  },

  createUser : async (token, body) => {
    try{
      const result = await createUserAPI(token, body)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result
    }catch(error){
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
    }
  },

  getAllUser : async (token) => {
    try{
      const result = await getUserAPI(token)
      set({allUser : result.data.data})
      return result
    }catch(error){
      console.log(error)
    }
  },

  getCurrentUser : async (token, userId) => {
    try{
      const result = await getUserByIdAPI(token , userId)
      set({currentUser : result.data.data})
      return result.data.data
    }catch(error){
      console.log(error)
    }
  },

  deleteUser : async (token, userId) => {
    try{
      const result = await deleteUserAPI(token , userId)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result
    }catch(error){
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
    }
  },

  resetCurrentUser : () => {
    set({currentUser : null})
  },

  updateUser : async (token, body, userId) => {
    try{
      console.log(body)
      const result = await updateUserAPI(token, body, userId)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result
    }catch(error){
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
    }
  },
  getMe : async (token) => {
    try{
      const result = await getMeAPI(token)
      set({user : result.data})
      return result
    }catch(error){
      console.log(error)
    }
  },

  changePassword : async (token, body, userId) => {
    try{
      const result = await changePasswordAPI(token, body, userId)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 2000
      });
      return result.data
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
  }
},

  getForgetPassword : async (body) => {
    try{
      const result = await forgetPasswordAPI(body)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
      console.log(error)
    }
  },

  getResetPassword : async (token,body) => {
    try{
      const result = await resetPasswordAPI(token,body)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 3000
      });
      return result
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
      });
      console.log(error)
    }
  },

  
}),{
  name: "accessToken",
  storage: createJSONStorage(() => localStorage),
}));





export default useUserStore
