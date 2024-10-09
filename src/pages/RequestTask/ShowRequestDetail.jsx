import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import { NoPhotoIcon } from '../../icons/Icons'


const ShowRequestDetail = () => {
    const [reqTask, setReqTask] = useState('')
    const currentTask = useRequestTaskStore(state => state.currentTask)


    useEffect(() => {
        if (currentTask) {
            setReqTask(currentTask[0])
        }
    }, [currentTask])

    console.log(reqTask)

    const translateTime = (time) => {
        const isoDate = time
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleString('th-TH', {
            timeZone: 'Asia/Bangkok',
            hour12: false, // แสดงเวลาแบบ 24 ชั่วโมง
        });
        return formattedDate
    }

    const navigate = useNavigate()
    const handleDelete = () => {
        // Add logic to handle delete request
        console.log('Delete Request');
    };

    const handleEdit = () => {
        // Add logic to handle edit request
        console.log('Edit Request');
    };

    const handleBack = () => {
        // Add logic to handle back action
        console.log('Back');
    };


    return (
        <div className='flex flex-col  '>

            {/* header */}
            <div className='flex justify-between p-4 '>
                <div className='text-3xl p-2 flex items-baseline gap-2  '>
                    <h1>{"Request Task >"}</h1>
                    <Link to="/request-in-progress" className="text-xl">
                        In Progress
                    </Link>
                    <h1>{">"}</h1>
                    <div className="text-lg">
                        {`Request Task ID  ${reqTask?.id}`}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between w-full max-w-5xl">
                    {/* Left section - Request details */}
                    <div className="w-1/2 space-y-4">

                        <span className="badge badge-success">{reqTask?.machine?.location?.name}</span>

                        <div className="space-y-2">
                            <p className="text-sm">
                                <strong>Request by: </strong> {reqTask?.employee?.firstName} {reqTask?.employee?.lastName}
                            </p>
                            <p className="text-sm">
                                <strong>Requested Time: </strong> {translateTime(reqTask?.requestTime)}
                            </p>
                            <p className="text-sm">
                                <strong>Updated Time: </strong> {translateTime(reqTask?.updatedTime)}
                            </p>
                            <p className="text-sm">
                                <strong>Division: </strong> {reqTask?.department?.name}
                            </p>
                            <p className="text-sm">
                                <strong>Machine ID.: </strong> {reqTask?.machineId}
                            </p>
                            <p className="text-sm">
                                <strong>Machine name: </strong> {reqTask?.machine?.name}
                            </p>
                            <p className="text-sm">
                                <strong>Machine observations: </strong> {reqTask?.faultSymptoms}
                            </p>
                            <p className="text-sm flex items-center">
                                <strong>Status: </strong>
                                <span className="ml-2 flex items-center">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>{' '}{reqTask?.status}
                                </span>
                            </p>
                            <p className="text-sm">
                                <strong>Assigned: </strong> {reqTask?.isAssigned ? <span className="text-primary">Assigned</span> : <span className="text-secondary">Waiting..</span>}
                            </p>

                        </div>
                    </div>


                    {/* Right section - Image and buttons */}
                    <div className="w-1/2 flex flex-col items-end space-y-4">
                        {/* Delete button */}
                        <button
                            className="btn btn-outline btn-error w-[150px]  "
                            onClick={handleDelete}
                        >
                            Delete Request
                        </button>
                        <div className="relative w-72 h-48 border rounded-lg overflow-hidden">
                            {/* Image */}
                            {reqTask?.image ? <img
                                src={reqTask?.image}  // Placeholder for the image
                                alt="Machine"
                                className="w-full h-full object-cover"
                            /> :
                                <NoPhotoIcon className="w-full h-full object-cover" />}
                        </div>
                    </div>

                </div>
                <div className=' flex justify-between w-full max-w-5xl'>
                    {/* Back button */}
                    <button className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                        Back
                    </button>
                    {/* Edit button */}
                    <button className="btn btn-secondary w-[150px] mt-4" onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </div>








        </div>
    )
}

export default ShowRequestDetail