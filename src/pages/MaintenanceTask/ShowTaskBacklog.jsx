import React, { useEffect, useState } from 'react'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import useUserStore from '../../store/UserStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NoPhotoIcon } from '../../icons/Icons'
// import CardMaintenance from '../../components/Card'







const ShowTaskBacklog = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log("id from params", id)


  const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
  const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
  const resetCurrentMaintenanceTask = useMaintenanceTaskStore(state => state.resetCurrentMaintenanceTask)
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  const deleteMaintenanceTask = useMaintenanceTaskStore(state => state.deleteMaintenanceTask)


  const [mTask, setMTask] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showConfirmAccept, setShowConfirmAccept] = useState(false)


  const location = mTask?.requestTask?.machine?.location?.name
  const typeOfFailure = mTask?.typeOfFailure?.details

  useEffect(() => {
     getMaintenanceTask(token,id)    
  }, [])

  
  useEffect(() => {
    if (currentMaintenanceTask) {
      setMTask(currentMaintenanceTask[0])
    }
  }, [currentMaintenanceTask])

  


  const translateTime = (time) => {
    const isoDate = time
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      hour12: false, // แสดงเวลาแบบ 24 ชั่วโมง
    });
    return formattedDate
  }

  const handleAccept = () => {
    

    console.log('Accept Request');
  };

  const handleBack = () => {
    resetCurrentMaintenanceTask();
    console.log('Back');
  };

  const handleDelete = async () => {
    try {
      const result = await deleteMaintenanceTask(token, mTask.id);
      resetCurrentMaintenanceTask();
      navigate('/maintenance-backlog')

    } catch (error) {
      console.log(error)
    }
    console.log("delete")
  };




  return (
    <>
      <div className='flex flex-col  '>
        {/* header */}
        <div className='flex justify-between p-4 '>
          <div className='text-3xl p-2 flex items-baseline gap-2  '>
            <h1>{"Maintenance Task >"}</h1>
            <Link to="/maintenance-backlog" className="text-xl">
              Backlog
            </Link>
            <h1>{">"}</h1>
            <div className="text-lg">
              {`Maintenance Task ID  ${mTask?.id}`}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 min-h-screen">
          <div className="flex justify-between w-full max-w-5xl">

            {/* Left section - Request details */}
            <div className="w-1/2 space-y-4">
              <div className='flex gap-2'>
                {location === "Factory1" ? <div className="badge badge-primary badge-outline">{location}</div> : <div className="badge badge-warning badge-outline">{location}</div>}
                {typeOfFailure === "Mechanical" ? <div className="badge badge-primary">{typeOfFailure}</div> : typeOfFailure === "Electrical" ? <div className="badge badge-secondary">{typeOfFailure}</div> : <div className="badge badge-info">{typeOfFailure}</div>}
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Request ID: </strong> {mTask?.req} {mTask?.requestId}
                </p>
                <p className="text-sm">
                  <strong>Request by: </strong> {mTask?.requestTask?.employee?.firstName} {mTask?.requestTask?.employee?.lastName}
                </p>
                <p className="text-sm">
                  <strong>Requested Time: </strong> {translateTime(mTask?.requestTask?.requestTime)}
                </p>
                <p className="text-sm">
                  <strong>Updated Time: </strong> {translateTime(mTask?.requestTask?.updatedTime)}
                </p>
                <p className="text-sm">
                  <strong>Division: </strong> {mTask?.requestTask?.department?.name}
                </p>
                <p className="text-sm">
                  <strong>Machine ID.: </strong> {mTask?.machineId}
                </p>
                <p className="text-sm">
                  <strong>Machine name: </strong> {mTask?.requestTask?.machine?.name}
                </p>
                <p className="text-sm">
                  <strong>Machine observations: </strong> {mTask?.requestTask?.faultSymptoms}
                </p>
                <p className="text-sm">
                  <strong>Assigned to: </strong> {mTask?.employee?.firstName} {mTask?.employee?.lastName}
                </p>
              </div>
            </div>


            {/* Right section - Image and buttons */}
            <div className="w-1/2 flex flex-col items-end space-y-4">

              {/* Delete button */}
              <button
                className="btn btn-outline btn-error w-[150px]  "
                onClick={() => {
                  setShowConfirm(true)
                  document.getElementById('confirm_delete_mTask_modal').showModal()
                }}
              >
                Delete Task
              </button>
              <div
                className="relative w-72 h-48 border rounded-lg overflow-hidden hover:cursor-pointer hover:opacity-80 active:transform active:scale-95"
                onClick={() => {
                  setIsOpen(true)
                  document.getElementById('picture_backlog_modal').showModal()
                }}
              >
                {/* Image */}
                {mTask?.requestTask?.image ? <img
                  src={mTask?.requestTask?.image}  // Placeholder for the image
                  alt="Machine"
                  className="w-full h-full object-cover"

                /> :
                  <NoPhotoIcon className="w-full h-full object-cover" />}
              </div>
            </div>
          </div>
          {/* Check status and choose Buttons */}
          <div className=' flex justify-between w-full max-w-5xl'>

            {/* Back button */}
            <Link to={'/maintenance-backlog'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
              Back
            </Link>

            {/* Accept button */}
            <button
              className="btn btn-secondary w-[150px] mt-4 "
              onClick={() => {
                setShowConfirmAccept(true)
                document.getElementById('confirm_accept_mTask_modal').showModal()
              }}>
              Accept
            </button>
          </div>
        </div>
      </div>



      {/* modal */}


      {/* image modal */}
      <dialog id="picture_backlog_modal" className="modal" onClose={() => { setIsOpen(false) }}>
        <div className="modal-box">

          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>

          {isOpen && mTask?.requestTask?.image ?
            <img
              src={mTask?.requestTask?.image}  // Placeholder for the image
              alt="Machine"
              className="w-full h-full object-cover"
            />
            :
            <NoPhotoIcon className="w-full h-full object-cover" />}
        </div>

      </dialog>


      {/* confirm delete */}
      <dialog id="confirm_delete_mTask_modal" className="modal" onClose={() => { setShowConfirm(false) }}>
        <div className="modal-box">

          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>

          {showConfirm &&
            <div>
              <h3 className="font-bold text-lg text-error">Are you sure you want to delete this task?</h3>
              <div className="modal-action">
                <button
                  className="btn btn-error btn-outline"
                  onClick={() => {
                    handleDelete()
                    document.getElementById('confirm_delete_mTask_modal').close()
                  }}>
                  Delete
                </button>
              </div>
            </div>
          }
        </div>
      </dialog>

      
      {/* confirm accept */}
      <dialog id="confirm_accept_mTask_modal" className="modal" onClose={() => { setShowConfirmAccept(false) }}>
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
                  onClick={() => {
                    handleAccept()
                    document.getElementById('confirm_accept_mTask_modal').close()
                  }}>
                  Accept
                </button>
              </div>
            </div>
          }
        </div>
      </dialog>
    </>
  )
}

export default ShowTaskBacklog