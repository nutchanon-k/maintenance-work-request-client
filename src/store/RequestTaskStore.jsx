import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import axios from 'axios'
import { createRequestTaskAPI, getRequestTaskAPI, getRequestTaskByStatus } from '../api/RequestTask';



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





  

  


  }),{
    name: "RequestTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useRequestTaskStore