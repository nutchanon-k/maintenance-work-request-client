import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from 'react-toastify';
import { createMaintenanceTaskAPI, deleteMaintenanceTaskAPI, getMaintenanceTaskByIdAPI, getMaintenanceTaskByStatusAPI, getTypeOfRootCausesAPI, updateMaintenanceTaskAPI } from '../api/MaintenanceTask';

const useMaintenanceTaskStore = create(persist((set, get) => ({
    maintenanceTaskBacklog: [],
    maintenanceTaskInprogress: [],
    maintenanceTaskInReview: [],
    maintenanceTaskSuccess: [],
    currentMaintenanceTask: null,
    typeOfRootCauses: null,
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

    getMaintenanceTaskInProgress : async (token) => {
        try{
        const result = await getMaintenanceTaskByStatusAPI(token, "inProgress")
        set({maintenanceTaskInprogress : result.data.data})
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },

    getMaintenanceTaskInReview : async (token) => {
        try{
        const result = await getMaintenanceTaskByStatusAPI(token, "inReview")
        set({maintenanceTaskInReview : result.data.data})
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },

    getMaintenanceTaskSuccess : async (token) => {
        try{
        const result = await getMaintenanceTaskByStatusAPI(token, "success")
        set({maintenanceTaskSuccess : result.data.data})
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

    updateMaintenanceTask : async (token, body, maintenanceId) => {
        try{
        const result = await updateMaintenanceTaskAPI(token, body, maintenanceId)
        set(state=>({maintenanceTaskBacklog : state.maintenanceTaskBacklog.filter(task => task.id !== maintenanceId)}))
        toast.success(result.data.message)
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },

    getTypeOfRootCauses : async (token,typeOfFailureId,machineTypeId) => {
        try{
            console.log(typeOfFailureId, machineTypeId)
        const result = await getTypeOfRootCausesAPI(token,typeOfFailureId, machineTypeId)
        // console.log(result.data.data)
        set({typeOfRootCauses : result.data.data})
        return result.data
        }catch(error){
            console.log(error)
        }
    }

 
 


  

  


  }),{
    name: "MaintenanceTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useMaintenanceTaskStore