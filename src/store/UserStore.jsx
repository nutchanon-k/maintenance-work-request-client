import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import axios from 'axios'




const useUserStore = create(persist((set, get) => ({
  user: null,
  token: "",

  hdlLogin: async (body) => {
    try{
    console.log(body)
      const path = 'http://localhost:6000/auth/login'
      const result = await axios.post("http://localhost:8000/auth/login",body)
      console.log(result)
      set({ token: result.data.token, user: result.data.user })
      return result.data
    }catch(error){
      console.log(error)
    }
  },

  hdlLogout: () => {
      set({ user: null, token: "" })
  },
}),{
  name: "accessToken",
  storage: createJSONStorage(() => localStorage),
}));


export default useUserStore
