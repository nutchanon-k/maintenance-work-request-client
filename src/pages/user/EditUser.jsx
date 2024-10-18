import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CloseIcon, UploadIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';
import { toast } from 'react-toastify';
import LoadingAnimation from '../../assets/LoadingAnimation.json';
import LoadingCircleAnimation from '../../assets/LoadingCircleAnimation.json';
import LoadingBlack from '../../assets/LoadingBlack.json';
import Lottie from 'lottie-react'
const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const currentUser = useUserStore((state) => state.currentUser)
  const token = useUserStore((state) => state.token)
  const getCurrentUser = useUserStore((state) => state.getCurrentUser)
  const resetCurrentUser = useUserStore((state) => state.resetCurrentUser)
  const locationData = useUserStore((state) => state.locationData)
  const departmentData = useUserStore((state) => state.departmentData)
  const updateUser = useUserStore((state) => state.updateUser)
  const getLocationAndDepartmentData = useUserStore((state) => state.getLocationAndDepartmentData)


  const [selectLocation, setSelectLocation] = useState('')
  const [selectDepartment, setSelectDepartment] = useState([])
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [oldImage, setOldImage] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    locationId: '',
    departmentId: '',
    role: '',
    level: '',
  });

  // console.log(currentUser.locationId)
  console.log(selectDepartment)
  useEffect(() => {
    const checkId = async () => {
      
      const result = await  getCurrentUser(token, id)
      if(result?.length == 0 || !result){
        navigate('/not-found')
      }
    
    }
    checkId()
    getLocationAndDepartmentData(token)
  }, [id])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      password: currentUser?.password,
      locationId: currentUser?.locationId,
      departmentId: currentUser?.departmentId,
      role: currentUser?.role,
      level: currentUser?.level
    }))
    setOldImage(currentUser?.picture)
    setSelectLocation(currentUser?.locationId)
  }, [currentUser])

  useEffect(() => {
    const filteredDepartments = departmentData.filter((item) => Number(item.locationId) === Number(selectLocation));
    setSelectDepartment(filteredDepartments);
  }, [selectLocation]);

  // console.log(image)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const body = new FormData();
      body.append("firstName", (formData.firstName).trim());
      body.append("lastName", (formData.lastName).trim());
      body.append("email", (formData.email).trim());
      body.append("locationId", formData.locationId);
      body.append("departmentId", formData.departmentId);
      body.append("role", formData.role);
      body.append("level", formData.level);
      if (formData.password) {
        body.append("password", formData.password);
      }
      if (image) {
        body.append("picture", image)
      }
      for (let [key, value] of body.entries()) {
        console.log(key, value)
      }
      const result = await updateUser(token, body, id)

      toast.success(result.data.message)
      navigate('/manage-users')

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };



  // console.log(currentUser)
  return (
    <>
      {
        loading ?
          <div className="flex justify-center items-center mt-6 h-full">
            <Lottie animationData={LoadingAnimation} loop={true} />
          </div>
          :
          <>
            <div className='flex flex-col  '>

              {/* header */}
              <div div className='flex justify-between p-4 '>
                <div className='text-xl p-2 flex items-baseline gap-2  '>
                  <Link to="/manage-users" className="text-3xl">
                    Manage User
                  </Link>
                  <h1>{">"}</h1>
                  <Link to={`/show-user/${id}`} className="text-2xl">
                    {`User ID  ${id} >`}
                  </Link>
                  <div className="text-lg">
                    Edit User
                  </div>
                </div>
              </div>

              {/* form data */}
              <div className="flex justify-center items-center py-4 ">
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">First name <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="input here"
                      className="input input-bordered w-full"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Last name <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="input here"
                      className="input input-bordered w-full "
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Email <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="input here"
                      className="input input-bordered w-full"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Password <span className='text-red-500'>*</span></span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="input here"
                      className="input input-bordered w-full"
                      value={formData.password}
                      onChange={handleChange}

                    />
                  </div>



                  <div>
                    <label className="label">
                      <span className="label-text">Location <span className='text-red-500'>*</span></span>
                    </label>
                    <select
                      name="locationId"
                      className="select select-bordered w-full"
                      value={formData.locationId}
                      onChange={(e) => {
                        handleChange(e)
                        setSelectLocation(e.target.value)

                      }}
                      required
                    >
                      <option value="" disabled>Select Location</option>
                      {locationData.map((el) => (<option key={el.id} value={el.id}>{el.name}</option>))}


                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Department <span className='text-red-500'>*</span></span>
                    </label>
                    <select
                      name="departmentId"
                      className="select select-bordered w-full"
                      value={formData.departmentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Department</option>
                      {selectDepartment.map((el) => (<option key={el.id} value={el.id}>{el.name}</option>))}

                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Role <span className='text-red-500'>*</span></span>
                    </label>
                    <select
                      name="role"
                      className="select select-bordered w-full"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Role</option>
                      <option value="admin">admin</option>
                      <option value="maintenance">maintenance</option>
                      <option value="requester">requester</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Level <span className='text-red-500'>*</span></span>
                    </label>
                    <select
                      name="level"
                      className="select select-bordered w-full"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Level</option>
                      <option value="manager">manager</option>
                      <option value="leader">leader</option>
                      <option value="staff">staff</option>
                    </select>
                  </div>

                  {/* Upload Image */}
                  <div className="col-span-2 form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Upload image</span>
                    </label>
                    {oldImage ?
                      <div className="flex items-center justify-center w-full  ">
                        <div
                          className="flex flex-col items-center justify-center w-full  border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                          onClick={() => document.getElementById('input-file').click()}
                        >
                          <input
                            type="file"
                            id='input-file-picture'
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <div className='w-full absolute top-1 right-1  flex justify-end'>
                            {oldImage && <CloseIcon
                              className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                              onClick={(e) => {
                                e.stopPropagation()
                                document.getElementById('input-file-picture').value = '';
                                setOldImage(null)
                              }}
                            />}

                          </div>
                          {oldImage && <img src={oldImage} className='w-1/2 h-full object-cover' />}
                        </div>
                      </div>

                      :
                      <div className="flex items-center justify-center w-full  ">
                        <div
                          className="flex flex-col items-center justify-center w-full  border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                          onClick={() => document.getElementById('input-profile-picture').click()}
                        >
                          {!image && <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="text-sm text-gray-400">Click to upload</p>
                          </div>}
                          <input
                            type="file"
                            id='input-profile-picture'
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <div className='w-full absolute top-1 right-1  flex justify-end'>
                            {image && <CloseIcon
                              className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                              onClick={(e) => {
                                e.stopPropagation()
                                document.getElementById('input-profile-picture').value = '';
                                setImage(null)
                              }}
                            />}

                          </div>
                          {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}

                        </div>
                      </div>
                    }
                  </div>
                  <div className='flex w-full justify-between'>
                    <Link to={`/show-user/${id}`} className="btn btn-outline w-[150px]">Back</Link>
                    <button type="submit" className="btn btn-primary w-[150px]">Submit</button>
                  </div>
                </form>
              </div>
            </div >
          </>
      }
    </>
  );
}

export default EditUser

// {
//   loading ?
//     <div className="flex justify-center mt-6">
//       <Lottie animationData={LoadingCircleAnimation} loop={true} />
//     </div>
//     :

// }