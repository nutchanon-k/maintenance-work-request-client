import React from 'react'
import { Link } from 'react-router-dom'
import useRequestTaskStore from '../store/RequestTaskStore'
import useUserStore from '../store/UserStore'

export function CardRequest(props) {
    const {ReqTask} = props

    const getRequestTask = useRequestTaskStore(state => state.getRequestTask)
    const token = useUserStore(state => state.token)

    const location = ReqTask.machine?.location?.name
    const status = ReqTask.status
    const isAssigned = ReqTask.isAssigned
    // console.log(ReqTask)
    
    const handleClick = (e) => {
        getRequestTask(token,ReqTask.id)
    }
    
    
    
    
    return (
        <Link 
            className="card bg-base-100 w-72 shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all"
            onClick={handleClick} 
            to={`/show-request-task`}
            id = {ReqTask.id}
        >
            <div className="card-body">
                <div className='flex justify-between'>
                    {location==="Factory1" ? <div className="badge badge-primary badge-outline">Factory1</div> : <div className="badge badge-warning badge-outline">Factory2</div>}
                    {isAssigned ? <div className="badge badge-primary">Assigned</div> : <div className="badge badge-secondary">Waiting..</div>}
                </div>
                <h2 className="card-title">Request No. xxxxxxx</h2>
                <p className='text-sm text-gray-500 font-b'>M/C Number xxxxxxxx</p>
                <p className='text-sm text-gray-500'>M/C Name xxxxxxxx</p>
            </div>
            <figure>
                <img src="../src/assets/machine.jpg" alt="machine" />
            </figure>
        </Link>
    )
}


export function CardMaintenance() {
    return (
        <div className="card bg-base-100 w-72 shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all" >
            <div className="card-body">
                <div className='flex justify-between'>
                    <div className="badge badge-primary badge-outline">Factory1</div>
                    <div className="badge badge-warning">Mechanical</div>
                </div>
                <h2 className="card-title">Maintenance Task No. xxxxxxx</h2>
                <p className='text-sm text-gray-500 font-b'>M/C Number xxxxxxxx</p>
                <p className='text-sm text-gray-500'>M/C Name xxxxxxxx</p>
            </div>
            <figure>
                <img src="../src/assets/machine.jpg" alt="machine" />
            </figure>
        </div>
    )
}


export function CardUser() {
    return (
        <div className="card bg-base-100 w-72 shadow-xl hover:transform hover:scale-105 hover:shadow-2xl active:transform active:scale-100 active:opacity-50 transition-all">
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


