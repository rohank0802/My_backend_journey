import jwt from "jsonwebtoken"
import redis from '../config/cache.redis.js'
export const authAcessUser=async(req,res,next)=>{
    try{
        const accessToken=req.cookies.accessToken
        
        if(!accessToken){
            return res.status(401).json({
                success:false,
                message:"Access token missing"
            })
        }

        const isTokenBlacklisted=await redis.get(`access:${accessToken}`)

        if(isTokenBlacklisted){
            return res.status(401).json({
                success:false,
                message:"token blacklisted"
            })
        }

        const decoded=jwt.verify(accessToken,process.env.ACCESS_JWT)
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'access token expired',
            err:err.message
        })
    }
}