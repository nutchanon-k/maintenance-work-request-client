import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import { NoPhotoIcon } from '../../icons/Icons'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'

const ShowUserDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log("id from params", id)



  const currentUser = useUserStore((state) => state.currentUser)
  const token = useUserStore((state) => state.token)
  const getCurrentUser = useUserStore((state) => state.getCurrentUser)
  const deleteUser = useUserStore((state) => state.deleteUser)
  const resetCurrentUser = useUserStore((state) => state.resetCurrentUser)


  const [isOpen, setIsOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const checkId = async () => {
      const result = await  getCurrentUser(token, id)
      if(result?.length == 0 || !result){
        navigate('/not-found')
      }
    }
    checkId()
  }, [id])

  console.log(currentUser)
  const handleDelete = async () => {
    try{
    const result = await deleteUser(token, currentUser.id);
    resetCurrentUser();
    toast.info(`User ID ${currentUser.id} deleted successfully`);
    navigate('/manage-users')
  }catch(error){
    console.log(error)
  }
};


  return (
    <>
      <div className='flex flex-col  '>
        {/* header */}
        <div className='flex justify-between p-4 '>
          <div className='text-xl p-2 flex items-baseline gap-2  '>
            <Link to="/manage-users" className="text-3xl">
              Manage User
            </Link>
            <h1>{">"}</h1>
            <div className="text-xl">
              {`User ID  ${id}`}
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 w-full max-w-5xl">
            <div className="flex justify-between w-full max-w-5xl">
              <div className="w-1/2 space-y-4">
                <span className="badge badge-success">{currentUser?.role}</span>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>ID: </strong> {currentUser?.id}
                  </p>
                  <p className="text-sm">
                    <strong>Name: </strong> {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-sm">
                    <strong>E-mail: </strong> {currentUser?.email}
                  </p>
                  <p className="text-sm">
                    <strong>Level: </strong> {currentUser?.level}
                  </p>
                  <p className="text-sm">
                    <strong>Department.: </strong> {currentUser?.department?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Department Type.: </strong> {currentUser?.department?.departmentType}
                  </p>
                  <p className="text-sm">
                    <strong>Location: </strong> {currentUser?.location?.name}
                  </p>

                </div>
              </div>
              <div className="w-1/2 flex flex-col items-end space-y-4 ">
                <button
                  className="btn btn-outline btn-error w-[150px]  "
                  onClick={() => {
                    setShowConfirm(true)
                    document.getElementById('confirm_delete_user_modal').showModal()
                  }}
                >
                  Delete User
                </button>
                <div
                  className="relative w-100 h-60 border rounded-lg overflow-hidden hover:cursor-pointer hover:opacity-80 active:transform active:scale-95"
                  onClick={() => {
                    setIsOpen(true)
                    document.getElementById('picture_modal').showModal()
                  }}
                >
                  {/* Image */}
                  {currentUser?.picture ? <img
                    src={currentUser?.picture}  // Placeholder for the image
                    alt="user"
                    className="w-full h-full object-cover"

                  /> :
                    <NoPhotoIcon className="w-full h-full object-cover" />
                  }
                </div>
              </div>
            </div>
          </div>


          <div className=' flex justify-between w-full max-w-5xl px-6'>
            {/* Back button */}
            <Link to={'/manage-users'} className="btn btn-outline w-[150px] mt-4" >
              Back
            </Link>

            {/* Edit button */}
            <Link to={`/edit-user/${id}`} className="btn btn-secondary w-[150px] mt-4 " >
              Edit
            </Link>
          </div>
        </div>

      </div>
      <dialog id="picture_modal" className="modal" onClose={() => { setIsOpen(false) }}>
        <div className="modal-box">

          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>

          {isOpen && currentUser?.picture ?
            <img
              src={currentUser?.picture}  // Placeholder for the image
              alt="user"
              className="w-full h-full object-cover"
            />
            :
            <NoPhotoIcon className="w-full h-full object-cover" />}
        </div>
      </dialog>
      <dialog id="confirm_delete_user_modal" className="modal" onClose={() => { setShowConfirm(false) }}>
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
              <h3 className="font-bold text-lg text-error">Are you sure to delete this User?</h3>
              <div className="modal-action">
                <button
                  className="btn btn-error btn-outline"
                  onClick={() => {
                    handleDelete()
                    document.getElementById('confirm_delete_user_modal').close()
                  }}>
                  Delete
                </button>
              </div>
            </div>
          }
        </div>
      </dialog>
    </>
  )
}

export default ShowUserDetails