import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_FOLLOW_API,
    withCredentials:true
})

export const createFollow=async(username)=>{
    const response=await api.post(`/follow/${username}`)
    return response
}

export const createAcceptFollow=async (followee)=>{
const response=await api.post(`/follow/accept/${followee}`)
return response
}

export const createUnFollow=async(username)=>{
    const response=await api.delete(`/unfollow/${username}`)
    return response
}

export const createFollowing=async(username)=>{
    const response=await api.get(`/following/${username}`)
    return response
}
export const createFollower=async(username)=>{
    const response=await api.get(`/follower/${username}`)
    return response
}