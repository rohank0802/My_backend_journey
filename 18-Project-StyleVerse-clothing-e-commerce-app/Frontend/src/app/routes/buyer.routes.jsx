import { Children } from "react";
import { Link } from "react-router-dom";
import LoginPage from "../../features/auth/pages/buyerPages/LoginPage.jsx";
import RegisterPage from "../../features/auth/pages/buyerPages/RegisterPage.jsx";
import BuyerProtectedRoutes from "../../features/auth/protectedComponents/BuyerProtectedRoute.jsx";

export const buyerRoutes = [
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        element: <BuyerProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <h1>hello world</h1>
            },
            {
                path: "/buyer/verify-email",
                element: <h1>regestrition seccessfull .please verify you email before login.varification link is sended on your registered email. <Link to="/login" className="text-indigo-600 cursor-pointer hover:underline">Go on login page</Link></h1>
            }
        ]
    }
]