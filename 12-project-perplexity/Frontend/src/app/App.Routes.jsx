import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashborad from "../features/chat/pages/Dashborad";
import Protected from "../features/auth/component/Protected";

export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>,
    },
    {
        path:"/register",
        element:<Register/>,
    },
    {
        path:"/",
        element:<Protected>
            <Dashborad/>
        </Protected>,
    }
])