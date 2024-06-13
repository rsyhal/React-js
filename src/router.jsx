import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserEdit from "./pages/User/Edit";
import Lending from "./pages/Lending/Index";
import LendingCreate from "./pages/Lending/Create";
import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";
import UserTrash from "./pages/User/Trash";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <LendingCreate /> },
    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/trash', element: <UserTrash /> },
    { path: '/user/edit/:id', element: <UserEdit /> },
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },
]);
