import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"

// register controller
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

    const emailVerificationToken=jwt.sign({
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity!",
        
        html:`<p>Hi ${username},</p>
        <p>Thank you from registring at <strong>Perplexity</strong>.We're  We're excited to have you on board!</p>
        <p>Please verify your email address by clicking the link below</p>
          <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
          <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>`
    })

    res.status(201).json({
        message:"User registered successfully",
        sucess:true,
    })
    
}
// verifyEmailController
export async function verifyEmailController(req,res){
const {token}=req.query;
try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findOne({email:decoded.email})
    if(!user){
        return res.status(400).json({
            message:"Invalid Token",
            sucess:false,
            err:"user not found"
        })
    }
    user.verified=true;
    await user.save()
   return res.send(`
        <h1>Email verified successfully</h1>
        <p>Your email has been verified.You can now login to your account</p>
        `)
}
catch(err){
    return res.status(400).json({
        message:"Invalid or expired token",
        success:false,
        err:err.message
    })
}
}


//loginController
export async function loginController(req,res){
const {emailOrUsername,password}=req.body

const user=await userModel.findOne({
    $or:[
        {email:emailOrUsername},
        {username:emailOrUsername}
    ]
}).select("+password")

if(!user){
    return res.status(400).json({
        message:"Invalid email/username or password",
        success:false,
        err:"User not found"
    })
}
const matchPassword=await user.comparePassword(password)
if(!matchPassword){
    return res.status(400).json({
        message:"Invalid credentials",
        success:false,
    })
}
if(!user.verified){
    return res.status(400).json({
        success:false,
        message:"Please verify your email befor login",
        err:"email not verified"
    })
}
const accessToken=jwt.sign({
    id:user._id,
    username:user.username
},process.env.ACCESS_JWT,{expiresIn:"1h"})
res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:false,
    sameSite:"strict"
})
const refreshToken=jwt.sign({
    id:user._id,
    username:user.username
},process.env.REFRESH_JWT,{expiresIn:"7d"})

res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"strict"
})
res.status(200).json({
    message:"loggedIn successful",
    success:true,
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
}

//getme controllers
export async function getMeController(req,res){
    console.log(req.user.id)
    try{
        const user=await userModel.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}