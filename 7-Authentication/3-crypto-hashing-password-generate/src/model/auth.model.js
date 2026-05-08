const mongoose=require("mongoose")

const userFormatSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:[true,"email already exist"]
    },
    password:{
        type:"string",
        required:"true",
        minlength:8
    }
})
const userFormatModel=mongoose.model("AuthUserDeatils",userFormatSchema)
module.exports=userFormatModel