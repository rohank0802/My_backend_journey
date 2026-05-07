const express =require("express")
const authRouter=express.Router()
const userSignUpDetailsModel=require("../models/product.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
authRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body
        //we are creating hasted pass with bcrypt
        const hashedPassword=await bcrypt.hash(password,10)

        const userAlreadyExisted=await userSignUpDetailsModel.findOne({email})
        if(userAlreadyExisted){
            return res.status(400).json({
                message:"user already in out directory"
            })
        }
        const userDetails = await userSignUpDetailsModel.create({
         name,email,password:hashedPassword
        })
        const token= jwt.sign(
            {
                id:userDetails._id
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_tok",token)
        res.status(201).json({
            message:"usercreated sucessfully",
            userDetails
        })
    } catch (error) {
        res.send(error.message)
    }
})



// /api/auth/protected
// with we can check the cookies in sevrer side
authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies)
  res.status(200).json({
    message:"i got cookies"
  })
})


//creating token for login req
authRouter.post("/login",async(req,res)=>{
    try{
    const{email,password}=req.body
const user=await userSignUpDetailsModel.findOne({email})

if(!user){
return res.status(404).json({
    message:"user not found with this email address"
})
}
//we are comparing db pass with re.body pass
const isPasswordMatched=await bcrypt.compare(password,user.password)

if(!isPasswordMatched){
   return res.status(401).json({
        message:"Invalid User Details"
    })
}

const token=jwt.sign({
    id:user._id,
},
process.env.JWT_SECRET
)
res.cookie("jwtt_token",token)

res.status(200).json({
    message:"user logged in sucessfully",
})
}catch(err){
    console.log(err)
res.status(500).json({
    message:"internal server error"
})
}
})
module.exports=authRouter