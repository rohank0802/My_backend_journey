const blacklistModel = require("../models/blacklist.model")
const userModel=require("../models/user.model")
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

const isTokenBlacklisted=await blacklistModel.findOne({
    $or:[

        {token},{refreshToken}
    ]
})
if(isTokenBlacklisted){
    return res.status(401).json({
        message:"access token blacklisted"
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