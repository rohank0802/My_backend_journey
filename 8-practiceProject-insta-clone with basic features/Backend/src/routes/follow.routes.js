const express=require("express")
const followController=require("../controllers/follow.controller")
const identifyUser=require("../middlewares/auth.middleware")
const followRouter=express.Router()


// @route post /api/users/follow/:userId
//@description follow a user
//@access private
followRouter.post("/follow/:username",identifyUser,followController.followUserController)

//for unfollow
//@route post /api/users/unfollow/:userId
followRouter.delete("/unfollow/:username",identifyUser,followController.unfollowUserController)

//accept follow request route
followRouter.post("/follow/accept/:id",identifyUser,followController.acceptFollowRequest)
// reject following request
followRouter.post("/follow/reject/:id",identifyUser,followController.rejectFollowRequest)
module.exports=followRouter