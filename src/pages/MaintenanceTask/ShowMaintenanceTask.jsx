import React, { useEffect, useState } from 'react'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import useUserStore from '../../store/UserStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NoPhotoIcon } from '../../icons/Icons'
import RequestDetails from '../../components/RequestDetails'
import Swal from 'sweetalert2'



const ShowMaintenanceTask = () => {
  const navigate = useNavigate()
  const { id } = useParams()


  {/* store */ }
  const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
  const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
  const resetCurrentMaintenanceTask = useMaintenanceTaskStore(state => state.resetCurrentMaintenanceTask)
  const token = useUserStore(state => state.token)
  const deleteMaintenanceTask = useMaintenanceTaskStore(state => state.deleteMaintenanceTask)
  const updateMaintenanceTask = useMaintenanceTaskStore(state => state.updateMaintenanceTask)
  const user = useUserStore(state => state.user)

  {/* state */ }
  const [mTask, setMTask] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showConfirmAccept, setShowConfirmAccept] = useState(false)
  const [showConfirmReturn, setShowConfirmReturn] = useState(false)
  const [note, setNote] = useState('')


  useEffect(() => {
    const checkId = async () => {
      try {
        const result = await getMaintenanceTask(token, id)
        console.log(result)
        if (result.length == 0 || !result) {
          navigate('/not-found')
        }
        // setMTask(result[0])
        // setNote(result[0]?.note)

      } catch (error) {
        console.log(error)
      }
    }
    checkId()
  }, [])


  useEffect(() => {
    if (currentMaintenanceTask && currentMaintenanceTask?.length > 0) {
      setMTask(currentMaintenanceTask[0])
      setNote(currentMaintenanceTask[0]?.note)
    }

  }, [currentMaintenanceTask])

  console.log(currentMaintenanceTask)


  const handleAccept = async () => {
    const response = await updateMaintenanceTask(token, { status: 'inProgress' }, mTask.id)
    toast.success(response.data.message)
    navigate('/maintenance-in-progress')
    console.log('Accept Request');
  };

  const handleBack = () => {
    resetCurrentMaintenanceTask();
    console.log('Back');
  };

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
              const result = await deleteMaintenanceTask(token, mTask.id);
                if (result) {
                  resetCurrentMaintenanceTask();
                  navigate('/maintenance-backlog')
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
  }



  const handleReturn = async () => {
    try {
      const result = await updateMaintenanceTask(token, { status: 'backlog', note: note }, mTask.id)
      toast.success(result.data.message)
      navigate('/maintenance-backlog')
      console.log('Return Request');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col  '>
        {/* header */}
        <div className='flex justify-between p-4 '>
          <div className='text-3xl p-2 flex items-baseline gap-2  '>
            <h1>{"Maintenance Task >"}</h1>
            {mTask?.status === "backlog" ?
              <Link to="/maintenance-backlog" className="text-xl">
                Backlog
              </Link>
              :
              <Link to="/maintenance-in-progress" className="text-xl">
                In Progress
              </Link>
            }
            <h1>{">"}</h1>
            <div className="text-lg">
              {`Maintenance Task ID  ${mTask?.id}`}
            </div>
          </div>
        </div>


        {/* body */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 min-h-screen">
          <div className="flex justify-between w-full max-w-5xl">

            {/* Left section - Request details */}
            <RequestDetails mTask={mTask} />


            {/* Right section - Image and buttons */}
            <div className="w-1/2 flex flex-col items-end space-y-4">

              {/* Delete or Return button */}
              {
                mTask?.status === "backlog" && user?.role !== "requester" && (user?.role === "maintenance"  || user?.role === "admin") && (user?.level !== "staff" || user?.role === "admin") ?
                  <button
                    className="btn btn-outline btn-error w-[150px]  "
                    onClick={handleDelete}
                  >
                    Delete Task
                  </button>
                  :
                  mTask?.status === "inProgress" && user?.role !== "requester" ?
                  <button
                    className="btn btn-outline btn-error w-[200px]  "
                    onClick={() => {
                      setShowConfirmReturn(true)
                      document.getElementById('confirm_return_mTask_modal').showModal()
                    }}
                  >
                    Return Task to Backlog
                  </button>
                  :
                  <></>
              }

              {/*image */}
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



          {/* Check role,status  for choose Buttons */}
          {user?.role === "requester" && mTask?.status === "backlog" ?
            <div className=' flex justify-end w-full max-w-5xl'>
              {/* Back button */}
              <Link to={'/maintenance-backlog'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                Back
              </Link>
            </div>
            :
            user?.role === "requester" && mTask?.status === "inProgress" ?
              <div className=' flex justify-end w-full max-w-5xl'>
                {/* Back button */}
                <Link to={'/maintenance-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                  Back
                </Link>
              </div>
              :
              mTask?.status === "backlog" ?
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
                :
                <div className=' flex justify-between w-full max-w-5xl'>
                  {/* Back button */}
                  <Link to={'/maintenance-in-progress'} className="btn btn-outline w-[150px] mt-4" onClick={handleBack}>
                    Back
                  </Link>
                  {/* Accept button */}
                  <Link
                    className="btn btn-secondary w-[150px] mt-4 "
                    to={`/finish-work-form/${mTask?.id}`}>
                    Finished Work
                  </Link>
                </div>
          }
        </div>
      </div >



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

      {/* confirm return */}
      <dialog id="confirm_return_mTask_modal" className="modal" onClose={() => { setShowConfirmReturn(false) }}>
        <div className="modal-box">
          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          {showConfirmReturn &&
            <div>
              <h3 className="font-bold text-lg text-warning">Are you sure to return this task to backlog?</h3>
              <div className="modal-action flex-col gap-2 items-center">
                <form className='w-full'>
                  <p className='font-bold text-warning'> Note</p>
                  <textarea
                    name="note"
                    value={note}
                    className="textarea textarea-bordered w-full"
                    placeholder="Reason for return"
                    onChange={(e) => setNote(e.target.value)}
                    rows={note.split('\n').length}
                  />
                </form>
                <button
                  className="btn btn-warning btn-outline w-[200px]"
                  onClick={() => {
                    handleReturn()
                    document.getElementById('confirm_return_mTask_modal').close()
                  }}>
                  return
                </button>
              </div>
            </div>
          }
        </div>
      </dialog>
    </>
  )
}

export default ShowMaintenanceTask