import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import axios from 'axios'
import { createRequestTaskAPI, deleteRequestTaskAPI, editRequestTaskAPI, getRequestTaskAPI, getRequestTaskByStatus } from '../api/RequestTask';
import { toast } from 'react-toastify';



const useRequestTaskStore = create(persist((set, get) => ({
    requestTasksInprogress: [],
    currentTask: null,
    loading : false,


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
            // set({requestTasksInprogress : []})
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
            console.log("test", result.data.data[0])  
            set({currentTask : result.data.data}) 
            return result
        }catch(error){
            console.log(error)
        }
    },
    editRequestTask : async (token, body, requestId) => {
        try{
            const result = await editRequestTaskAPI(token, body, requestId)
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



  

  


  }),{
    name: "RequestTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useRequestTaskStore