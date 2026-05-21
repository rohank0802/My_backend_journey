import axios from "axios"

const api=axios.create({
     baseURL:import.meta.env.VITE_FEED_API,
     withCredentials:true
})

export async function getFeed(){
    try{

        const response=await api.get("/feed")
        return response
    }
    catch(err){
        console.log(err.message)
    }
}