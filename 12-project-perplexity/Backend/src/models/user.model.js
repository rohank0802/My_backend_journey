import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    verified:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password"))return
        this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword=function(userPassword){
return bcrypt.compare(userPassword,this.password)
}

const userModel=mongoose.model("userDetails",userSchema)

export default userModel