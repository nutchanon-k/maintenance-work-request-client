import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CloseIcon, UploadIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';
import { toast } from 'react-toastify';



const CreateUser = () => {
    const navigate = useNavigate()

    const token = useUserStore((state) => state.token)
    const locationData = useUserStore((state) => state.locationData)
    const departmentData = useUserStore((state) => state.departmentData)
    const getLocationAndDepartmentData = useUserStore((state) => state.getLocationAndDepartmentData)
    const createUser = useUserStore((state) => state.createUser)

    const [selectLocation, setSelectLocation] = useState('')
    const [selectDepartment, setSelectDepartment] = useState([])
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        locationId: '',
        departmentId: '',
        role: '',
        level: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getLocationAndDepartmentData(token)
    }, [])
    console.log(image)

    // เก็บข้อมูลใน state เพิ่อ filter department ตาม location
    useEffect(() => {
        const filteredDepartments = departmentData.filter((item) => Number(item.locationId) === Number(selectLocation));
        setSelectDepartment(filteredDepartments);
    }, [selectLocation]);


    // console.log(locationData)
    // console.log(departmentData)
    // console.log(selectLocation)
    // console.log(selectDepartment)



    console.log(formData)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Password and Confirm Password do not match.');
            return;
        }
        try {
            setLoading(true)
            const body = new FormData();
            body.append("firstName", (formData.firstName).trim());
            body.append("lastName", (formData.lastName).trim());
            body.append("email",  (formData.email).trim());
            body.append("password", formData.password);
            body.append("confirmPassword", formData.confirmPassword);
            body.append("locationId", formData.locationId);
            body.append("departmentId", formData.departmentId);
            body.append("role", formData.role);
            body.append("level", formData.level);

            if (image) {
                body.append("picture", image)
            }
            for (let [key, value] of body.entries()) {
                console.log(key, value)
            }
            const result = await createUser(token, body)

            toast.success(result.data.message)
            navigate('/manage-users')

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex flex-col  '>

            {/* header */}
            <div className='flex justify-between p-4 '>
                <div className='text-3xl p-2 flex items-baseline gap-2  '>
                    <Link to="/manage-users" className="text-3xl">
                        Manage User
                    </Link>
                    <h1>{">"}</h1>
                    <div to="/create-request-task" className="text-lg">
                        Create New Request
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
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Confirm password <span className='text-red-500'>*</span></span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="input here"
                            className="input input-bordered w-full"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage && (
                        <p className="text-red-500 text-xs">{errorMessage}</p>
                    )}
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
                    </div>
                    {loading ?
                        <div className="flex justify-center mt-6">
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                        :
                        <div className='flex w-full justify-between'>
                            <Link to={"/manage-users"} className="btn btn-outline w-[150px]">Back</Link>
                            <button type="submit" className="btn btn-primary w-[150px]">Submit</button>
                        </div>
                        }
                </form>
            </div>
        </div>
    );

}

export default CreateUser