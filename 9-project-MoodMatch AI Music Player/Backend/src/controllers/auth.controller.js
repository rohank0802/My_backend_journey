const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const blacklistModel=require("../models/blacklist.model")
async function registerUserController(req,res){

    try{

        const {username,email,password}=req.body
       
        const isAlreadyRegister=await userModel.findOne({
           $or:[
               {email},
               {username}
           ]
        })
       
        if(isAlreadyRegister){
           return res.status(400).json({
               message:"User with the same email or username is already exists"
           })
       
        }
       
        if(password.length<8){
           return res.status(400).json({
               message:"password should be more the 8 words"
           })
        }
        const hashedPassword=await bcrypt.hash(password,10)
       
        const user=await userModel.create({
           username,email,password:hashedPassword
        })
        // creating signIn token
        const token=jwt.sign({
           id:user._id,
           username:user.username
        },process.env.JWT_SECRET,{expiresIn:"1h"})
        res.cookie("access_jwt",token,{ secure:false,
               sameSite:"lax",httpOnly:true})
       
       // creating refresh token
       const refreshToken=jwt.sign({
           id:user._id,
            username:user.username
       },process.env.JWT_REFRESH_SECRET,{expiresIn:"3d"})
       res.cookie("refresh_jwt",refreshToken,{
           sameSite:"lax",
           secure:false,
           httpOnly:true
       })
       res.status(201).json({
           message:"account created sucessfully",
           data:{
               id:user._id,
               username:user.username,
               email:user.email
           }
       })
    }
    catch(err){
     res.status(500).json({
        message:'internal server error',
        err:err.message
     })
    }

}

async function loginUserController(req,res){
    try{

        const {username,email,password}=req.body
        const user=await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        }).select("+password")
        if(!user){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }
        const isPasswordMatched=await bcrypt.compare(password,user.password)
        if(!isPasswordMatched){
             return res.status(401).json({
                message:"invalid credentials"
            })
        }
    
      // create token
      const token=jwt.sign({
        id:user._id,
        username:user.username
      },process.env.JWT_SECRET,{expiresIn:"1h"})
      res.cookie("access_jwt",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
      })
      //refresh token
    
       const refreshToken=jwt.sign({
        id:user._id,
        username:user.username
      },process.env.JWT_SECRET,{expiresIn:"3d"})
      res.cookie("refresh_jwt",refreshToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
      })
      res.status(200).json({
        message:"loggedIn sucessfully",
        data:{
            id:user._id,
            username:user.username,
            email:user.email
        }
      })
    }
    catch(err){
        res.status(500).json({
            message:"internal server error",
            err:err.message
        })
    }
}

//refresh controller
async function refreshPageController(req,res){
    let user
    try{
        const userId=req.user.id
        user=await userModel.findById(userId)
                if(!user){
                    return res.status(401).json({
                        message:"user not found"
                    })
                }
                res.status(200).json({
            message:" auto reLoggin sucessfull",
            data:{
                 id:user._id,
            username:user.username,
            email:user.email
            }
        })
    }
    catch(err){
    const refreshToken=req.cookies["refresh_jwt"]
    if(!refreshToken){
         return res.status(401).json({
            message:'refresh token is missing please login again',
            err:err.message
        })
    }
    try{
  const refreshdecoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)

  const newAccessToken=jwt.sign({
    id:refreshdecoded.id,
    username:refreshdecoded.username
  },process.env.JWT_SECRET,{expiresIn:"1h"})
  res.cookie("access_jwt",newAccessToken,{httpOnly:true,secure:false,sameSite:"lax"})
  
  const user=await userModel.findById(refreshdecoded.id)
  if(!user){
    return res.status(404).json({
        message:"user not found"
    })
  }
   res.status(200).json({
    message:"reLoggin sucessully",
    data:{
            id:user._id,
            username:user.username,
            email:user.email
    }
   })
    }
    catch(err){
        return res.status(401).json({
            message:'refresh token invalid or expired',
            err:err.message
        })
    }
   
    }
}

async function logoutUser(req,res){
const token=req.cookies["access_jwt"]
const refreshToken=req.cookies["refresh_jwt"]
res.clearCookie("access_jwt")
res.clearCookie("refresh_jwt")
await blacklistModel.create({
    token,refreshToken
})
res.status(201).json({
    message:"Logout sucessfully"
})
}

module.exports={
registerUserController,
loginUserController,
refreshPageController,
logoutUser
}