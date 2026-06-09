const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is requires"],
        unique:[true,"Username must be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is requires"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is requires"],
        minlength:8,
        select:false
    }
})
const userModel=mongoose.model("users",userSchema)

module.exports=userModel