import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import { NoPhotoIcon } from '../../icons/Icons'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'
import Swal from 'sweetalert2'


const ShowRequestDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    // console.log("id from params", id)

    const currentTask = useRequestTaskStore(state => state?.currentTask)
    const deleteRequestTask = useRequestTaskStore(state => state?.deleteRequestTask)
    const resetCurrentTask = useRequestTaskStore(state => state?.resetCurrentTask)
    const token = useUserStore(state => state?.token)
    const getRequestTask = useRequestTaskStore(state => state?.getRequestTask)
    const user = useUserStore(state => state?.user)


    const role = user?.role
    const level = user?.level


    const [reqTask, setReqTask] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)


    // เผื่อข้อมูล update ใหม่ เลยให้ดึงข้อมูลใหม่อีกครั้งตอนเริ่มต้น 
    useEffect(() => {
        const checkId = async () => {
            try {
                const result = await getRequestTask(token, id)
                console.log(result)
                if (result.length == 0 || !result) {
                    navigate('/not-found')
                }
                setReqTask(result[0])
            } catch (error) {
                console.log(error)
            }
        }
        checkId()
    }, [])


    // useEffect(() => {
    //     if (currentTask && currentTask?.length > 0) {
    //         setReqTask(currentTask[0])
    //     }
    // }, [currentTask])

    // console.log(reqTask)

    const translateTime = (time) => {
        const isoDate = time
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleString('th-TH', {
            timeZone: 'Asia/Bangkok',
            hour12: false, // แสดงเวลาแบบ 24 ชั่วโมง
        });
        return formattedDate
    }

    // console.log(reqTask.id)
    const handleDelete = async () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ml-2",
                cancelButton: "btn btn-error mr-2"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const result = await deleteRequestTask(token, reqTask.id);
                    if (result) {
                        resetCurrentTask();
                        navigate('/request-in-progress')
                    }
                } catch (error) {
                    console.log(error)
                }
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    };

    const handleEdit = () => {
        // Add logic to handle edit request
        console.log('Edit Request');
    };

    const handleBack = () => {
        resetCurrentTask();
        console.log('Back');
    };


    return (
        <>
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
                                    {reqTask?.status === "inProgress" ?
                                        <span className="ml-2 flex items-center">
                                            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>{' '}{reqTask?.status}
                                        </span>
                                        :
                                        <span className="ml-2 flex items-center">
                                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>{' '}{reqTask?.status}
                                        </span>
                                    }
                                </p>
                                <p className="text-sm">
                                    <strong>Assigned: </strong> {reqTask?.isAssigned ? <span className="text-primary">Assigned</span> : <span className="text-secondary">Waiting..</span>}
                                </p>

                            </div>
                        </div>


                        {/* Right section - Image and buttons */}
                        <div className="w-1/2 flex flex-col items-end space-y-4">
                            {/* Delete button */}
                            {reqTask.status === "inProgress" && role !== "maintenance" ?
                                <button
                                    className="btn btn-outline btn-error w-[150px]  "
                                    onClick={handleDelete}
                                >
                                    Delete Request
                                </button> : ""}
                            <div
                                className="relative w-72 h-48 border rounded-lg overflow-hidden hover:cursor-pointer hover:opacity-80 active:transform active:scale-95"
                                onClick={() => {
                                    setIsOpen(true)
                                    document.getElementById('picture_modal').showModal()
                                }}
                            >
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
                    {/* Check status and choose Buttons */}
                    {reqTask.status === "inProgress" ?

                        role === "admin" ?
                            <div className=' flex justify-between w-full max-w-5xl'>
                                {/* Back button */}
                                <Link to={'/request-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                                    Back
                                </Link>
                                {/* Assign button */}
                                <Link to={`/create-maintenance-task/${id}`} className="btn btn-primary w-[150px] mt-4" >
                                    Assign
                                </Link>
                                {/* Edit button */}
                                <Link to={`/edit-request-task/${id}`} className="btn btn-secondary w-[150px] mt-4 " onClick={handleEdit}>
                                    Edit
                                </Link>
                            </div>
                            : role === "maintenance" && (level === 'manager' || level === 'leader') ?
                                <div className=' flex justify-between w-full max-w-5xl'>
                                    {/* Back button */}
                                    <Link to={'/request-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                                        Back
                                    </Link>
                                    {/* Assign button */}
                                    <Link to={`/create-maintenance-task/${id}`} className="btn btn-primary w-[150px] mt-4" >
                                        Assign
                                    </Link>
                                </div>
                                : role === "maintenance" && level === 'staff' ?
                                    <div className=' flex justify-between w-full max-w-5xl'>
                                        {/* Back button */}
                                        <Link to={'/request-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                                            Back
                                        </Link>
                                    </div>
                                    :
                                    <div className=' flex justify-between w-full max-w-5xl'>
                                        {/* Back button */}
                                        <Link to={'/request-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                                            Back
                                        </Link>
                                        {/* Edit button */}
                                        <Link to={`/edit-request-task/${id}`} className="btn btn-secondary w-[150px] mt-4 " onClick={handleEdit}>
                                            Edit
                                        </Link>
                                    </div>
                        :
                        <div className=' flex justify-between w-full max-w-5xl'>
                            <Link to={'/request-success'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                                Back
                            </Link>
                        </div>
                    }
                </div>
            </div>
            {/* modal */}

            {/* Picture Modal */}
            <dialog id="picture_modal" className="modal" onClose={() => { setIsOpen(false) }}>
                <div className="modal-box">

                    <button
                        type='button'
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={e => e.target.closest('dialog').close()}
                    >
                        ✕
                    </button>

                    {isOpen && reqTask?.image ?
                        <img
                            src={reqTask?.image}  // Placeholder for the image
                            alt="Machine"
                            className="w-full h-full object-cover"
                        />
                        :
                        <NoPhotoIcon className="w-full h-full object-cover" />}
                </div>
            </dialog>


        </>
    )
}

export default ShowRequestDetail