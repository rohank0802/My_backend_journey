import { useDispatch } from "react-redux";
import { setUser,setError,setLoading } from "../auth.slice.js";

import {SellerGetMeUser,SellerLoginUser,SellerLogoutUser,SellerRefreshPageUser,SellerRegisterUser} from "../service/sellerAuth.api.js"
export const useSellerAuth=()=>{
    const dispatch=useDispatch()
  
async function handleSellerRegister(user){
    try{
        dispatch(setLoading(true))
        const data=await SellerRegisterUser(user)
        dispatch(setUser(data.message))
        console.log(data.message)
    }catch(error){
        
        dispatch(setError(error.response?.data?.message||error.message))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handleSellerLogin(user){
    try{
        dispatch(setLoading(true))
        const data=await SellerLoginUser(user)
        dispatch(setUser(data.user))
        console.log(data.user)
    }catch(error){
        dispatch(setError(error.response?.data?.message||error))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handleSellerLogout(){
    try{
        dispatch(setLoading(true))
        const data=await SellerLogoutUser()
        dispatch(setUser(null))
    }catch(error){
        dispatch(setError(error))
    }
    finally{
        dispatch(setLoading(false))
    }
}

async function handleSellergetMeUser(){
    try{
        dispatch(setLoading(true))
        const data=await SellerGetMeUser()
        dispatch(setUser(data.user))
        console.log(data.user)
    }catch(error){
        if(error.response.status==401){
          try{
            await SellerRefreshPageUser()
            const data=await SellerGetMeUser()
            dispatch(setUser(data.user))
            console.log(data.user)
          }catch(refreshError){
            dispatch(setUser(null))
            return;
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
    handleSellerLogin,
    handleSellerLogout,
    handleSellerRegister,
    handleSellergetMeUser
}

}