import React, { useEffect, useState } from 'react'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import useUserStore from '../../store/UserStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CloseIcon, NoPhotoIcon, UploadIcon } from '../../icons/Icons'
import LoadingBlack from '../../assets/LoadingBlack.json';
import Lottie from 'lottie-react'

const FinishWorkForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const token = useUserStore(state => state.token)
    const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
    const updateMaintenanceTask = useMaintenanceTaskStore(state => state.updateMaintenanceTask)
    const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
    const getTypeOfRootCauses = useMaintenanceTaskStore(state => state.getTypeOfRootCauses)
    const typeOfRootCauses = useMaintenanceTaskStore(state => state.typeOfRootCauses)
    const [equipmentOption, setEquipmentOption] = useState('noEquipment');

    const [data, setData] = useState({
        typeOfRootCauseId: currentMaintenanceTask[0]?.typeOfRootCauseId,
        rootCauseDetail: currentMaintenanceTask[0]?.rootCauseDetail,
        operationDetails: currentMaintenanceTask[0]?.operationDetails,
        preventingRecurrence: currentMaintenanceTask[0]?.preventingRecurrence,
        equipmentUsed: currentMaintenanceTask[0]?.equipmentUsed,
        additionalSuggestions: currentMaintenanceTask[0]?.additionalSuggestions,
        finishTime: new Date().toISOString()
    })

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [mTask, setMTask] = useState(null)
    const [oldImage, setOldImage] = useState(currentMaintenanceTask[0]?.image)



    useEffect(() => {
        const checkId = async () => {
            try {
                const result = await getMaintenanceTask(token, id)
                console.log(result)
                if (result.length == 0 || !result) {
                    navigate('/not-found')
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkId()
    }, [])


    useEffect(() => {
        if (currentMaintenanceTask) {
            setMTask(currentMaintenanceTask[0])
            getTypeOfRootCauses(token, currentMaintenanceTask[0].typeOfFailureId, currentMaintenanceTask[0].requestTask.machine.machineTypeId)
        }
    }, [currentMaintenanceTask])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleEquipmentChange = (e) => {
        setEquipmentOption(e.target.value);
        setData({ ...data, equipmentUsed: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("submit")
            setLoading(true)
            const body = new FormData();
            body.append("typeOfRootCauseId", data.typeOfRootCauseId);
            body.append("rootCauseDetail", data.rootCauseDetail);
            body.append("operationDetails", data.operationDetails);
            body.append("preventingRecurrence", data.preventingRecurrence);
            body.append("equipmentUsed", equipmentOption);
            body.append("additionalSuggestions", data.additionalSuggestions);
            body.append("finishTime", data.finishTime);
            body.append("status", "inReview");
            if (image) {
                body.append("image", image)
            }
            for (let [key, value] of body.entries()) {
                console.log(key, value)
            }
            const result = await updateMaintenanceTask(token, body, mTask.id)
            if(result){
                navigate('/maintenance-in-review')
            }

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

            <div>
                
            </div>

            {/* form */}
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md w-[600px]">
                <h1 className="text-2xl font-bold mb-6">Maintenance Report</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Root Cause Type */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Root cause type <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            name="typeOfRootCauseId"
                            onChange={handleChange}
                            value={data.typeOfRootCauseId}

                        >
                            <option disabled selected>
                                Please select type of root cause
                            </option>
                            {typeOfRootCauses?.map((el) => (
                                <option
                                    key={el.id}
                                    value={el.id}
                                >
                                    {el.details}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Root cause details */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Root cause details
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Input text here"
                            name="rootCauseDetail"
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>

                    {/* Operational details */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Operational details <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Input text here"
                            name="operationDetails"
                            value={data.operationDetails}
                            onChange={handleChange}
                            required
                        >
                        </textarea>
                    </div>

                    {/* Preventing recurrence */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Preventing recurrence
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Input text here"
                            name='preventingRecurrence'
                            value={data.preventingRecurrence}
                            onChange={handleChange}
                        >

                        </textarea>
                    </div>

                    {/* Additional suggestions */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Additional suggestions
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Input text here"
                            name="additionalSuggestions"
                            value={data.additionalSuggestions}
                            onChange={handleChange}
                        >
                        </textarea>
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
                            <input
                                type="text"
                                className="input input-bordered w-full mt-2"
                                placeholder="Input here"
                                name="equipmentUsed"
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    {/* Upload image */}
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

                    }   

                    {/* Buttons & loading */}
                    {loading ?
                        <div className="flex justify-center items-center mt-6 h-full">
                            <Lottie animationData={LoadingBlack} loop={true} className='w-20 h-20' />
                        </div>
                        :
                        <div className="flex justify-between mt-6">
                            <Link to={`/show-maintenance-task/${id}`} type="button" className="btn btn-outline w-[150px]">
                                Back
                            </Link>
                            <button type="submit" className="btn btn-secondary w-[150px]">
                                Submit
                            </button>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}

export default FinishWorkForm