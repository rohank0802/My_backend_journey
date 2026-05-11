const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")

//register controller
async function registerController (req,res){
    try{
 const {name,username,email,password,bio,profileImage}=req.body

// checking user name and email is already exist in db
const isUseralreadyExists=await userModel.findOne({
    $or:[
{username},
{email}
]
})
if(isUseralreadyExists){
    return res.status(409).json({
        message:`${isUseralreadyExists.email=== email?"Email already exist":"username already exist"}`
    })
}

//password length check
    if(password.length<8){
  return res.status(400).json({
message:"password should be more than 8 characters"
})

    }
    const hashedPassword=await bcrypt.hash(password,10)

    // know after all check creating user in db
    const createUser=await  userModel.create({
        name,username,email,password:hashedPassword,bio,profileImage
    })
    const token=jwt.sign({
        id:createUser._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})
    res.cookie("access-jwt",token)
    res.status(201).json({
        message:"account created sucessfully"
    })
    }
    catch(err){
      res.status(400).json({
        message:`${err.message},error while creating the useraccount`
      })
    }
   
}

//login controller
async function  loginController (req,res){
  try{
  const{username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(!user){
       return res.status(400).json({
            message:`user not found please try to login with valid id and pass`
        })
    }
    const isPasswordMatched=await bcrypt.compare(password,user.password)
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"wrong pass"
        })
    }
    // creating acess token
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})
    res.cookie("access-jwt",token)

    // creating refresh token
    const refreshToken=jwt.sign({
        id:user._id
    },process.env.JWT_REFRESH_SECRET,{expiresIn:"3d"})
    res.cookie("refresh-jwt",refreshToken)
    res.status(200).json({
        message:"login successful"
    })
  }
  catch(err){
  res.status(400).json({
    message:`${err.message},-server error while creating login`
  })
  }
}
//refresh page controller
async function refreshPageController(req,res){
    try{

        const accessToken=req.cookies["access-jwt"]
        const decoded=jwt.verify(accessToken,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded.id)
        return res.status(200).json({
            message:"auto relogin successful old"
        })
    }
    catch(err){
     const refreshToken=req.cookies["refresh-jwt"]
     if(!refreshToken){
       return res.status(401).json({
            message:`${err.message}, please login again`
        })
     }
     try{
        //verifying refresh token
     const refreshDecoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)

     // creating new accesstoken
       const creatingNewAccessToken=jwt.sign({
        id:refreshDecoded.id
       },process.env.JWT_SECRET,{expiresIn:"1h"})
       res.cookie("access-jwt",creatingNewAccessToken)
       res.status(201).json({
        message:"new accessToken created you are reLogedIn automatically"
       })
     }
     catch(err){
   res.status(401).json({
    message :`${err.message},-refresh token expired please login again`
   })
     }
    }
}

module.exports={
    registerController,
    loginController,
    refreshPageController
}