import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_AUTH_URL,
    withCredentials:true
})

export async function register(registerUserData){
    try{

        const response =await api.post("/register",registerUserData)
        
        return response.data
    }
    catch(err){
        console.log(err.message)
    }
}

export async function login(loginUserData){
    try{

        const response =await api.post("/login",loginUserData)
        
        return response.data
    }
    catch(err){
        console.log(err.message)
    }
}

export async function getMe(){
    try{

        const response =await api.get("/get-me")
        return response.data
    }
    catch(err){
        console.log(err.message)
    }
}

export async function logout(){
    try{

        const response =await api.post("/logout")
        return response.data
    }
    catch(err){
        console.log(err.message)
    }
}