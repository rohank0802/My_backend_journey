// this file is only for authentication routes
const express=require("express")
const authRouter=express.Router()//we this this when i have to create api is in other file,like other than the app.js
const jwt=require("jsonwebtoken")
const userDetailsModel=require("../model/product.model")


authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body

    const isUserAlreadyExist=await userDetailsModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }
const userDetail=  await userDetailsModel.create({
        name,email,password
    })
    //creating token
    const token=jwt.sign(
        {
        id:userDetail._id
    },
     process.env.JWT_SECRET       
)
res.cookie("jwt-token",token,{httpOnly:true})
    res.status(201).json({
        message:"user registered sucessfuly",
        userDetail
    })
})

module.exports=authRouter