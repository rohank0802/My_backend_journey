import {login ,register,getMe,logout} from "../services/auth.api"
import { useContext } from "react"
import { authContext } from "../auth.context"


export const useAuth=()=>{
 const context=useContext(authContext)
 const {user,setUser,loading,setLoading}=context

// function for register
async function handleRegister(registerUserData){
setLoading(true)
try{
    const data=await register(registerUserData)
    setUser(data.data)
}
catch(err){
    console.log(err)
}
finally{
    setLoading(false)
}

}

// function for handle login

async function handleLogin(loginUserData){
setLoading(true)
try{
    const data=await login(loginUserData)
   
    setUser(data.data)
}
catch(err){
    console.log(err.message)
}
finally{
    setLoading(false)
}

}


// get-me 

async function handleGetMe(){
setLoading(true)
try{
    const data=await getMe()
    setUser(data.data)
}
catch(err){
    console.log(err)
}
finally{
    setLoading(false)
}
}

//logout
async function handleLogout(){
setLoading(true)
try{
    const data=await logout()
    setUser(null)
}
catch(err){
    console.log(err)
}
finally{
    setLoading(false)
}
}
return(
    {
        user,loading,handleRegister,handleLogin,handleGetMe,handleLogout
    }
)
}