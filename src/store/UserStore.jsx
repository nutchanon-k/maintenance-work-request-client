import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import axios, { all } from 'axios'
import { createUserAPI, deleteUserAPI, getLocationAndDepartmentAPI, getMaintenanceMembersAPI, getUserAPI, getUserByIdAPI, updateUserAPI } from '../api/UserAPI';
import { toast } from 'react-toastify';
import { getMeAPI } from '../api/AuthAPI';
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
      const result = await axios.post("http://localhost:8000/auth/login",body)
      set({ token: result.data.token, user: result.data.user })
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
      console.log(result.data)
      return result.data
    }catch(error){
      console.log(error)
    }
  },

  createUser : async (token, body) => {
    try{
      const result = await createUserAPI(token, body)
      return result
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
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
      return result
    }catch(error){
      console.log(error)
    }
  },

  resetCurrentUser : () => {
    set({currentUser : null})
  },

  updateUser : async (token, body, userId) => {
    try{
      console.log(body)
      const result = await updateUserAPI(token, body, userId)
      return result
    }catch(error){
      console.log(error)
    }
  },
  getMe : async (token) => {
    try{
      console.log("get meeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      const result = await getMeAPI(token)
      set({user : result.data})
      return result
    }catch(error){
      console.log(error)
    }
  },

  


}),{
  name: "accessToken",
  storage: createJSONStorage(() => localStorage),
}));





export default useUserStore
