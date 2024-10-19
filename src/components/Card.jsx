import React from 'react'
import { Link } from 'react-router-dom'
import useRequestTaskStore from '../store/RequestTaskStore'
import useUserStore from '../store/UserStore'
import { PicMachineDefault } from '../icons/Icons'
import Avatar from './Avatar'
import useMaintenanceTaskStore from '../store/MaintenanceTaskStore'



export function CardRequest(props) {
    const { ReqTask } = props

    const getRequestTask = useRequestTaskStore(state => state.getRequestTask)
    const token = useUserStore(state => state.token)

    const location = ReqTask.machine?.location?.name
    const isAssigned = ReqTask.isAssigned
    // console.log(ReqTask)

    const handleClick = (e) => {
        getRequestTask(token, ReqTask.id)
    }

    return (
        <Link
            className="card bg-base-100 w-[300px] shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all  "
            onClick={handleClick}
            to={`/show-request-task/${ReqTask.id}`}
            id={ReqTask?.id}
        >
            <div className='flex flex-col   '>
                <div className="card-body ">
                    <div className='flex justify-between'>
                        {location === "Factory1" ? <div className="badge badge-primary badge-outline">Factory1</div> : <div className="badge badge-warning badge-outline">Factory2</div>}
                        {isAssigned ? <div className="badge badge-primary">Assigned</div> : <div className="badge badge-secondary">Waiting..</div>}
                    </div>
                    <h2 className="card-title"><span className='font-bold'>Request TasK ID.</span> {ReqTask.id}</h2>
                    <p className='text-sm text-gray-500 font-b'><span className='font-bold'>Machine ID. </span> {ReqTask.machineId} </p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Machine Name. </span>{ReqTask.machine?.name}</p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Request by. </span>{ReqTask.employee?.firstName} {ReqTask.employee?.lastName}</p>
                </div>
                <figure >
                    {ReqTask.image ? <img src={ReqTask.image} alt="machine" className=' h-56 w-full' /> : <PicMachineDefault className='h-56 w-full' />}
                </figure>
            </div>
        </Link>
    )
}
export function CardMaintenance(props) {
    const { maintenanceTask } = props
    const getMaintenanceTask = useMaintenanceTaskStore(state => state.getMaintenanceTask)
    const token = useUserStore(state => state.token)


    const location = maintenanceTask?.requestTask?.machine?.location?.name
    const typeOfFailure = maintenanceTask?.typeOfFailure?.details

    const handleClick = (e) => {
        console.log("maintenanceID", maintenanceTask.id)
        getMaintenanceTask(token, maintenanceTask.id)
    }

    // console.log(maintenanceTask?.requestTask?.machine?.location?.name)

    return (
        <Link
            className={`card bg-base-100 w-[300px] ${maintenanceTask.isRejected ? "indicator" : ""} shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all`}
            onClick={handleClick}
            to={
                maintenanceTask.status === "inReview" || maintenanceTask.status === "success" ?
                    `/show-task-in-review/${maintenanceTask?.id}` : `/show-maintenance-task/${maintenanceTask?.id}`}
            id={maintenanceTask?.id}
        >
            {maintenanceTask.isRejected ? <span className="indicator-item badge badge-error">Rejected</span> : ""}
            <div className='flex flex-col   '>
                <div className="card-body">
                    <div className='flex justify-between'>
                        {location === "Factory1" ? <div className="badge badge-primary badge-outline">Factory1</div> : <div className="badge badge-warning badge-outline">Factory2</div>}
                        {typeOfFailure === "Mechanical" ? <div className="badge badge-primary">{typeOfFailure}</div> : typeOfFailure === "Electrical" ? <div className="badge badge-secondary">{typeOfFailure}</div> : <div className="badge badge-warning">{typeOfFailure}</div>}
                    </div>
                    <h2 className={`card-title ${maintenanceTask.isRejected ? "text-error" : ""}`}><span className='font-bold'>Maintenance Task ID. </span>{`${maintenanceTask?.id}`}</h2>
                    <p className='text-sm text-gray-500 font-b'><span className='font-bold'>Machine ID. </span>{`${maintenanceTask?.machineId}`}</p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Machine Name. </span>{`${maintenanceTask?.requestTask?.machine?.name}`}</p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Assigned to. </span>{`${maintenanceTask?.employee?.firstName} ${maintenanceTask?.employee?.lastName}`}</p>
                </div>
                {maintenanceTask?.status === "inReview" || maintenanceTask?.status === "success" ?
                    <figure>
                        {maintenanceTask?.image ? <img src={maintenanceTask?.image} alt="machine" className='w-full' /> : maintenanceTask?.requestTask?.image ? <img src={maintenanceTask?.requestTask?.image} alt="machine" className='w-full' /> : <PicMachineDefault className='w-full' />}
                    </figure>
                    :
                    <figure>
                        {maintenanceTask?.requestTask?.image ? <img src={maintenanceTask?.requestTask?.image} alt="machine" className=' h-56 w-full' /> : <PicMachineDefault className='h-56 w-full' />}
                    </figure>
                }
            </div>
        </Link>
    )
}
export function CardUser(props) {
    const { member } = props

    const token = useUserStore(state => state.token)
    return (
        <Link
            className="card bg-base-100 w-[280px] shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all"
            to={`/show-user/${member?.id}`}
        >
            <div className='flex justify-between px-4 pt-4'>
                <div className={
                    member?.location?.name === "Engineering Shop" ?
                        "badge badge-primary badge-outline" :
                        member?.location?.name === "Factory1" ?
                            "badge badge-secondary badge-outline" :
                            member?.location?.name === "Factory2" ?
                                "badge badge-accent badge-outline" :
                                "badge badge-info badge-outline"

                }>{member?.location?.name}</div>
                <div className={
                    member?.role === "admin" ?
                        "badge badge-primary " :
                        member?.role === "maintenance" ?
                            "badge badge-secondary " :
                            "badge badge-neutral"
                }>{member?.role}</div>
            </div>
            <figure className="px-10 pt-10">
                <img
                    src={member?.picture || `../src/assets/avatar-man.png`}
                    alt="avatar"
                    className="rounded-xl"
                />
            </figure>
            <div className="card-body items-center">
                <h2 className="card-title">{member?.firstName} {member?.lastName}</h2>
                <div>
                    <p><span className='font-bold '>Email : </span>{member?.email}</p>
                    <p><span className='font-bold'>Position : </span>{member?.level}</p>
                    <p><span className='font-bold'>Department : </span>{member?.department.name}</p>
                    <p><span className='font-bold'>Dept. Type : </span>{member?.department.departmentType}</p>
                </div>
                <div className="card-actions mt-2">
                    <button className="btn btn-outline btn-secondary  ">Click to see</button>
                </div>
            </div>
        </Link>
    )
}
export function CardToChooseUser(props) {
    const { member } = props
    return (
        <div className="bg-base-100 shadow-xl flex w-60  px-4 py-2 m-2 border rounded-2xl hover:scale-105 transition-all active:opacity-50 active:scale-100">
            <div className="flex items-center space-x-4 ">
                <div className="avatar">
                    <Avatar className="w-14 h-14 rounded-full" imgSrc={member.picture} />
                </div>
                <div>
                    <span className={`badge ${member.department.name === 'Mechanical' ? 'badge-success' : member.department.name === 'Tooling' ? 'badge-warning' : 'badge-info'} mb-1`}>
                        {member.department.name}
                    </span>
                    <p className="font-semibold">{member.firstName + " " + member.lastName}</p>
                    <p className="text-sm text-gray-500">{member.level}</p>
                    <p className="text-sm text-gray-500">Task on hand # {member.tasks}</p>
                </div>
            </div>
            <div>
                <span
                    className={`w-4 h-4 rounded-full ${member.status === 'green' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                ></span>
            </div>
        </div>
    );
}
