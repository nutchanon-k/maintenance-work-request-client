import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { createRequestTaskAPI, deleteRequestTaskAPI, editRequestTaskAPI, getRequestTaskAPI, getRequestTaskByStatus, updateIsAssignedAPI, updateRTStatusAPI } from '../api/RequestTask';
import { toast } from 'react-toastify';



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
    },

    createRequestTask: async (token,body) => {
        try{
            const result = await createRequestTaskAPI(token,body)   
            set((state)=> ({requestTasksInprogress : [{...result.data.data }, ...state.requestTasksInprogress]}))
            return result
        }catch(error){
            console.log(error)
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
              return result
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
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
              return result
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
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
    }
 


  

  


  }),{
    name: "RequestTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useRequestTaskStore