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
        id:userDeatils._id
     },process.env.JWT_TOKEN,{expiresIn:"1h"})
     res.cookie("jjwt_token",token)
     res.status(200).json({
        message:"signUp sucessfull"
     })
    }
    catch(err){
     console.log(err.message,"server side problem")
    }
})

// for authentication check / session restore
//when the frontend page refresh all the concent should  gone and just only token will saved in the browser backend took that token and varify that token ,after varification backend gave login access automatically

authRouter.get("/get-me",async(req,res)=>{
    
try{
const accessToken=req.cookies.access-token
//varify access token
const decoded=jwt.verify(
    accessToken,process.env.JWT_TOKEN
)
const user=await userFormatModel.findById(decoded.id)
//db query
res.status(200).json({
    message:"user loged in",
    name:user.name,
    email:user.email
})
}
catch(err){
//access token expired
const refreshToken=req.cookies.refreshToken

if(!refreshToken){
   return  res.status(401).json({message:"please login again"})

}
try{
// verify refresh token
const decodedRefresh=jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH
)
//create new access token
const newAccessToken=jwt.sign({
    id:decodedRefresh.id
},process.env.JWT_TOKEN,{expiresIn:"1h"})

//create new access token cookie
res.cookie("access-token",newAccessToken)
res.status(200).json({
    message:"new access token created"

})
}
catch(err){
    console.log(err.message)
 res.status(401).json({
   
    message:"refresh token expired please login again"
 })
}
}

//   try{
//   const token=req.cookies.refreshToken
//     if(!token){
//         return res.status(401).json({
//             message:"no refresh token"
//         })
//     }
//     const decodedToken=jwt.verify(token,process.env.JWT_REFRESH)
//     const user=await userFormatModel.findById(decodedToken.id)
    
//     res.status(200).json({ 
//         name:user.name,
//         email:user.email
//     })
//   }
//   catch(err){
//    console.log(err.message,"refresh token error")
//   }
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
  // creating login token
   const token=jwt.sign({
    id:userDetails._id
   },process.env.JWT_TOKEN,{expiresIn:"1h"})
   res.cookie("access-token",token)
// creating refresh token for page reload
const refreshToken=jwt.sign({
    id:userDetails._id
   },process.env.JWT_REFRESH)
   res.cookie("refreshToken",refreshToken,{expiresIn:"7d"})


   res.status(200).json({
    message:"login sucessfull"
   })
    }
    catch(err){
     console.log(err.messsage,"error from server side")
    }
})

module.exports=authRouter