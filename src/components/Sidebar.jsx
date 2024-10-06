import React, { useState } from 'react';
import { Home, ClipboardList, ChevronDown, ChevronUp, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`
      fixed top-0 left-0 h-screen bg-white shadow-lg  transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'w-64' : 'w-16'}
    `}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold text-blue-600 whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-3xl mr-2">•</span>
            Maintenance
            <br />
            <span className="ml-6">System</span>
          </h2>
          <button
            onClick={toggleSidebar}
            className={`p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200 ${isSidebarOpen ? '' : 'absolute right-2 top-4'}`}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
        
        <div className={`text-sm text-gray-500 mb-4 whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          MAIN MENU
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap">
            <Home size={20} className={isSidebarOpen ? "mr-3 opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300 mr-3"} />
            <span className={`transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Home</span>
          </a>
          
          <div className="transition-all duration-300 ease-in-out">
            <button 
              onClick={() => isSidebarOpen && setIsTaskExpanded(!isTaskExpanded)}
              className="flex items-center justify-between w-full py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            >
              <div className="flex items-center">
                <ClipboardList size={20} className={isSidebarOpen ? "mr-3 opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300 mr-3"} />
                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Task</span>
              </div>
              {isSidebarOpen && (
                <ChevronUp size={16} className={`transform transition-transform duration-300 ${isTaskExpanded ? 'rotate-0' : 'rotate-180'}`} />
              )}
            </button>
            
            <div className={`
              ml-6 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out
              ${isSidebarOpen && isTaskExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <a href="#" className="block py-1 text-blue-500 transition-colors duration-200 whitespace-nowrap">Backlog</a>
              <a href="#" className="block py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap">In Progress</a>
              <a href="#" className="block py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap">In Review</a>
              <a href="#" className="block py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap">Complete</a>
            </div>
          </div>

          {isSidebarOpen && (
            <button className="flex items-center justify-center w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 whitespace-nowrap">
              <Plus size={20} className="mr-2" />
              Add New Request
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;