const mongoose=require("mongoose")

userSignUpDetailsSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"email already exist"]
    },
    password:String
})
const userSignUpDetailsModel=mongoose.model("userSignUpDetails",userSignUpDetailsSchema)
module.exports=userSignUpDetailsModel