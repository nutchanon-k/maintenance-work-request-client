import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from 'react-toastify';
import { createMaintenanceTaskAPI, deleteMaintenanceTaskAPI, getMaintenanceTaskByIdAPI, getMaintenanceTaskByStatusAPI } from '../api/MaintenanceTask';

const useMaintenanceTaskStore = create(persist((set, get) => ({
    maintenanceTaskBacklog: [],
    maintenanceTaskInprogress: [],
    maintenanceTaskInReview: [],
    maintenanceTaskSuccess: [],
    currentMaintenanceTask: null,
    loading : false,




    createMaintenanceTask: async (token,body) => {
        try{
            const result = await createMaintenanceTaskAPI(token,body)   
            set(state=> ({maintenanceTaskBacklog : [{...result.data.data }, ...state.maintenanceTaskBacklog]}))
            console.log(result.data)
            toast.success(result.data.message)
            return result.data
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    },

    getMaintenanceTaskBacklog : async (token) => {
        try{
        const result = await getMaintenanceTaskByStatusAPI(token, "backlog")
        set({maintenanceTaskBacklog : result.data.data})
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },

    resetCurrentMaintenanceTask : () => {
        set({currentMaintenanceTask: null})
    },

    getMaintenanceTask : async (token, maintenanceId) => {
        try{
        const result = await getMaintenanceTaskByIdAPI(token, maintenanceId)
        set({currentMaintenanceTask : result.data.data})
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },
    
    deleteMaintenanceTask : async (token, maintenanceId) => {
        try{
        const result = await deleteMaintenanceTaskAPI(token, maintenanceId)
        set(state=>({maintenanceTaskBacklog : state.maintenanceTaskBacklog.filter(task => task.id !== maintenanceId)}))
        toast.success(result.data.message)
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },


 
 


  

  


  }),{
    name: "MaintenanceTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useMaintenanceTaskStore