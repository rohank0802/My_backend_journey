import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_FOLLOW_API,
    withCredentials:true
})

export const getAllUsers=async()=>{
    try{
        const response=await api.get("/getAll-users")
        return response
    }
    catch(err){
  console.log(err)
    }
}

