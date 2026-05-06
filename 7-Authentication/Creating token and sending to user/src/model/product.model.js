const mongoose=require("mongoose")
const userDetailsSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"user already exist"]
    },
    password:String
})
const userDetailsModel=mongoose.model("SignUpDetails",userDetailsSchema)
module.exports=userDetailsModel