import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import {emailVerifyJwt} from "../config/config.js"
import {sendEmail} from "../services/mail.service.js"
import bcrypt from "bcrypt"
import { config } from "dotenv";



const registerLocal=async(req,res)=>{
const {email,contact,password,fullName}=req.body

try{
const existingUser=await userModel.findOne({
    $or:[
        {email},
        {contact}
    ]
})
if(existingUser){
    return res.status(500).json({
        message:"user with this  email or conatct already exist"
    })
}

const user=await userModel.create({email,contact,password,fullName})

const emailVerificationToken=jwt.sign({
    email:user.email
},emailVerifyJwt.EMAIL_VERIFY_JWT,{expiresIn:"1h"})

 await sendEmail({
        to:email,
        subject:"Welcome to StyleVerse",
        
        html:`<p>Hi ${fullName},</p>
        <p>Thank you from registring at <strong>StyleVerse</strong>.We're  We're excited to have you on board!</p>
        <p>Please verify your email address by clicking the link below</p>
          <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
          <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The StyleVerse Team</p>`
    })
    return res.status(201).json({
        success:true,
        message:"user registration successfull"
    })
}
catch(err){
console.log(err)
return res.status(500).json({message:"server error"})
}
}


async function verifyEmailController(req,res){
const {token}=req.query

try{
const decoded=jwt.verify(token,emailVerifyJwt.EMAIL_VERIFY_JWT)
const user=await userModel.findOne({email:decoded.email})
if(!user){
     return res.status(400).json({
            message:"Invalid Token",
            sucess:false,
            err:"user not found"
        })
}

if(user.verified){
    return res.send(`
     <h1>Email already verified </h1>
     <p>Your email is has already been verified</p>
     `)
}
user.verified=true
user.save()
 return res.send(`
        <h1>Email verified successfully</h1>
        <p>Your email has been verified.You can now login to your account</p>
         <a href="http://localhost:5173/login"> Go to Login</a>
        `)
    
    }
    catch(err){
        console.log(err.message)
   return res.status(200).json({
        success:false,
        message:"server error",
        err:err.message
    })
    }
}

//login controller
async function loginControllerLocal(){
    try{

        const {email,contact}=req.body
        const user=await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        }).select("+password")
        if(!user){
            return res.status(400).json({
                message:"Invalid email/username or password",
                success:false,
                err:"User not found"
            })
        }
        const matchPassword=user.comparePassword(password)
        if(!matchPassword){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false,
            })
        }
        if(!user.varified){
             return res.status(400).json({
                success:false,
                message:"Please verify your email befor login",
                err:"email not verified"
            })
        }
        //place access and rehresh tokens
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        
        const hashedRefreshToken=await bcrypt.hash(refreshToken,10);
        
        //storing only hashed refreh in db
        user.refreshToken=hashedRefreshToken
        await user.save({
            validateBeforeSave:false
        })
        
        //seding orignal refresh and acces token to browser
        res.cookie("refreshToken",refreshToken,{httpOnly:true,sameSite:"strict"})
        res.cookie("accessToken",accessToken,{httpOnly:true,sameSite:"strict"})
    }
    catch(error){
        res.status(500),json({
            success:false,
            message:"internal server error",
           error:error.message
        })
    }
}


// getme controller
async function getMeController(){
    try{
        const user=await userModel.findbyId(req.user.id).select("-password -refreshToken");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        };
        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
     return res.status(500).json({
        success:false,
        message:error.message
     })
    }
}

//refreshpage controller
async function refreshPageController(){
    try{

        const refreshToken=req.cookes.refreshToken;
        //verify jwt

        const decoded=jwt.verify(refreshToken,config.REFRESH_JWT)

        //finduser
        const user =await userModel.findbyId(decoded.id).select("+refreshToken")

        //Compare with hashed token in db
        const isMatched=await bcrypt.compare(
            refreshToken,user.refreshToken
        )
        if(!isMatched){
            throw new Error("Invalid refresh token")

        }

        //generate NEW token
        const newAccessToken=user.generateAccessToken();
        const newRefreshToken=user.generateRefreshToken();

        //hash new refresh token
        const hashed=bcrypt.hash(newRefreshToken,10)

        //save new hash token
        user.refreshToken=hashed
        await user.save({velidateBeforeSave:false})

        //replace cookie
        res.cookie("accessToken",newAccessToken,{httpOnly:true,sameSite:"strict"});
        res.cookie("refreshToken",newRefreshToken,{httpOnly:true,sameSite:"strict"});

    }
    catch(error){

    }
}

export {
    registerLocal,
    verifyEmailController,
    loginControllerLocal,
    getMeController,
    refreshPageController
}
