const mongoose=require("mongoose")

const followsSchema=new mongoose.Schema({
    follower:{
        type:String,
    },
    followee:{
         type:String
    }
},{
    timestamps:true
})
// check in detabse that followee and follow shold not repeat again
 followsSchema.index({follower:1,followee:1},{unique:true})

const followModel=mongoose.model("follows",followsSchema)

module.exports=followModel