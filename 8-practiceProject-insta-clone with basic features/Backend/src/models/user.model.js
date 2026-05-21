const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    username:{
        type:String,
        unique:[true,"user name already exist"],//means useer name should be unique
        required:[true,"User name is required"]//means write username is compulsory
    },
    email:{
        type:String,
        unique:[true,"email is already exist"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Email is required"],
        minlength:8,
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/tyc9tb9h1/defaultImage.avif"
    }
})

const userModel=mongoose.model("usersDetails",userSchema)

module.exports=userModel