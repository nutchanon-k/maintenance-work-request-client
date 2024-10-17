import React, { useEffect, useState } from 'react'
import useUserStore from '../store/UserStore'
import { getMeAPI } from '../api/AuthAPI'
import LoadingToRedirect from './LoadingtoRedirect'

const ProtectRoute = ({element, role}) => {
    const [isAllow, setIsAllow] = useState(false)
    const token = useUserStore(state => state.token)
    const user = useUserStore(state => state.user)
    

    console.log("protect route", role)
    useEffect(() => {
        if(user && token){
          getMeAPI(token)
          .then((res)=>{
            if(res.data.role === role){
              setIsAllow(true)
            }
            else{
              return   
            }   
          })
          .catch((err)=>setIsAllow(false))  
        }
        
    }, [])

  return isAllow ? element : <LoadingToRedirect />
  
}

export default ProtectRoute