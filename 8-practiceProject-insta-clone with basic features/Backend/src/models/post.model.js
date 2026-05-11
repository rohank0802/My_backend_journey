const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    umgUrl:{
        type:String,
        required:[true,"imageurl is required for an post"]
    },
    user:{
      ref:"usersDetails",
      type:mongoose.Schema.Types.ObjectId,
      required:[true,"user id is required for creating post"]
    }
})

const postModel=mongoose.model("postsData",postSchema)
 
module.exports=postModel