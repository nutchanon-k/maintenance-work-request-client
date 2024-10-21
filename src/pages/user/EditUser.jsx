import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CloseIcon, UploadIcon } from '../../icons/Icons';
import useUserStore from '../../store/UserStore';
import { toast } from 'react-toastify';
import LoadingBlack from '../../assets/LoadingBlack.json';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2'

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = useUserStore((state) => state.currentUser);
  const token = useUserStore((state) => state.token);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  const resetCurrentUser = useUserStore((state) => state.resetCurrentUser);
  const locationData = useUserStore((state) => state.locationData);
  const departmentData = useUserStore((state) => state.departmentData);
  const updateUser = useUserStore((state) => state.updateUser);
  const getLocationAndDepartmentData = useUserStore((state) => state.getLocationAndDepartmentData);

  const [selectLocation, setSelectLocation] = useState('');
  const [selectDepartment, setSelectDepartment] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldImage, setOldImage] = useState(null);
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkId = async () => {
      const result = await getCurrentUser(token, id);
      if (result?.length == 0 || !result) {
        navigate('/not-found');
      }
    };
    checkId();
    getLocationAndDepartmentData(token);
  }, [id]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      password: '',
      locationId: currentUser?.locationId,
      departmentId: currentUser?.departmentId,
      role: currentUser?.role,
      level: currentUser?.level
    }));
    setOldImage(currentUser?.picture);
    setSelectLocation(currentUser?.locationId);
  }, [currentUser]);

  useEffect(() => {
    const filteredDepartments = departmentData.filter((item) => Number(item.locationId) === Number(selectLocation));
    setSelectDepartment(filteredDepartments);
  }, [selectLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateFormData = () => {
    let formErrors = {};
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (formData.password && formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.locationId) {
      formErrors.locationId = 'Location is required';
    }
    if (!formData.departmentId) {
      formErrors.departmentId = 'Department is required';
    }
    if (!formData.role) {
      formErrors.role = 'Role is required';
    }
    if (!formData.level) {
      formErrors.level = 'Level is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      Swal.fire({
        icon: "error",
        title: "Something wrong",
        text: "Please check your form again",
        footer: "please try again"
      });
      return;
    }
    try {
      setLoading(true);
      const body = new FormData();
      body.append("firstName", formData.firstName.trim());
      body.append("lastName", formData.lastName.trim());
      body.append("email", formData.email.trim());
      body.append("locationId", formData.locationId);
      body.append("departmentId", formData.departmentId);
      body.append("role", formData.role);
      body.append("level", formData.level);
      if (formData.password) {
        body.append("password", formData.password);
      }
      if (image) {
        body.append("picture", image);
      }
      const result = await updateUser(token, body, id);
      if (result) {
        navigate('/manage-users');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className='flex justify-between p-4'>
        <div className='text-xl p-2 flex items-baseline gap-2'>
          <Link to="/manage-users" className="text-3xl">
            Manage User
          </Link>
          <h1>{'>'}</h1>
          <Link to={`/show-user/${id}`} className="text-2xl">
            {`User ID ${id} >`}
          </Link>
          <div className="text-lg">
            Edit User
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
          {['firstName', 'lastName', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="label">
                <span className="label-text">{field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span></span>
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                name={field}
                placeholder="input here"
                className={`input input-bordered w-full ${errors[field] ? 'border-red-500' : formData[field] && 'border-green-500'}`}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
            </div>
          ))}

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text">Location <span className="text-red-500">*</span></span>
            </label>
            <select
              name="locationId"
              className={`select select-bordered w-full ${errors.locationId ? 'border-red-500' : formData.locationId && 'border-green-500'}`}
              value={formData.locationId}
              onChange={(e) => {
                handleChange(e);
                setSelectLocation(e.target.value);
              }}
            >
              <option value="" disabled>Select Location</option>
              {locationData.map((el) => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))}
            </select>
            {errors.locationId && <p className="text-red-500 text-xs">{errors.locationId}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="label">
              <span className="label-text">Department <span className="text-red-500">*</span></span>
            </label>
            <select
              name="departmentId"
              className={`select select-bordered w-full ${errors.departmentId ? 'border-red-500' : formData.departmentId && 'border-green-500'}`}
              value={formData.departmentId}
              onChange={handleChange}
            >
              <option value="" disabled>Select Department</option>
              {selectDepartment.map((el) => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-500 text-xs">{errors.departmentId}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="label">
              <span className="label-text">Role <span className="text-red-500">*</span></span>
            </label>
            <select
              name="role"
              className={`select select-bordered w-full ${errors.role ? 'border-red-500' : formData.role && 'border-green-500'}`}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">admin</option>
              <option value="maintenance">maintenance</option>
              <option value="requester">requester</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
          </div>

          {/* Level */}
          <div>
            <label className="label">
              <span className="label-text">Level <span className="text-red-500">*</span></span>
            </label>
            <select
              name="level"
              className={`select select-bordered w-full ${errors.level ? 'border-red-500' : formData.level && 'border-green-500'}`}
              value={formData.level}
              onChange={handleChange}
            >
              <option value="" disabled>Select Level</option>
              <option value="manager">manager</option>
              <option value="leader">leader</option>
              <option value="staff">staff</option>
            </select>
            {errors.level && <p className="text-red-500 text-xs">{errors.level}</p>}
          </div>

          {/* Upload Image */}
          <div className="col-span-2 form-control">
            <label className="label">
              <span className="label-text font-semibold">Upload image</span>
            </label>
            <div className="flex items-center justify-center w-full">
              <div
                className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                onClick={() => document.getElementById('input-profile-picture').click()}
              >
                {!image && oldImage && (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img src={oldImage} className="w-1/2 h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  id="input-profile-picture"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <div className="w-full absolute top-1 right-1 flex justify-end">
                    <CloseIcon
                      className="w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('input-profile-picture').value = '';
                        setImage(null);
                      }}
                    />
                  </div>
                )}
                {image && <img src={URL.createObjectURL(image)} className="w-1/2 h-full object-cover" />}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-6 h-full">
              <Lottie animationData={LoadingBlack} loop={true} className="w-20 h-20" />
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <Link to={`/show-user/${id}`} className="btn btn-outline w-[150px]">Back</Link>
              <button type="submit" className="btn btn-primary w-[150px]">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUser;
