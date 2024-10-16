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
                    {ReqTask.image ? <img src={ReqTask.image} alt="machine" className='w-full' /> : <PicMachineDefault className='w-full' />}
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
        getMaintenanceTask(token, maintenanceTask.id)
    }

    // console.log(maintenanceTask?.requestTask?.machine?.location?.name)

    return (
        <Link
            className="card bg-base-100 w-[300px] shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all"
            onClick={handleClick}
            to={`/show-maintenance-task/${maintenanceTask?.id}`}
            id={maintenanceTask?.id}
        >
            <div className='flex flex-col   '>
                <div className="card-body">
                    <div className='flex justify-between'>
                        {location === "Factory1" ? <div className="badge badge-primary badge-outline">Factory1</div> : <div className="badge badge-warning badge-outline">Factory2</div>}
                        {typeOfFailure === "Mechanical" ? <div className="badge badge-primary">{typeOfFailure}</div> : typeOfFailure === "Electrical" ? <div className="badge badge-secondary">{typeOfFailure}</div> : <div className="badge badge-info">{typeOfFailure}</div>}
                    </div>
                    <h2 className="card-title"><span className='font-bold'>Maintenance Task ID. </span>{`${maintenanceTask?.id}`}</h2>
                    <p className='text-sm text-gray-500 font-b'><span className='font-bold'>Machine ID. </span>{`${maintenanceTask?.machineId}`}</p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Machine Name. </span>{`${maintenanceTask?.requestTask?.machine?.name}`}</p>
                    <p className='text-sm text-gray-500'><span className='font-bold'>Assigned to. </span>{`${maintenanceTask?.employee?.firstName} ${maintenanceTask?.employee?.lastName}`}</p>
                </div>
                <figure>
                    {maintenanceTask?.requestTask?.image ? <img src={maintenanceTask?.requestTask?.image} alt="machine" className='w-full' /> : <PicMachineDefault className='w-full' />}
                </figure>
            </div>
        </Link>
    )
}


export function CardUser() {
    return (
        <div className="card bg-base-100 w-[300px] shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all">
            <div className='flex justify-between px-4  '>
                <div className="badge badge-primary ">Engineering Shop</div>
                <div className="badge badge-warning">Admin</div>
            </div>
            <figure className="px-10 pt-10">
                <img
                    src="../src/assets/avatar-man.png"
                    alt="avatar"
                    className="rounded-xl"
                />
            </figure>
            <div className="card-body items-center">
                <h2 className="card-title">John Anderson</h2>
                <div>
                    <p><span className='font-bold '>Email : </span>admin@gmail.com</p>
                    <p><span className='font-bold'>Position : </span>Manager</p>
                    <p><span className='font-bold'>Department : </span>Mechanical</p>
                    <p><span className='font-bold'>Dept. Type : </span>Engineering</p>
                </div>
                <div className="card-actions mt-2">
                    <button className="btn btn-outline btn-secondary  ">Click to edit</button>
                </div>
            </div>
        </div>
    )
}

export function CardToChooseUser(props) {
    const { member } = props
    return (
        <div className="bg-base-100 shadow-xl flex w-60  px-4 py-2 m-2 border rounded-2xl hover:scale-105 transition-all active:opacity-50 active:scale-100">
            <div className="flex items-center space-x-4 ">
                <div className="avatar">
                    <Avatar className="w-14 h-14 rounded-full" imgSrc={member.img} />
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
