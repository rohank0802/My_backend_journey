import { createContext,useState,useEffect } from "react";
import {login,register,getMe} from "./services/auth.api"
export const authContext=createContext()


export function AuthProvider({children}){
const[user,setUser] =useState(null)
const[loading,setLoading]=useState(false)

//for login
const handleLogin=async (formLoginData)=>{
setLoading(true)
try{
const response=await login(formLoginData)
setUser(response.data)

return response
}
catch(err){
console.log(err.message)
}
finally{
    setLoading(false)
}
}

//register
const handleRegister=async(registerFormdata)=>{
    setLoading(true)
    try{
        const response=await register(registerFormdata)
        setUser(response.data)
        return response
    }
    catch(err){
     console.log(err.message)
    }
    finally{
        setLoading(false)
    }
}

return(
    <authContext.Provider value={{user,loading,handleLogin,handleRegister}}>
        {children}
    </authContext.Provider>
)
}