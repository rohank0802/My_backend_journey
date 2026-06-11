const blacklistModel = require("../models/blacklist.model")
const userModel=require("../models/user.model")
const redis=require("../config/cache")
const jwt=require("jsonwebtoken")

async function authAccessUser(req,res,next){
try{

    const token=req.cookies["access_jwt"]
    const refreshToken=req.cookies["refresh_jwt"]
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

// this wais is for mogo db database for check the token in database
// const isTokenBlacklisted=await blacklistModel.findOne({
//     $or:[

//         {token},{refreshToken}
//     ]
// })


// know we will get that from redish cloud databse
const isTokenBlacklisted=await redis.get(`access:${token}`)
if(isTokenBlacklisted){
    return res.status(401).json({
        message:"access token blacklisted"
    })
}
const isRefreshTokenBlacklisted=await redis.get(`refresh:${refreshToken}`)
if(isRefreshTokenBlacklisted){
    return res.satus(401).json({
        message:"refresh token is blacklisteddd"
    })
}


        const decoded=jwt.verify(
            token,process.env.JWT_SECRET
        )
        req.user=decoded
        next()
        
}
catch(err){
return res.status(401).json({
    message:"invalid token",
    err:err.message
})
}
}



module.exports=authAccessUser