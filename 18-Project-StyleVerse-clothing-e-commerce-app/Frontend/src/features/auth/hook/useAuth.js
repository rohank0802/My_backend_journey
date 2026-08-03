import { useDispatch } from "react-redux";
import { setUser,setError,setLoading } from "../auth.slice.js";

import { RefreshPageUser,GetMeUser,registerUser,LoginUser,LogoutUser } from "../service/auth.api.js";

export const useAuth=()=>{
    const dispatch=useDispatch()
  
async function handleRegister(user){
    try{
        dispatch(setLoading(true))
        const data=await registerUser(user)
        dispatch(setUser(data.message))
        console.log(data.message)
    }catch(error){
        
        dispatch(setError(error.response?.data?.message||error.message))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handleLogin(user){
    try{
        dispatch(setLoading(true))
        const data=await LoginUser(user)
        dispatch(setUser(data.user))
        console.log(data.user)
    }catch(error){
        dispatch(setError(error.response?.data?.message||error))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handleLogout(){
    try{
        dispatch(setLoading(true))
        const data=await LogoutUser()
        dispatch(setUser(null))
    }catch(error){
        dispatch(setError(error))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handlegetMeUser(){
    try{
        dispatch(setLoading(true))
        const data=await GetMeUser()
        dispatch(setUser(data.user))
        console.log(data.user)
    }catch(error){
        if(error.response.status==401){
          try{
            await RefreshPageUser()
            const data=await getMeUser()
            dispatch(setUser(data.user))
            console.log(data.user)
          }catch(error){
            dispatch(setUser(null))
          }
        }
        else{
            dispatch(setError(error.response?.data?.message||"Something went wrong"))
        }
    }
    finally{
        dispatch(setLoading(false))
    }
}
return{
    handleLogin,
    handleLogout,
    handleRegister,
    handlegetMeUser
}

}