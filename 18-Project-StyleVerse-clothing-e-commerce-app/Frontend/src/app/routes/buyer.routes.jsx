import { Children } from "react";
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
            }
        ]
    }
]