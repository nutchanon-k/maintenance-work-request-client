import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../store/UserStore'

const LoadingToRedirect = () => {
const [count, setCount] = useState(3)
const [redirect, setRedirect] = useState(false)

const getMe = useUserStore(state => state.getMe)
const hdlLogout = useUserStore(state => state.hdlLogout)


useEffect(() => {
    const interval = setInterval(() => {
        setCount((currentCount) => {
            if(currentCount === 1){
                clearInterval(interval)
                setRedirect(true)
            } 
            return currentCount - 1
        })
    }, 1000)
    return () => clearInterval(interval)
}, [])

if(redirect){
    getMe()
    hdlLogout()
    return <Navigate to={'/'} />
}
  

return (
    <div>No Permission, Redirect in ... {count}</div>
  )
}

export default LoadingToRedirect