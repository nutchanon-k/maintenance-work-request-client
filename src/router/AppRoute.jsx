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
import FinishWorkForm from "../pages/MaintenanceTask/FinishWorkForm";
import ShowMaintenanceTask from "../pages/MaintenanceTask/ShowMaintenanceTask";
import ShowTaskInReview from "../pages/MaintenanceTask/ShowTaskInReview";
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";
import ShowUserDetails from "../pages/user/showUserDetails";
import { useEffect, useState } from "react";
import ProtectRouteLeader from "./ProtectRouteLeader";
import MaintenanceLayout from "../layouts/MaintenanceLayout";
import RequesterLayout from "../layouts/RequesterLayout";
import LoadingAnimation from "../assets/LoadingAnimation.json";
import Lottie from "lottie-react";


const guestRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "*", element: <Navigate to="/" /> },
    
]);

const adminRouter = createBrowserRouter([
    {
        path: "/", 
        element: <AdminLayout /> ,
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
            {path : "create-maintenance-task/:reqId", element: <CreateNewMaintenanceTask />},
            {path : "show-maintenance-task/:id", element: <ShowMaintenanceTask />},
            {path : "show-task-in-review/:id", element: <ShowTaskInReview />},
            {path : "finish-work-form/:id", element: <FinishWorkForm />},
            {path : "manage-users", element: <ManageUsers />},
            {path : "create-user", element: <CreateUser/>},
            {path : "edit-user/:id", element: <EditUser/>},
            {path : "show-user/:id", element: <ShowUserDetails/>},
            {path: "*", element: <NotFound  />}, 
        ]
    },
]);


const maintenanceRouter = createBrowserRouter([
    {
        path: "/", 
        element: <MaintenanceLayout /> ,
        children: [
            {index: true, element: <Home />},
            {path: "request-in-progress", element: <ProtectRouteLeader element={<RequestInProgress />}/>},
            {path: "request-success", element: <ProtectRouteLeader element={<RequestSuccess />}/>},
            {path: "show-request-task/:id", element: <ShowRequestDetail />},
            {path: `maintenance-backlog`, element: <MaintenanceBacklog />},
            {path : "maintenance-in-progress", element: <MaintenanceInProgress />},
            {path : "maintenance-in-review", element: <MaintenanceInReview />},
            {path : "maintenance-success", element: <MaintenanceSuccess />},
            {path : "create-maintenance-task/:reqId", element: <CreateNewMaintenanceTask />},
            {path : "show-maintenance-task/:id", element: <ShowMaintenanceTask />},
            {path : "show-task-in-review/:id", element: <ShowTaskInReview />},
            {path : "finish-work-form/:id", element: <FinishWorkForm />},
            {path: "*", element: <NotFound  />}, 
        ]
    },
]);

const requesterRouter = createBrowserRouter([
    {
        path: "/", 
        element: <RequesterLayout /> ,
        children: [
            {index: true, element: <Home />},
            {path : "request-in-progress", element: <RequestInProgress />},
            {path : "request-success", element: <RequestSuccess />},
            {path : "create-request-task", element: <CreateNewRequest />},
            {path : "show-request-task/:id", element: <ShowRequestDetail />},
            {path : "edit-request-task/:id", element: <EditRequest />},
            {path : "maintenance-backlog", element: <MaintenanceBacklog />},
            {path : "maintenance-in-progress", element: <MaintenanceInProgress />},
            {path : "maintenance-in-review", element: <MaintenanceInReview />},
            {path : "maintenance-success", element: <MaintenanceSuccess />},
            {path : "show-maintenance-task/:id", element: <ShowMaintenanceTask />},
            {path : "show-task-in-review/:id", element: <ShowTaskInReview />},
            {path: "*", element: <NotFound  />}, 
        ]
    },
]);



export default function AppRouter() {
    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    const getMe = useUserStore(state => state.getMe)
    const [router, setRouter] = useState(null);



    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await getMe(token);
                if (result?.data?.role === "admin") {
                    setRouter(adminRouter);
                } else if (result?.data?.role === "maintenance") {
                    setRouter(maintenanceRouter);
                } else if (result?.data?.role === "requester") {
                    setRouter(requesterRouter);
                } else {
                    setRouter(guestRouter);
                }
            } catch (error) {
                setRouter(guestRouter); 
            }
        };
        loadUser();
    }, [token, getMe]);
    
    if (!router) {
        return <div><Lottie animationData={LoadingAnimation} loop={true} /></div>; 
    }

    console.log('test router', user)
    
    return (
        <RouterProvider router={router} />
    )
}