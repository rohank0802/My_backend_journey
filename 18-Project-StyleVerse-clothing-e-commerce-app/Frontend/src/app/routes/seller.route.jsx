import SellerLoginPage from "../../features/auth/pages/SellerPages/SellerLoginPage.jsx";
import SellerRegisterPage from "../../features/auth/pages/SellerPages/SellerRegisterPage.jsx";
import SellerProtectedRoutes from "../../features/auth/protectedComponents/SellerProtectedRoutes.jsx";

export const sellerRoutes=[
    {
        path:"/seller/login",
        element:<SellerLoginPage/>
    },
    {
        path:"/seller/register",
        element:<SellerRegisterPage/>
    },
    {
        element:<SellerProtectedRoutes/>,
        children:[
            {
                path:"/seller/dashboard",
                element:<h1>Dashboard</h1>
            }
        ]
    }
]
