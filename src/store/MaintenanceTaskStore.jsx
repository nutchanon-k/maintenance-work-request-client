import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { createMaintenanceTaskAPI, deleteMaintenanceTaskAPI, getAllMaintenanceTaskAPI, getMaintenanceTaskByIdAPI, getMaintenanceTaskByRequestIdAPI, getMaintenanceTaskByStatusAPI, getRootCauseFailureAPI, getTypeOfRootCausesAPI, updateMaintenanceTaskAPI, updateMaintenanceTaskStatusAPI } from '../api/MaintenanceTask';
import Swal from 'sweetalert2'

const useMaintenanceTaskStore = create(persist((set, get) => ({
    maintenanceTaskBacklog: [],
    maintenanceTaskInprogress: [],
    maintenanceTaskInReview: [],
    maintenanceTaskSuccess: [],
    maintenanceTaskByRequestId :[],
    currentMaintenanceTask: null,
    typeOfRootCauses: null,
    loading : false,
    rootCauseFailure : null,


    clearAllMaintenanceStore : () => {
        set({
            maintenanceTaskBacklog : [], 
            maintenanceTaskInprogress : [], 
            maintenanceTaskInReview : [], 
            maintenanceTaskSuccess : [], 
            maintenanceTaskByRequestId :[],
            currentMaintenanceTask : null,
            typeOfRootCauses : null,
            loading : false,
        })
        localStorage.removeItem("MaintenanceTaskStore");
    },

    createMaintenanceTask: async (token,body) => {
        try{
            const result = await createMaintenanceTaskAPI(token,body)   
            set(state=> ({maintenanceTaskBacklog : [{...result.data.data }, ...state.maintenanceTaskBacklog]}))
            console.log(result.data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500
              });
            return result.data
        }catch(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            
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

    getMaintenanceTaskForCheckAllSuccess : async (token, requestId) => {
        try{
            const result = await getMaintenanceTaskByRequestIdAPI(token, requestId)
            set({maintenanceTaskByRequestId : result.data.data})
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
            console.log("IDDDDDD", maintenanceId)
        const result = await getMaintenanceTaskByIdAPI(token, maintenanceId)
        console.log(result.data.data)
        set({currentMaintenanceTask : result.data.data})
        return result.data.data
        
    }catch(error){
            console.log(error)
        }
    },
    
    deleteMaintenanceTask : async (token, maintenanceId) => {
        try{
        const result = await deleteMaintenanceTaskAPI(token, maintenanceId)
        set(state=>({maintenanceTaskBacklog : state.maintenanceTaskBacklog.filter(task => task.id !== maintenanceId)}))
        // toast.success(result.data.message)
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },

    updateMaintenanceTask : async (token, body, maintenanceId) => {
        try{
        const result = await updateMaintenanceTaskAPI(token, body, maintenanceId)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: result.data.message,
            showConfirmButton: false,
            timer: 1500
          });
        return result.data
        
    }catch(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
                
              });
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
    },

    updateMaintenanceTaskStatus : async (token, body, maintenanceId) => {
        try{
            const result = await updateMaintenanceTaskStatusAPI(token, body, maintenanceId)
        return result.data
        
    }catch(error){
            console.log(error)
        }
    },



    getDataRootCauseFailure : async (token) => {
        try{
            const result = await getRootCauseFailureAPI(token)
            // console.log(result.data.data)
            set({rootCauseFailure : result.data.data})
            return result.data.data
        }catch(error){
            console.log(error)
        }
    },

    getAllMaintenanceTask : async (token) => {
        try{
            const result = await getAllMaintenanceTaskAPI(token)
            // console.log(result.data.data)
            return result.data.data
        }catch(error){
            console.log(error)
        }
    }


  }),{
    name: "MaintenanceTaskStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  export default useMaintenanceTaskStore