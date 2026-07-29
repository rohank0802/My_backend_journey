import { setError,setLoading,setUser } from "../state/auth.slice";
import { registerUser,loginUser,getMe,refreshPage,logoutUser } from "../service/auth.api";
import { useDispatch } from "react-redux";


export const useAuth=()=>{
    const dispatch=useDispatch()

    async function handleUserRegister(RegisterUserData){
        try{
            dispatch(setLoading(true))
            const response=await registerUser(RegisterUserData)
            dispatch(setUser(response.data.user))
            dispatch(setLoading(false))
            dispatch(setError(null))
            return response
        }catch(error){
            dispatch(setLoading(false))
            dispatch(setError(error))
            throw error
        }
    }

    async function handleUserLogin(LoginUserData){
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const response=await loginUser(LoginUserData)
            dispatch(setUser(response.data.user))
            dispatch(setLoading(false))
            dispatch(setError(null))
            return response
        }catch(error){
            dispatch(setLoading(false))
            dispatch(setError(error))
            throw error
        }
    }

}

async function handleUserGetMe(){
    try{
        dispatch(setLoading(true))
        const response=await getMe()
        dispatch(setUser(response.data.user))
       dispatch(setLoading(false))
       dispatch(setError(null))
        return response
    }catch(error){
    if(error.response?.status===401){

        try{
           
            await refreshPage()
           const response= await getMe()
           dispatch(setUser(response.data.user))
           dispatch(setError(null))
           dispatch(setLoading(false))
           return response

        }catch(refreshError){
            dispatch(setUser(null))
            dispatch(setError(refreshError))
            dispatch(setLoading(false))
            throw refreshError
        }
    }else{
        dispatch(setError(error.response?.data?.message||"failed to fetch user data"))
        dispatch(setUser(null))
        dispatch(setLoading(false))
        throw error
    }    
    
    }
   
}

//logoutUser action
async function handleLogout(){
try{
    dispatch(setLoading(true))
    await logoutUser()
    dispatch(setUser(null))
    dispatch(setError(null))
    dispatch(setLoading(false))
    return response
}catch(error){
    dispatch(setLoading(false))
    dispatch(setError(error))
    throw error
}
}