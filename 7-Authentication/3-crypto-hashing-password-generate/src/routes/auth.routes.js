const express=require("express")
const authRouter=express.Router()
const userFormatModel=require("../model/auth.model")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
//for signup user
authRouter.post("/register",async (req,res)=>{
    try{
     const {name,email,password}=req.body
     const alreadyEmailExcestedCheck=await userFormatModel.findOne({email})
     if(alreadyEmailExcestedCheck){
       return res.status(409).json({
         message:"user already registered with this email"
        })
     }
     if(password.length<8){
        return res.status(400).json({
            message:"password length should be more than 8 characters"
        })
     }
     // creating crypto hashing password
     const hashedPassword=crypto.createHash("sha256").update(password).digest("hex")

     const userDeatils=await userFormatModel.create({
        name,email,password:hashedPassword
     })
     const token=jwt.sign({
        jjwt_token:userDeatils._id
     },process.env.JWT_TOKEN)
     res.cookie("jjwt_token",token)
     res.status(200).json({
        message:"signUp sucessfull"
     })
    }
    catch(err){
     console.log(err.message,"server side problem")
    }
})

//for signin user



authRouter.post("/login",async (req,res)=>{
    try{
  const {email,password}=req.body
  const userDetails=await userFormatModel.findOne({email})
  if(!userDetails){
   return  res.status(400).json({
        message:"invalid email"
    })
  }
if(password.length<8){
        return res.status(400).json({
            message:"password length should be more than 8 characters"
        })
    }

  const matchedPassword=crypto.createHash("sha256").update(password).digest("hex")

  if(matchedPassword !== userDetails.password  ){
   return res.status(400).json({
        message:"invalid user details"
    })
  }
   const token=jwt.sign({
    jwt_token:userDetails._id
   },process.env.JWT_TOKEN)
   res.cookie("jwt_token",token)
   res.status(200).json({
    message:"login sucessfull"
   })
    }
    catch(err){
     console.log(err.messsage,"error from server side")
    }
})
module.exports=authRouter