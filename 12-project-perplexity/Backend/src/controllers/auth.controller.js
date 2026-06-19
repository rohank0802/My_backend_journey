import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"
export async function registerController(req,res){
    const {username,email,password}=req.body

    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"USer with this email or username already exists",
            sucess:false,
            err:"USer already exists"
        })
    }
    const user=await userModel.create({username,email,password})
    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity!",
        
        html:`<p>hi ${username}</p>
        <p>Thank you from registring at <strong>Perplexity</strong>.We're  We're excited to have you on board!</p>
        <p>Best regards,<br>The Perplexity Team</p>`
    })
    res.status(201).json({
        message:"Uer registered successfully",
        sucess:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
    
}
