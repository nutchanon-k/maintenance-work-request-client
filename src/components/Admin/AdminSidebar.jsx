import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineLeft, AiOutlineRight, AiOutlineUp } from 'react-icons/ai';
import { GrHostMaintenance } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { RiProgress2Line, RiProgress4Line, RiProgress6Line, RiProgress8Line } from "react-icons/ri";
import { VscRequestChanges } from "react-icons/vsc";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [isRequestTaskExpanded, setIsRequestTaskExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`h-screen bg-base-100 shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        {/* Sidebar header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold text-secondary whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-3xl mr-2">•</span>
            Maintenance
            <br />
            <span className="ml-6">Work Request</span>
          </h2>
          <button
            onClick={toggleSidebar}
            className={`btn btn-ghost btn-circle ${isSidebarOpen ? '' : 'absolute left-2 top-4'}`}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <AiOutlineLeft size={24} /> : <AiOutlineRight size={24} />}
          </button>
        </div>

        {/* Main Menu Text */}
        <div className={`text-sm text-gray-500 font mb-4 whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          MAIN MENU
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {/* Home link */}
          <div className={`flex flex-1 items-center  ${isSidebarOpen ? "w-[225px]" : ""} `}>
            <Link
              className={`flex items-center p-2 hover:bg-base-200  rounded ${isSidebarOpen ? "w-full" : ""}`}  
              to={"/"}>
              <IoHomeOutline size={20} className="mr-3 " />
              <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-8'}`}>Home</span>
            </Link>
          </div>

          {/* Request Task menu */}
          <div className="transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsRequestTaskExpanded(!isRequestTaskExpanded)}
              className="flex items-center justify-between w-full p-2 hover:bg-base-200 rounded"
            >
              <div className="flex items-center">
                <VscRequestChanges size={20} className="mr-3" />
                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-8'}`}>Request Task</span>
              </div>
              <AiOutlineUp size={16} className={`transform transition-transform duration-300 ${isRequestTaskExpanded ? 'rotate-0' : 'rotate-180'}`} />
            </button>

            {/* Sub-menu (expanded task options) */}
            <div className={`ml-3 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isRequestTaskExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Link className="flex items-center py-1 text-gray-600 hover:text-gray-800 hover:bg-base-200  rounded transition-colors duration-200"
                to={"/request-in-progress"}
              >
                <RiProgress4Line size={18} className="mr-2" />
                {isSidebarOpen && <span>In Progress</span>}
              </Link>

              <Link className="flex items-center py-1 text-gray-600 hover:text-gray-800 hover:bg-base-200  rounded transition-colors duration-200"
                to={"/request-success"}
              >
                <RiProgress8Line size={18} className="mr-2" />
                {isSidebarOpen && <span>Success</span>}
              </Link>
            </div>
          </div>

          {/* Maintenance Task menu */}
          <div className="transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsTaskExpanded(!isTaskExpanded)}
              className="flex items-center justify-between w-full p-2 hover:bg-base-200 rounded"
            >
              <div className="flex items-center">
                <GrHostMaintenance size={20} className="mr-3 " />
                <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-8'}`}>Maintenance Task</span>
              </div>
              <AiOutlineUp size={16} className={`transform transition-transform duration-300 ${isTaskExpanded ? 'rotate-0' : 'rotate-180'} ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`} />
            </button>

            {/* Sub-menu (expanded task options) */}
            <div className={`ml-3 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isTaskExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Link className="flex items-center py-1 transition-colors duration-200 hover:bg-base-200  rounded"
                to={"/maintenance-backlog"}
              >
                <RiProgress2Line size={18} className="mr-2" />
                {isSidebarOpen && <span>Backlog</span>}
              </Link>
              <Link className="flex items-center py-1 text-gray-600 hover:text-gray-800 hover:bg-base-200  rounded transition-colors duration-200"
                to={"/maintenance-in-progress"}
              >
                <RiProgress4Line size={18} className="mr-2" />
                {isSidebarOpen && <span>In Progress</span>}
              </Link>
              <Link className="flex items-center py-1 text-gray-600 hover:text-gray-800 hover:bg-base-200  rounded transition-colors duration-200"
                to={"/maintenance-in-review"}
              >
                <RiProgress6Line size={18} className="mr-2" />
                {isSidebarOpen && <span>In Review</span>}
              </Link>
              <Link className="flex items-center py-1 text-gray-600 hover:text-gray-800 hover:bg-base-200  rounded transition-colors duration-200"
                to={"/maintenance-success"}
              >
                <RiProgress8Line size={18} className="mr-2" />
                {isSidebarOpen && <span>Success</span>}
              </Link>
            </div>
          </div>

          {/* Manage User link */}
          <div className={`flex items-center ${isSidebarOpen ? "w-[225px]" : ""} `}>
            <Link className= {`flex items-center p-2 hover:bg-base-200 rounded ${isSidebarOpen ? "w-full" : ""}`}
              to={"/manage-users"}
            >
              <RiUserSettingsLine size={20} className="mr-3 text-gray-500" />
              <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-8'}`}>Manage User</span>
            </Link>
          </div>

          {/* Add New Request button */}
          {isSidebarOpen && (
            <Link to={"/create-request-task"} className="btn btn-secondary w-full mt-4">
              <AiOutlinePlus size={20} className="mr-2" />
              Add New Request
            </Link>
          )}

        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
