import React from 'react'
import NotFoundIcon from '../assets/NotFound.json'
import Lottie from 'lottie-react'

const NotFound = () => {
  return ( 
    <div className='flex flex-col justify-center items-center h-[80vh]'>
      <Lottie animationData={NotFoundIcon} loop={true} />
      <h1 className='text-5xl font-bold text-info'>Page Not Found</h1>
    </div>
  )
}

export default NotFound