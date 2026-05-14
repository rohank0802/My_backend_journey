const jwt =require("jsonwebtoken")

async function identifyUser(req,res,next){

    //getting token from cookies
    const token=req.cookies["access-jwt"]
    if(!token){
        return res.status(401).json({
            message:"token not provided,unauthorizes access"
        })
    }
    
    let decoded
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        res.status(401).json({
            message:`${err.message},"user not authorized"`
        })
    }
    req.user=decoded
    next()
}

module.exports=identifyUser