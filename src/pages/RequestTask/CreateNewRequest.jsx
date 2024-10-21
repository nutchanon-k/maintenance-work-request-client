import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';
import { getDataMachine } from '../../api/RequestTask';
import { toast } from 'react-toastify';
import { CloseIcon, UploadIcon } from '../../icons/Icons';
import useRequestTaskStore from '../../store/RequestTaskStore';
import LoadingBlack from '../../assets/LoadingBlack.json';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';

const CreateNewRequest = () => {
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);
    const token = useUserStore(state => state.token);
    const createNewRequest = useRequestTaskStore(state => state.createRequestTask);

    const [machineId, setMachineId] = useState('');
    const [faultSymptoms, setFaultSymptoms] = useState('');
    const [image, setImage] = useState(null);
    const [machineData, setMachineData] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateFormData = () => {
        let formErrors = {};
        if (!machineId.trim()) {
            formErrors.machineId = 'Machine ID is required';
        }
        if (!faultSymptoms.trim()) {
            formErrors.faultSymptoms = 'Fault symptoms are required';
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
                text:  "Please check your form again",
                footer: "please try again"
              });
            return;
        }

        try {
            setLoading(true);
            const body = new FormData();
            body.append("machineId", machineId);
            body.append("faultSymptoms", faultSymptoms);
            body.append("employeeId", user.id);
            body.append("departmentId", machineData.departmentId);
            if (image) {
                body.append("image", image);
            }

            const result = await createNewRequest(token, body);
            if (result) {
                navigate('/request-in-progress');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleMachineIdChange = async (e) => {
        setMachineId(e.target.value);
        setMachineData('');
        setErrors({ ...errors, machineId: '' });
    };

    // ดึงข้อมูลเครื่องจักรมาจาก API
    useEffect(() => {
        if (machineId) {
            const result = setTimeout(async () => {
                await getDataMachine(token, machineId)
                    .then((res) => {
                        setMachineData(res.data.data);
                    })
                    .catch((err) => {
                        console.log("from catch", err);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err.response.data.message,
                            footer: "please try again"
                        });
                    });
            }, 500);
            return () => clearTimeout(result);
        }
    }, [machineId]);

    return (
        <div className='flex flex-col'>

            {/* header */}
            <div className='flex justify-between p-4'>
                <div className='text-3xl p-2 flex items-baseline gap-2'>
                    <h1>{"Request Task >"}</h1>
                    <Link to="/request-in-progress" className="text-xl">
                        In Progress
                    </Link>
                    <h1>{">"}</h1>
                    <Link to="/create-request-task" className="text-lg">
                        Create New Request
                    </Link>
                </div>
            </div>

            {/* form data */}
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg w-1/2 mx-auto">
                    <div className="grid grid-cols-2 gap-4">

                        {/* Machine Id */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Machine ID <span className='text-red-500'>*</span></span>
                            </label>
                            <input
                                type="text"
                                name='machineId'
                                onChange={handleMachineIdChange}
                                className={`input input-bordered w-full ${errors.machineId ? 'border-red-500' : machineId && 'border-green-500'}`}
                                placeholder="Enter machine serial number"
                            />
                            {errors.machineId && <p className="text-red-500 text-xs">{errors.machineId}</p>}
                        </div>

                        {/* Machine Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Machine name <span className='text-red-500'>*</span></span>
                            </label>
                            <input
                                type="text"
                                value={machineData ? machineData.name : ''}
                                className="input input-bordered w-full"
                                placeholder="Machine Name"
                                required
                                disabled
                            />
                        </div>

                        {/* Factory */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Factory <span className='text-red-500'>*</span></span>
                            </label>
                            <input
                                type="text"
                                value={machineData ? machineData.location.name : ''}
                                className="input input-bordered w-full"
                                placeholder="Factory"
                                required
                                disabled
                            />
                        </div>

                        {/* Department */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Department <span className='text-red-500'>*</span></span>
                            </label>
                            <input
                                type="text"
                                value={machineData ? machineData.department.name : ''}
                                className="input input-bordered w-full"
                                placeholder="Division"
                                required
                                disabled
                            />
                        </div>

                        {/* Machine Observations/Fault Symptoms */}
                        <div className="col-span-2 form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Machine observations / Fault symptoms *</span>
                            </label>
                            <textarea
                                value={faultSymptoms}
                                onChange={(e) => {
                                    setFaultSymptoms(e.target.value);
                                    setErrors({ ...errors, faultSymptoms: '' });
                                }}
                                className={`textarea textarea-bordered w-full ${errors.faultSymptoms ? 'border-red-500' : faultSymptoms && 'border-green-500'}`}
                                placeholder="Enter observations or fault symptoms"
                                
                                rows={faultSymptoms.split('\n').length}
                            ></textarea>
                            {errors.faultSymptoms && <p className="text-red-500 text-xs">{errors.faultSymptoms}</p>}
                        </div>

                        {/* Upload Image */}
                        <div className="col-span-2 form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Upload image</span>
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <div
                                    className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                                    onClick={() => document.getElementById('input-file').click()}
                                >
                                    {!image && (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="text-sm text-gray-400">Click to upload</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id='input-file'
                                        className="hidden"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <div className='w-full absolute top-1 right-1 flex justify-end'>
                                        {image && (
                                            <CloseIcon
                                                className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById('input-file').value = '';
                                                    setImage(null);
                                                }}
                                            />
                                        )}
                                    </div>
                                    {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    {loading ? (
                        <div className="flex justify-center items-center mt-6 h-full">
                            <Lottie animationData={LoadingBlack} loop={true} className='w-20 h-20' />
                        </div>
                    ) : (
                        <div className="flex justify-between mt-6">
                            <Link to="/request-in-progress" className="btn btn-outline btn-error w-[150px]">
                                Cancel
                            </Link>
                            <button type="submit" className="btn btn-secondary w-[150px]">
                                Submit
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateNewRequest;
