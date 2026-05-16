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
    followee:followeeUsername,
    status:{
        $in:["pending","accepted"]
    }
})


if(isAlreadyFollowing){
    return res.status(200).json({
        message:`you already following ${followeeUsername}`,
        follow:isAlreadyFollowing
    })
}

const followRecord=await followModel.create({
    follower:followerUsername,
    followee:followeeUsername,
    status:"pending"
})
res.status(201).json({
    message:`yor are know following ${followeeUsername}`,
    follow:followRecord
})
}
//for accept follow request
async function acceptFollowRequest(req,res){
    try{

        const requestId=req.params.id
        const request=await followModel.findById(requestId)
        if(!request){
            return res.status(404).json({
                message:"request not found"
            })
        }
        //change status 
        request.status="accepted"
        //save updated request
        await request.save()
        res.status(200).json({
            message:"folloe request accepted",
            follow:request
        })
        }
        catch(err){
          res.status(500).json({
            message:`${err.message},error while creating accept req function`
          })
        }
    }

async function rejectFollowRequest(req,res){
   try{
const requestId=req.params.id

    const request=await followModel.findById(requestId)

    if(!request){
       return res.status(404).json({
            message:"user not found"
        })
    }

    request.status="rejected"
    await request.save()
    res.status(200).json({
        message:"request successfuly rejected"
    })
   }
   catch(err){
  res.status(500).json({
    message:`${err.message},error while creating rejectRequest function`
  })
   }
    
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
    unfollowUserController,
    acceptFollowRequest,
    rejectFollowRequest
}