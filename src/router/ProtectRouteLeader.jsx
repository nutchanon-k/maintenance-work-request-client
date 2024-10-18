import React, { useEffect, useState } from 'react'
import useUserStore from '../store/UserStore'
import { getMeAPI } from '../api/AuthAPI'
import LoadingToRedirect from './LoadingtoRedirect'

const ProtectRouteLeader = ({element, level}) => {
    const [isAllow, setIsAllow] = useState(false)
    const token = useUserStore(state => state.token)
    const user = useUserStore(state => state.user)
    

    console.log("protect route")
    useEffect(() => {
        if(user && token){
          getMeAPI(token)
          .then((res)=>{
            if(res.data.level === "manager" || res.data.level === "leader"){
              console.log("test")
              setIsAllow(true)
            }   
          })
          .catch((err)=>setIsAllow(false))  
        }
        
    }, [])

  return isAllow ? element : <LoadingToRedirect />
  
}

export default ProtectRouteLeader