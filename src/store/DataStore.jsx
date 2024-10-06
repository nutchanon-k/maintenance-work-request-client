import React from 'react'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import axios from 'axios'
import {toast} from 'react-toastify'



const DataStore = (set,get) => ({
    dataLogin: {},
    errLogin: false,
    
    hdlLogin : async (email, password) => {
        const APIlogin = "url backend"
        const reqData = { email: email, password: password }
    
        try {
          const resp = await axios.post(APIlogin, reqData)
          set({ dataLogin: resp })
          set({ errLogin: false })
          toast.success(`Login Success !!`)
    
        } catch (err) {
          set({ errLogin: true })
          toast.error("E-mail or Password invalid")
          // console.log(err)
        }
      },
    
      logout: () => set({ dataLogin: {} }),
  
})


// const usePersist = {
//     name : 'DataStore',
//     getStorage : () =>localStorage,
//     partialize: (state) => ({
//         dataLogin: state.dataLogin,
//         errLogin: state.errLogin,
//         hdlLogin: state.hdlLogin
//     })
// }    





// const DataStore = create(persist(Store,usePersist))
const useDataStore = create(DataStore)
export default useDataStore




