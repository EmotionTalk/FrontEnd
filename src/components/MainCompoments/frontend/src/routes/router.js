import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Form from "../pages/Form";
import Error404 from "../pages/errorpages/Error404";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Main
    },
    {
        path: '/login',
        Component: Login,
        socialLogin: false  
    },
    {
        path: '/visitedLog',
        Component: Form
    },
    {
        path: '/login/moreInfo',
        Component: Login,
        socialLogin: true
    },
    {
        path: '*',
        Component: Error404
    },
]);
