import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../store/UserStore'
import NoPermission from '../assets/NoPermission.json'
import AlertAnimation from '../assets/AlertAnimation.json'
import Lottie from 'lottie-react'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    const [redirect, setRedirect] = useState(false)

    const getMe = useUserStore(state => state.getMe)
    const hdlLogout = useUserStore(state => state.hdlLogout)


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div className='flex flex-col justify-center items-center h-[80vh]'>
            <div className='flex gap-4'>
                <Lottie animationData={AlertAnimation} loop={true} />
                <Lottie animationData={NoPermission} loop={true} className='w-40' />
            </div>
            <h1 className='text-3xl text-error'>No Permission, Redirect in ... {count}</h1>
        </div>
    )
}

export default LoadingToRedirect