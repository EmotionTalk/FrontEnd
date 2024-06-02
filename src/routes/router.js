import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import First from "../pages/First";
import KakaoRedirect from "../pages/KakaoRedirect";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main/>
    },
    {
        path:'/first',
        element:<First/>
    },
    {
        path:'/oauth',
        element:<KakaoRedirect/>
    }
])

export default router