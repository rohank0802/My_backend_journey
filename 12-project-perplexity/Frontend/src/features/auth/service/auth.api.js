import axios from "axios";


const api=axios.create({
    baseURL:import.meta.env.VITE_AUTH_URL,
    withCredentials:true
})

// for register api
export async function registerApi(userRegisterData){
try{
    const response=await api.post("/auth/register",userRegisterData)
    return response.data
}
catch(err){
    console.log("something went wrong while fetching register api")
    // console.log(err.message.data)
}
}

//for login api
export async function loginApi(userLoginData){
try{
    const response=await api.post("/auth/login",userLoginData)
    console.log(response)
    return response.data
}
catch(err){
    
    throw err
    // console.log(err.response.data)
}
}


//for getMe api
export async function getMeApi(){
try{
    const response=await api.get("/auth/get-me")
    return response.data
}
catch(err){
   
    throw err;
}
}


// for refreshpage api
export async function refreshPageApi(){
try{
    const response=await api.get("/auth/refresh-page")
    return response.data
}
catch(err){
   
    throw err
}
}


//for logout api
export async function logoutApi(){
try{
    const response=await api.post("/auth/logout")
    return response.data
}
catch(err){
    console.log("something went wrong while fetching logout api")
}
}