import axios from "axios";

const api=axios.create({
     baseURL:import.meta.env.VITE_CHAT_URL,
    withCredentials:true
})

export  const sendMessage=async({message,chatId})=>{
    try{

        const response=await api.post("/chat/message",{message,chatId})
        return response.data
    }
    catch(err){
        console.log(err.message)
        throw err
    }
}
export  const getChats=async()=>{
    try{
        const response=await api.get("/chat")
        return response.data
    }
    catch(err){
        console.log(err.message)
        throw err
    }
}

export  const getMessages=async(chatId)=>{
    try{
        const response=await api.get(`/chat/${chatId}/messages`)
        return response.data

    }
    catch(err){
        console.log(err.message)
        throw err
    }
}

export  const deleteChat=async({chatId})=>{
    try{
        const response=await api.delete(`/chat/deleteChat/${chatId}`)
        return response.data
    }
    catch(err){
        console.log(err.message)
        throw err
    }
}