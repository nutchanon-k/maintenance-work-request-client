import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useRequestTaskStore from '../../store/RequestTaskStore'
import { NoPhotoIcon } from '../../icons/Icons'
import { toast } from 'react-toastify'
import useUserStore from '../../store/UserStore'
import Avatar from '../../components/Avatar'
import { CardToChooseUser } from '../../components/Card'
import useMaintenanceTaskStore from '../../store/MaintenanceTaskStore'
import Swal from 'sweetalert2'

const CreateNewMaintenanceTask = () => {
  const navigate = useNavigate()
  const { reqId } = useParams()


  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const currentTask = useRequestTaskStore(state => state.currentTask)
  const getRequestTask = useRequestTaskStore(state => state.getRequestTask)
  const getMaintenanceMembers = useUserStore(state => state.getMaintenanceMembers)
  const maintenanceMembers = useUserStore(state => state.maintenanceMembers)
  const createMaintenanceTask = useMaintenanceTaskStore(state => state.createMaintenanceTask)

  const updateIsAssigned = useRequestTaskStore(state => state.updateIsAssigned)


  //******* */ ควรไห้กดเลือกประเภทแล้วไห้ filter คนแผนกนั้นๆมาก้พอ

  const [reqTask, setReqTask] = useState('')
  const [typeOfFailure, setTypeOfFailure] = useState('');
  const [assignedMember, setAssignedMember] = useState('');
  const [note, setNote] = useState('');
  const [member, setMember] = useState('');
  const [department, setDepartment] = useState([]);



  useEffect(() => {
    const checkId = async () => {
      try {
        const result = await getRequestTask(token, reqId)
        if (result.length == 0 || !result) {
          navigate('/not-found')
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkId()
    getMaintenanceMembers(token)
  }, [])

  useEffect(() => {
    if (currentTask) {
      setReqTask(currentTask[0])
    }
  }, [currentTask])

  console.log(maintenanceMembers)
  useEffect(() => {
    setMember(maintenanceMembers.filter((member) => member.department.name === department))
  }, [typeOfFailure])

  console.log(member)

  //ต้องมี Body ตามนี้ในการ submit
  // {
  //   requestId,
  //   employeeId,
  //   machineId,
  //   typeOfFailureId
  // }
  // console.log(reqTask.id)
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const result1 = await createMaintenanceTask(token, {
        requestId: reqTask?.id,
        machineId: reqTask?.machineId,
        typeOfFailureId: typeOfFailure,
        employeeId: assignedMember,
        note: note
      })
      const result2 = await updateIsAssigned(token, { isAssigned: true, }, reqTask.id)
      console.log(result1)
      console.log(result2)

      navigate(`/show-request-task/${reqId}`)

    } catch (error) {
      console.log(error)

    }
  };

  // console.log(currentTask)




  const hdlBack = () => {
    console.log('Back button clicked');

    navigate(`/show-request-task/${reqId}`);
  };



  // console.log("test", currentTask)

  const translateTime = (time) => {
    const isoDate = time
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      hour12: false, // แสดงเวลาแบบ 24 ชั่วโมง
    });
    return formattedDate
  }
  // console.log(user)
  return (

    <div className='flex flex-col  '>

      {/* header */}
      <div className='flex justify-between p-4 '>
        <div className='text-3xl p-2 flex items-baseline gap-2  '>
          <h1>{"Request Task >"}</h1>
          <Link to="/request-in-progress" className="text-xl">
            In Progress
          </Link>
          <h1>{">"}</h1>
          <div className="text-lg">
            {`Request Task ID  ${reqTask?.id}`}
          </div>
          <p className='text-sm'>{"> Add New Maintenance Task"}</p>
        </div>
      </div>


      <div className="flex flex-col items-center  p-6  ">
        <div className="flex justify-between w-full ">
          {/* Left section - Request details */}
          <div className="w-2/5 space-y-4">

            <span className="badge badge-success">{reqTask?.machine?.location?.name}</span>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>Request by: </strong> {reqTask?.employee?.firstName} {reqTask?.employee?.lastName}
              </p>
              <p className="text-sm">
                <strong>Requested Time: </strong> {translateTime(reqTask?.requestTime)}
              </p>
              <p className="text-sm">
                <strong>Updated Time: </strong> {translateTime(reqTask?.updatedTime)}
              </p>
              <p className="text-sm">
                <strong>Division: </strong> {reqTask?.department?.name}
              </p>
              <p className="text-sm">
                <strong>Machine ID.: </strong> {reqTask?.machineId}
              </p>
              <p className="text-sm">
                <strong>Machine name: </strong> {reqTask?.machine?.name}
              </p>
              <p className="text-sm">
                <strong>Machine observations: </strong> {reqTask?.faultSymptoms}
              </p>
              <p className="text-sm flex items-center">
                <strong>Status: </strong>
                {reqTask?.status === "inProgress" ?
                  <span className="ml-2 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>{' '}{reqTask?.status}
                  </span>
                  :
                  <span className="ml-2 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>{' '}{reqTask?.status}
                  </span>
                }
              </p>
              <p className="text-sm">
                <strong>Assigned: </strong> {reqTask?.isAssigned ? <span className="text-primary">Assigned</span> : <span className="text-secondary">Waiting..</span>}
              </p>
            </div>

            {/*Assign form*/}
            <div className=' w-full p-2'>
              <form className="p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-4" onSubmit={hdlSubmit}>
                {/* Type of failure */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Type of failure <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={typeOfFailure}
                    onChange={(e) => {
                      const value = e.target.value
                      setTypeOfFailure(value)
                      if (value === "1") {
                        setDepartment("Mechanical")
                      } else if (value === "2") {
                        setDepartment("Electrical")
                      } else if (value === "3") {
                        setDepartment("Tooling")
                      }
                    }
                    }
                    required
                  >
                    <option disabled selected value={""} >Please select Type of failure</option>
                    <option value="1">Mechanical</option>
                    <option value="2">Electrical</option>
                    <option value="3">Tooling</option>

                  </select>
                </div>

                {/* Assign member */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Assign member <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={assignedMember}
                    onChange={(e) => setAssignedMember(e.target.value)}
                    required
                  >
                    <option disabled selected value="">Please select member</option>

                    {member.length > 0 ?
                      member.map((member) => (<option key={member.id} value={member.id}>{member.firstName + " " + member.lastName}</option>
                      ))
                      :
                      <></>
                    }
                  </select>
                </div>

                {/* Note */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Note</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={note.split('\n').length}
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button type="button" className="btn btn-outline w-[100px]" onClick={hdlBack}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary w-[100px]" >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className=' w-1/2 p-2'>
            <div className="w-full mx-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Member</h2>

              </div>
              <div className="flex flex-wrap">
                {member?.length > 0 ?
                  member?.map((member) => (<CardToChooseUser key={member.id} member={member} />))
                  :
                  maintenanceMembers.map((member) => (<CardToChooseUser key={member.id} member={member} />))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewMaintenanceTask