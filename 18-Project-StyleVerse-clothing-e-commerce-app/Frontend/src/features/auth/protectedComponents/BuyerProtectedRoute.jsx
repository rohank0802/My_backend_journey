import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const BuyerProtectedRoutes=()=>{
const user=useSelector((state)=>state.auth.user)
const loading=useSelector((state)=>state.auth.loading)

if(loading){
    return <h1>Loading...</h1>
}

if(!user){
    return <Navigate to="/login" replace/>
}
if(user.role !== "buyer"){
    return <h1>access denied</h1>
}

    return <Outlet/>
}
export default BuyerProtectedRoutes