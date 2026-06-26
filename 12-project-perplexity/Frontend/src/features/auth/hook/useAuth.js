import { useDispatch } from "react-redux";
import { registerApi,loginApi,getMeApi, refreshPageApi,logoutApi} from "../service/auth.api.js";
import { setUser,setLoading,setError } from "../auth.slice.js";


export function useAuth(){
    const dispatch= useDispatch()

    //for register
    async function handleRegister(userRegisterData){
        try{
            dispatch(setLoading(true))
            const data=await registerApi(userRegisterData)

        }catch(error){
            dispatch(setError(error.response?.data?.message||"registration failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

     async function handleLogin(userLoginData){
        try{
            dispatch(setLoading(true))
            const data=await loginApi(userLoginData)
            dispatch(setUser(data))
            return true
        }catch(error){
            dispatch(setError(error.response?.data?.message||"Login failed"))
            return false
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data=await getMeApi()
            dispatch(setUser(data))
        }catch(error){
            if(error.response?.status===401){
try{
    await refreshPageApi()
    const user=await getMeApi()
    dispatch(setUser(user))
}
catch(refreshError){
dispatch(setUser(null))
}
            }
            else{
                 dispatch(setError(error.response?.data?.message||"failed to fetch user data"))
            }
           
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogout(){
        try{
            await logoutApi()
            dispatch(setUser(null))
            return true
        }
        catch(err){
            return false
        }
    }
    return{
        handleRegister,handleLogin,handleGetMe,handleLogout
    }

}