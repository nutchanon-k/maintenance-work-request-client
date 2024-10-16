import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import RequestInProgress from "../pages/RequestTask/RequestInProgress";
import RequestSuccess from "../pages/RequestTask/RequestSuccess";
import MaintenanceBacklog from "../pages/MaintenanceTask/MaintenanceBacklog";
import MaintenanceInProgress from "../pages/MaintenanceTask/MaintenanceInProgress";
import MaintenanceInReview from "../pages/MaintenanceTask/MaintenanceInReview";
import MaintenanceSuccess from "../pages/MaintenanceTask/MaintenanceSuccess";
import ManageUsers from "../pages/user/ManageUser";
import Login from "../pages/authenticate/Login";
import useUserStore from "../store/UserStore";
import NotFound from "../pages/NotFound";
import CreateNewRequest from "../pages/RequestTask/CreateNewRequest";
import ShowRequestDetail from "../pages/RequestTask/ShowRequestDetail";
import EditRequest from "../pages/RequestTask/EditRequest";
import CreateNewMaintenanceTask from "../pages/MaintenanceTask/CreateNewMaintenanceTask";
// import ShowTaskBacklog from "../pages/MaintenanceTask/ShowMaintenanceTask";
import ShowTaskInProgress from "../pages/MaintenanceTask/ShowTaskInProgress";
import FinishWorkForm from "../pages/MaintenanceTask/FinishWorkForm";
import useMaintenanceTaskStore from "../store/MaintenanceTaskStore";
import ShowMaintenanceTask from "../pages/MaintenanceTask/ShowMaintenanceTask";


const guestRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "*", element: <Navigate to="/" /> },
    
]);

const adminRouter = createBrowserRouter([
    {
        path: "/", element: <AdminLayout />,
        children: [
            {index: true, element: <Home />},
            {path: "request-in-progress", element: <RequestInProgress />},
            {path: "request-success", element: <RequestSuccess />},
            {path: "create-request-task", element: <CreateNewRequest />},
            {path: "show-request-task/:id", element: <ShowRequestDetail />},
            {path: "edit-request-task/:id", element: <EditRequest />},
            {path: `maintenance-backlog`, element: <MaintenanceBacklog />},
            {path : "maintenance-in-progress", element: <MaintenanceInProgress />},
            {path : "maintenance-in-review", element: <MaintenanceInReview />},
            {path : "maintenance-success", element: <MaintenanceSuccess />},
            {path : "create-maintenance-task", element: <CreateNewMaintenanceTask />},
            {path : "show-maintenance-task/:id", element: <ShowMaintenanceTask />},
            {path : "show-task-inprogress/:id", element: <ShowTaskInProgress />},
            {path : "finish-work-form/:id", element: <FinishWorkForm />},
            {path : "manage-users", element: <ManageUsers />},
            {path: "*", element: <NotFound  />}, 
        ]
    },
]);



export default function AppRouter() {
    const user = useUserStore(state => state.user)
    // const currentMaintenanceTask = useMaintenanceTaskStore(state => state.currentMaintenanceTask)
    console.log('test router')
    const finalRouter = user ? adminRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}