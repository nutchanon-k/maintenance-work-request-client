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
import ShowTaskBacklog from "../pages/MaintenanceTask/ShowTaskBacklog";
import ShowTaskInProgress from "../pages/MaintenanceTask/ShowTaskInProgress";
import FinishWorkForm from "../pages/MaintenanceTask/FinishWorkForm";

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
            {path: "show-request-task", element: <ShowRequestDetail />},
            {path: "edit-request-task", element: <EditRequest />},
            {path: "maintenance-backlog", element: <MaintenanceBacklog />},
            {path : "maintenance-in-progress", element: <MaintenanceInProgress />},
            {path : "maintenance-in-review", element: <MaintenanceInReview />},
            {path : "maintenance-success", element: <MaintenanceSuccess />},
            {path : "create-maintenance-task", element: <CreateNewMaintenanceTask />},
            {path : "show-task-backlog", element: <ShowTaskBacklog />},
            {path : "show-task-inprogress", element: <ShowTaskInProgress />},
            {path : "finish-work-form", element: <FinishWorkForm />},
            {path : "manage-users", element: <ManageUsers />},
            {path: "*", element: <NotFound  />}, 
        ]
    },
]);



export default function AppRouter() {
    const user = useUserStore(state => state.user)

    const finalRouter = user ? adminRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}