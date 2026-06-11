const mongoose=require("mongoose")

const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for blacklisting"]
    },
     refreshToken:{
        type:String,
        required:[true,"refreshtoken is required for blacklisting"]
    }
},{timestamps:true})

const blacklistModel=mongoose.model("blacklistTokens",blacklistSchema)

module.exports=blacklistModel