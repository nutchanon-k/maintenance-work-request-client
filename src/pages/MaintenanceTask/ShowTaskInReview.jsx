import React, { useEffect, useState } from 'react'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import useUserStore from '../../store/UserStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NoPhotoIcon } from '../../icons/Icons'
import RequestDetails from '../../components/RequestDetails'
import useRequestTaskStore from '../../store/RequestTaskStore'

const ShowTaskInReview = () => {
    const navigate = useNavigate()
    const { id } = useParams()


    const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
    const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
    const token = useUserStore(state => state.token)
    const updateMaintenanceTask = useMaintenanceTaskStore(state => state.updateMaintenanceTask)
    const getMaintenanceTaskForCheckAllSuccess = useMaintenanceTaskStore(state => state.getMaintenanceTaskForCheckAllSuccess) // getMaintenanceTaskForCheckAllSuccess
    const maintenanceTaskByRequestId = useMaintenanceTaskStore(state => state.maintenanceTaskByRequestId) // maintenanceTaskForCheckAllSuccess
    const updateRTStatus = useRequestTaskStore(state => state.updateRTStatus)

    const [mTask, setMTask] = useState('')
    const [showPicBefore, setShowPicBefore] = useState(false)
    const [showPicAfter, setShowPicAfter] = useState(false)
    const [showConfirmAccept, setShowConfirmAccept] = useState(false)
    const [showConfirmReject, setShowConfirmReject] = useState(false)
    const [rejectReason, setRejectReason] = useState('')


    useEffect(() => {
        getMaintenanceTask(token, id)
    }, [])

    useEffect(() => {
        if (currentMaintenanceTask) {
            setMTask(currentMaintenanceTask[0])
            getMaintenanceTaskForCheckAllSuccess(token, currentMaintenanceTask[0].requestId)
        }
    }, [currentMaintenanceTask])

    // console.log(maintenanceTaskByRequestId)
    const handleAccept = async () => {
        const response = await updateMaintenanceTask(token, { status: 'success', acceptTime: new Date().toISOString() }, mTask.id)

        //check all success MT for change RT status to success
        const checkSuccess = maintenanceTaskByRequestId.filter((item) => item.status === 'success')
        if (maintenanceTaskByRequestId.length - checkSuccess.length === 1) {
            updateRTStatus(token, { status: 'success' }, mTask.requestId)
        }

        toast.success(response.data.message)
        navigate('/maintenance-success')
        console.log('Accept Request');
    };

    const handleReject = async () => {
        const response = await updateMaintenanceTask(token, { status: 'backlog', isRejected: true, rejectReason: rejectReason }, mTask.id)
        toast.success(response.data.message)
        navigate('/maintenance-backlog')
        console.log('Reject Request');
    };

    const handleAllSuccess = async () => {
        console.log('test first')
    }

    return (
        <>
            <div className='flex flex-col  '>
                {/* header */}
                <div className='flex justify-between p-4 '>
                    <div className='text-3xl p-2 flex items-baseline gap-2  '>
                        <h1>{"Maintenance Task >"}</h1>
                        {mTask?.status === "inReview" ?
                            <Link to="/maintenance-in-review" className="text-xl">
                                In Review
                            </Link>
                            :
                            <Link to="/maintenance-success" className="text-xl">
                                Success
                            </Link>
                        }
                        <h1>{">"}</h1>
                        <div className="text-lg">
                            {`Maintenance Task ID  ${mTask?.id}`}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 min-h-screen">
                    <div className="flex justify-between w-full max-w-5xl">

                        {/* Left section - Request details */}
                        <RequestDetails mTask={mTask} />


                        {/* Right section - Image and buttons */}
                        <div className="w-1/2 flex flex-col items-end space-y-4">

                            {/* reject button */}
                            {mTask?.status === "inReview" ?
                                <button
                                    className="btn btn-outline w-[150px] btn-error mt-4"
                                    onClick={() => {
                                        setShowConfirmReject(true)
                                        document.getElementById('confirm_reject_mTask_modal').showModal()
                                    }}>
                                    Reject
                                </button>
                                :
                                <></>
                            }


                            <div
                                className="relative w-72 h-48 border rounded-lg overflow-hidden hover:cursor-pointer hover:opacity-80 active:transform active:scale-95"
                                onClick={() => {
                                    setShowPicBefore(true)
                                    document.getElementById('picture_before_modal').showModal()
                                }}
                            >
                                <p>Before image</p>
                                {/* Image */}
                                {mTask?.requestTask?.image ?
                                    <img
                                        src={mTask?.requestTask?.image}  // Placeholder for the image
                                        alt="MachineBefore"
                                        className="w-full h-full object-cover"

                                    /> :
                                    <NoPhotoIcon className="w-full h-full object-cover" />}
                            </div>

                            <div
                                className="relative w-72 h-48 border rounded-lg overflow-hidden hover:cursor-pointer hover:opacity-80 active:transform active:scale-95"
                                onClick={() => {
                                    setShowPicAfter(true)
                                    document.getElementById('picture_after_modal').showModal()
                                }}
                            >
                                <p>After image</p>
                                {/* Image */}
                                {mTask?.image ?
                                    <img
                                        src={mTask?.image}  // Placeholder for the image
                                        alt="MachineAfter"
                                        className="w-full h-full object-cover"

                                    /> :
                                    <NoPhotoIcon className="w-full h-full object-cover" />}
                            </div>
                        </div>
                    </div>
                    {/* Check status and choose Buttons */}


                    {mTask?.status === "inReview" ?
                        <div className=' flex justify-between w-full max-w-5xl items-end'>
                            <Link className="btn btn-outline  w-[150px]" to="/maintenance-in-review">
                                Back
                            </Link>

                            <button
                                className="btn btn-secondary w-[150px] mt-4 "
                                onClick={() => {
                                    setShowConfirmAccept(true)
                                    document.getElementById('confirm_accept_finish_modal').showModal()
                                }}>
                                Accept
                            </button>
                        </div>
                        :
                        <div className=' flex justify-end w-full max-w-5xl items-end'>
                            <Link className="btn btn-outline  w-[150px]" to="/maintenance-success">
                                Back
                            </Link>
                        </div>
                    }

                
            </div>
        </div >



            {/* modal */ }


    {/* image before modal */ }
    <dialog id="picture_before_modal" className="modal" onClose={() => { setShowPicBefore(false) }}>
        <div className="modal-box">

            <button
                type='button'
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={e => e.target.closest('dialog').close()}
            >
                ✕
            </button>

            {showPicBefore && mTask?.requestTask?.image ?
                <img
                    src={mTask?.requestTask?.image}  // Placeholder for the image
                    alt="Machine"
                    className="w-full h-full object-cover"
                />
                :
                <NoPhotoIcon className="w-full h-full object-cover" />}
        </div>

    </dialog>

    {/* image after modal */ }
    <dialog id="picture_after_modal" className="modal" onClose={() => { setShowPicAfter(false) }}>
        <div className="modal-box">

            <button
                type='button'
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={e => e.target.closest('dialog').close()}
            >
                ✕
            </button>

            {showPicAfter && mTask?.image ?
                <img
                    src={mTask?.image}  // Placeholder for the image
                    alt="Machine"
                    className="w-full h-full object-cover"
                />
                :
                <NoPhotoIcon className="w-full h-full object-cover" />}
        </div>

    </dialog>



    {/* confirm accept */ }
    <dialog id="confirm_accept_finish_modal" className="modal" onClose={() => { setShowConfirmAccept(false) }}>
        <div className="modal-box">
            <button
                type='button'
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={e => e.target.closest('dialog').close()}
            >
                ✕
            </button>
            {showConfirmAccept &&
                <div>
                    <h3 className="font-bold text-lg text-info">Are you sure to accept this task?</h3>
                    <div className="modal-action">
                        <button
                            className="btn btn-info btn-outline"
                            onClick={async () => {
                                await handleAccept()
                                await handleAllSuccess()
                                document.getElementById('confirm_accept_finish_modal').close()
                            }}>
                            Accept
                        </button>
                    </div>
                </div>
            }
        </div>
    </dialog>

    {/* confirm reject */ }
    <dialog id="confirm_reject_mTask_modal" className="modal" onClose={() => { setShowConfirmReject(false) }}>
        <div className="modal-box">
            <button
                type='button'
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={e => e.target.closest('dialog').close()}
            >
                ✕
            </button>
            {showConfirmReject &&
                <div>
                    <h3 className="font-bold text-lg text-error">Are you sure to return this task to backlog?</h3>
                    <div className="modal-action flex-col gap-2 items-center">
                        <form className='w-full '>
                            <p className='font-bold text-error'> Reject Reason</p>
                            <textarea
                                name="rejectReason"
                                value={rejectReason}
                                className="textarea textarea-bordered w-full mt-2 "
                                placeholder="Reason for reject"
                                onChange={(e) => setRejectReason(e.target.value)}
                                rows={rejectReason.split('\n').length}
                            />
                        </form>
                        <div className='w-full flex justify-end mt-2'>
                            <button
                                className="btn btn-error btn-outline w-[150px] "
                                onClick={() => {
                                    handleReject()
                                    document.getElementById('confirm_reject_mTask_modal').close()
                                }}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    </dialog>
        </>
    )

}

export default ShowTaskInReview