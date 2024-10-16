import React, { useEffect, useState } from 'react'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import useUserStore from '../../store/UserStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CloseIcon, NoPhotoIcon, UploadIcon } from '../../icons/Icons'

const FinishWorkForm = () => {
    const [equipmentOption, setEquipmentOption] = useState('noEquipment');
   

    const handleEquipmentChange = (e) => {
        setEquipmentOption(e.target.value);
    };

            // requestId, 
            // employeeId, 
            // machineId, 
            // typeOfFailureId, 
            // typeOfRootCauseId,
            // rootCauseDetail,
            // operationDetails ,
            // preventingRecurrence,
            // equipmentUsed,
            // additionalSuggestions,
            // finishTime,
            // acceptTime,
            // isRejected,
            // rejectReason,
            // status,
            // note


    const navigate = useNavigate()
    const { id } = useParams()
    const token = useUserStore(state => state.token)
    const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
    const updateMaintenanceTask = useMaintenanceTaskStore(state => state.updateMaintenanceTask)
    const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
    const getTypeOfRootCauses = useMaintenanceTaskStore(state => state.getTypeOfRootCauses)
    const typeOfRootCauses = useMaintenanceTaskStore(state => state.typeOfRootCauses)


    const [data, setData] = useState({
        typeOfRootCauseId : null,
        rootCauseDetail : null,
        operationDetails : null,
        preventingRecurrence : null,
        equipmentUsed : null,
        additionalSuggestions : null,
        finishTime : new Date().toISOString()
    })
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [mTask, setMTask] = useState(null)
    // const [typeOfFailure, setTypeOfFailure] = useState(null)


    useEffect(() => {
        getMaintenanceTask(token, id)
    }, [])


    useEffect(() => {
        if (currentMaintenanceTask) {
            setMTask(currentMaintenanceTask[0])
            getTypeOfRootCauses(token, currentMaintenanceTask[0].typeOfFailureId, currentMaintenanceTask[0].requestTask.machine.machineTypeId)
        }
    }, [currentMaintenanceTask])



    console.log(data.finishTime)
    
    return (
        <div className='flex flex-col  '>
            {/* header */}
            <div className='flex justify-between p-4 '>
                <div className='text-3xl p-2 flex items-baseline gap-2  '>
                    <h1>{"Maintenance Task >"}</h1>
                    <Link to="/maintenance-in-progress" className="text-xl">
                        In Progress
                    </Link>
                    <h1>{">"}</h1>
                    <Link
                        to={`/show-maintenance-task/${mTask?.id}`}
                        className="text-lg">
                        {`Maintenance Task ID  ${mTask?.id}`}
                    </Link>
                    <p>{">"}</p>
                    <h1 className='text-xl'>
                        Finish Work
                    </h1>
                </div>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md w-[600px]">
                <h1 className="text-2xl font-bold mb-6">Maintenance Report</h1>
                <form className="space-y-4">
                    {/* Root Cause Type */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Root cause type <span className="text-red-500">*</span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>
                                Please select type of root cause
                            </option>
                            {typeOfRootCauses?.map((el) => (<option key={el.id} value={el.id}>{el.details}</option>
                            ))}
                        </select>
                    </div>

                    {/* Root cause details */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Root cause details
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Input text here"></textarea>
                    </div>

                    {/* Operational details */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Operational details <span className="text-red-500">*</span>
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Input text here"></textarea>
                    </div>

                    {/* Preventing recurrence */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Preventing recurrence
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Input text here"></textarea>
                    </div>

                    {/* Additional suggestions */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Additional suggestions
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Input text here"></textarea>
                    </div>

                    {/* List of equipment used */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            List of equipment used <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="noEquipment"
                                    checked={equipmentOption === 'noEquipment'}
                                    onChange={handleEquipmentChange}
                                    className="radio"
                                />
                                <span className="ml-2">Don't use equipment.</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="useEquipment"
                                    checked={equipmentOption === 'useEquipment'}
                                    onChange={handleEquipmentChange}
                                    className="radio"
                                />
                                <span className="ml-2">Use equipment requisition number</span>
                            </label>
                        </div>
                        {equipmentOption === 'useEquipment' && (
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="Input here" />
                        )}
                    </div>

                    {/* Upload image */}
                    <div className="col-span-2 form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Upload image</span>
                        </label>
                        <div className="flex items-center justify-center w-full  ">
                            <div
                                className="flex flex-col items-center justify-center w-full  border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                                onClick={() => document.getElementById('input-file-image-maintenance-task').click()}
                            >
                                {!image && <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="text-sm text-gray-400">Click to upload</p>
                                </div>}
                                <input
                                    type="file"
                                    id='input-file-image-maintenance-task'
                                    className="hidden"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <div className='w-full absolute top-1 right-1  flex justify-end'>
                                    {image && <CloseIcon
                                        className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            document.getElementById('input-file-image-maintenance-task').value = '';
                                            setImage(null)
                                        }}
                                    />}

                                </div>
                                {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}

                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <Link to={`/show-maintenance-task/${id}`} type="button" className="btn btn-outline w-[150px]">
                            Back
                        </Link>
                        <button type="submit" className="btn btn-secondary
                     w-[150px]">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FinishWorkForm