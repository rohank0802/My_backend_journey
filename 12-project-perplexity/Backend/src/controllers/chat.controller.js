import {generateResponse,generateChatTitle} from"../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import mongoose from "mongoose"
export async function sendMessage(req,res){
    const session=await mongoose.startSession()

    try{
       session.startTransaction()

        const {message,chat:chatId}=req.body
    
        let title=null,chat=null
        if(!chatId){
            title=await generateChatTitle(message)
            
            chat=await chatModel.create([{
                user:req.user.id,
                title
            }],{session})
            chat=chat[0]
        }
        const currentChatId=chatId||chat._id
        const userMessage=await messageModel.create([{
          chat:currentChatId,
          content:message,
          role:"user"
        }],{session})
        const messages=await messageModel.find({chat:currentChatId}).session(session).sort({createdAt:-1}).limit(20)
        messages.reverse()
        
        const result=await generateResponse(messages)
    
    
        const aiMessage=await messageModel.create([{
            chat:chatId||chat._id,
            content:result,
            role:"ai"
        }],{session})

        await session.commitTransaction()
        res.status(200).json({
            success:true,
            chat,
            aiMessage
        })   
    }
    catch(err){
await session.abortTransaction()
res.status(500).json({
    success:false,
    message:err.message

})
    }
    finally{
      session.endSession()
    }
}

export async function getChats(req,res){
    try{

        const user=req.user
    
        const chats=await chatModel.find({user:user.id})
    
        res.status(200).json({
         success:true,
         message:"Chats retrived sucessfully",
         chats
        })
    }
    catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
     })
    }
}

export async function getMessages(req,res){
    try{
     const {chatId}=req.params
     const chat=await chatModel.findOne({
        _id:chatId,
        user:req.user.id
     })
     if(!chat){
       return res.status(404).json({
            success:false,
            message:"chat not found"
        })
     }
     const messages=await messageModel.find({
        chat:chatId
     })
    res.status(200).json({
        success:true,
        message:"Message retrived successfully",
        messages
    })
    }
    catch(err){
    res.status(500).json({
        success:false,
        message:err.message,
        
    })
    }
}

export async function deleteChats(req,res){
    const session=await mongoose.startSession()
    try{
        session.startTransaction()
        const {chatId}=req.params
        //chat deletion
       const chat= await chatModel.findOneAndDelete({_id:chatId,user:req.user.id},{session})
        //message deletion
        await messageModel.deleteMany({
            chat:chatId
        },{session})
        if(!chat){
            res.status(404).json({
                success:false,
                message:"chat not found"
            })
        }
        await session.commitTransaction()
    res.status(200).json({
        success:true,
        message:"chats and messages delete successfully",
        chat
    })
    }
    catch(err){
        await session.abortTransaction()
        res.status(500).json({
            success:false,
        message:err.message
    })
    }
    finally{
        session.endSession()
    }
}

