import axios from "axios";

const API_URL=process.env.VITE_AUTH_URL;

const authApi=axios.create({
    baseURL:meta.env.VITE_AUTH_URL,
    withCredentials:true
})

export const registerUser=async(user)=>{
    try {
        const res=await authApi.post("/register",user)
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const LoginUser=async(user)=>{
    try {
        const res=await authApi.post("/login",user)
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const GetMeUser=async()=>{
    try {
        const res=await authApi.get("/get-me")
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const RefreshPageUser=async()=>{
    try{
        const res=await authApi.get("/refresh-page")
        return res.data;
    }catch(error){
        throw error;
    }
}

export const LogoutUser=async()=>{
    try{
        const res=await authApi.get("/logout")
        return res.data;
    }catch(error){
        throw error;
    }
}