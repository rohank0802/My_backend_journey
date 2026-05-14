const followModel = require("../models/follow.model")

const userModel = require("../models/user.model")

async function followUserController(req,res){
    // with this we will get follower username from cookie
const followerUsername=req.user.username
// with params we will get followee username
const followeeUsername=req.params.username
//check user wants to follow the followee does he exist
const isFolloweeExists=await userModel.findOne({
    username:followeeUsername
})
if(!isFolloweeExists){
    return res.status(404).json({
        message:"User you are trying to follow doesn,t exist"
    })
}

// check user not follow himself
if(followerUsername===followeeUsername){
   return res.status(400).json({
        message:"you cannot follow yourself"
    })
}

// check same user don,t follow again
const isAlreadyFollowing=await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
})


if(isAlreadyFollowing){
    return res.status(200).json({
        message:`you already following ${followeeUsername}`,
        follow:isAlreadyFollowing
    })
}

const followRecord=await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
})
res.status(201).json({
    message:`yor are know following ${followeeUsername}`,
    follow:followRecord
})
}


// unfollow Controller
async function unfollowUserController(req,res){
  // with this we will get follower username from cookie
const followerUsername=req.user.username
// with params we will get followee username
const followeeUsername=req.params.username
//first we will find user in followModel collection
 const isUserFollowing=await followModel.findOne({
     follower:followerUsername,
    followee:followeeUsername
 })
 // if user not fund in that collection
 if(!isUserFollowing){
    return res.status(200).json({
        message:"You are not following this user"
    })
 }
 // if user found in that collection we will delete 
 await followModel.findByIdAndDelete(isUserFollowing._id)
 res.status(200).json({
    message:`you have unfollowed ${followeeUsername}`

 })
}
module.exports={
    followUserController,
    unfollowUserController
}