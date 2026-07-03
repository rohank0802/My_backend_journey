import { initializeSocketConnection } from "../service/chat.socket.js";
import {sendMessage,getChats,getMessages,deleteChat}from "../service/chat.api.js"
import { useDispatch, useSelector } from "react-redux";
import { setChats, setCurrentChatId, setError, setisLoading,createNewChat,addNewMessage,addMessages } from "../chat.slice.js";

export  function useChat(){

    const dispatch=useDispatch()
 const chats=useSelector((state)=>state.chat.chats)
   async function handleSendMessage({message,chatId}){
        dispatch(setisLoading(true))
        try{
            const data=await sendMessage({message,chatId})
        const {chat,aiMessage}=data
            dispatch(createNewChat({
                chatId:chat._id,
                title:chat.title,
            }))
        
        
        dispatch(addNewMessage({
            chatId:chat._id,
            content:message,
            role:"user"
        }))
        
        dispatch(addNewMessage({
            chatId:chat._id,
            content:aiMessage[0].content,
            role:aiMessage[0].role
        }))
      
        dispatch(setCurrentChatId(chat._id))
        console.log(chat._id)
        }
        catch(err){
      dispatch(setError(err.response?.data?.message||err.message))
      console.log(err)
      console.log(err.stack)
        }
        finally{
            dispatch(setisLoading(false))
        }
    }

    async function handleGetChats(){
        dispatch(setisLoading(true))
        try{
         const data=await getChats()
         const{chats}=data
         console.log(chats)
         dispatch(setChats(chats.reduce((acc,chat)=>{
            acc[chat._id]={
                id:chat._id,
                title:chat.title,
                messages:[],
                lastUpdated:chat.updatedAt
            }
            
            return acc
         },{})))
        }
        catch(err){
            dispatch(setError(err.message))
      console.log(err)
      console.log(err.stack)
        }
        finally{
            dispatch(setisLoading(false))
        }
    }

    async function handleOpenChat(chatId){
        console.log(chatId)
     dispatch(setisLoading(true))
     try{
       const data=await getMessages(chatId)
       const {messages}=data
       console.log(messages)
       const formatedMessages=messages.map(msg=>({content:msg.content,
        role:msg.role
       }))
       dispatch(addMessages({
        chatId,
        messages:formatedMessages
       }))
       dispatch(setCurrentChatId(chatId))
     }
       catch(err){
            dispatch(setError(err.message))
      console.log(err)
      console.log(err.message)
        }
        finally{
            dispatch(setisLoading(false))
        }
     
    }

return{
    initializeSocketConnection,handleSendMessage,handleGetChats,handleOpenChat
}
}