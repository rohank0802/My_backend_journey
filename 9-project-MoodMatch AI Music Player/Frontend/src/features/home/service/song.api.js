import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_SONG_URL,
    withCredentials:true
})

export async function getSong({mood}){
 const response=await api.get(`/?mood=${mood}`)

 return response.data
}
