import jwt from "jsonwebtoken"

export const authAcessUser=(req,res,next)=>{
    try{
        const accessToken=req.cookies.accessToken
        
        if(!accessToken){
            return res.status(401).json({
                success:false,
                message:"Access token missing"
            })
        }
        const decoded=jwt.verify(accessToken,process.env.ACCESS_JWT)
        req.user=decoded
        next()
    }
    catch(err){
        return status(401).json({
            success:false,
            message:'access token expired'
        })
    }
}