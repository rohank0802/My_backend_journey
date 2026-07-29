import axios from "axios"

const authApiInstance=axios.create({
    baseURL:import.meta.env.VITE_AUTH_URL,
    withCredentials:true
})

//register action
export const registerUser=async(RegisterUserData)=>{
    try{
        const response=await authApiInstance.post("/register",RegisterUserData)
        return response.data
    }catch(error){
        throw error
    }
}


//login action
export const loginUser=async(LoginUserData)=>{
    try{
        const response=await authApiInstance.post("/login",LoginUserData)
        return response.data
    }catch(error){
        throw error
    }
}

//get-Me action
export const getMe=async()=>{
    try{
        const response=await authApiInstance.get("/get-me")
        return response.data
    }catch(error){
        throw error
    }
}

//refreshPage action
export const refreshPage=async()=>{
    try{
        const response=await authApiInstance.get("/refresh-page")
        return response.data
    }catch(error){
        throw error
    }
}

//Logout action
export const logoutUser=async()=>{
    try{
        const response=await authApiInstance.post("/logout")
        return response.data
    }catch(error){
        throw error
    }
}