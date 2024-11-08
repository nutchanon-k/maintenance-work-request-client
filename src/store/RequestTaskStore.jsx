import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { createRequestTaskAPI, deleteRequestTaskAPI, editRequestTaskAPI, getAllRequestTaskAPI, getRequestTaskAPI, getRequestTaskByStatus, updateIsAssignedAPI, updateRTStatusAPI } from '../api/RequestTask';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


const useRequestTaskStore = create(persist((set, get) => ({
    requestTasksInprogress: [],
    requestTasKsSuccess: [],
    currentTask: null,
    loading : false,

    clearAllRequestTaskStore : () => {
        set({
            requestTasksInprogress : [], 
            requestTasKsSuccess : [],
            currentTask : null,
            loading : false
        }) 
        localStorage.removeItem("RequestTaskStore");
    },

    createRequestTask: async (token,body) => {
        try{
            const result = await createRequestTaskAPI(token,body)   
            set((state)=> ({requestTasksInprogress : [{...result.data.data }, ...state.requestTasksInprogress]}))
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
                title: "Oops...",
                text: error.response.data.message,
                footer: "please try again"
              });
        }
    },
    getRequestTaskInprogress : async (token) => {
        try{
            const result = await getRequestTaskByStatus(token, "inProgress")
            set({requestTasksInprogress : result.data.data})
            return result
        }catch(error){
            console.log(error)
        }
    },
    getRequestTask : async (token, requestId) => {
        try{
            set({currentTask : null})
            const result = await getRequestTaskAPI(token,requestId)  
            set({currentTask : result.data.data}) 
            return result.data.data
        }catch(error){
            console.log(error)
            
        }
    },
    editRequestTask : async (token, body, requestId) => {
        try{
            console.log( 'reqID in store ' ,body)
            const result = await editRequestTaskAPI(token, body, requestId)
            set({currentTask : result.data.data})
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
                title: "Oops...",
                text: error.response.data.message,
                footer: "please try again"
              });
        }
    },
    deleteRequestTask : async (token, requestId) => {
        try{
            console.log( 'reqID in store ' ,requestId)
            const result = await deleteRequestTaskAPI(token, requestId)
            
            set(state=>({requestTasksInprogress : state.requestTasksInprogress.filter(task => task.id !== requestId)}))
            return result
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    },


    resetCurrentTask : () => {
        set({currentTask : null})
    },
    


    getRequestTaskSuccess : async (token) => {
        try{
            const result = await getRequestTaskByStatus(token, "success")
            set({requestTasksSuccess : result.data.data})
            return result
        }catch(error){
            console.log(error)
        }
    },

    updateIsAssigned : async (token, body, requestId) => {
        try{
            const result = await updateIsAssignedAPI (token, body, requestId)
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
                title: "Oops...",
                text: error.response.data.message,
                footer: "please try again"
              });
        }
    },

    updateRTStatus : async (token, body, requestId) => {
        try{
            const result = await updateRTStatusAPI (token, body, requestId)
              return result
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    },

    getAllRequestTask : async (token) => {
        try{
            const result = await getAllRequestTaskAPI(token)
            return result.data.data
        }catch(error){
            console.log(error)
        }
    },
 


  

  


  }),{
    name: "RequestTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useRequestTaskStore