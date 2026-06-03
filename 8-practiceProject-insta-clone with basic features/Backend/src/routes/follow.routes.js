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
followRouter.post("/follow/accept/:followee",identifyUser,followController.acceptFollowRequest)
// reject following request
followRouter.post("/follow/reject/:followee",identifyUser,followController.rejectFollowRequest)

// give all the users name and prifile after verify
followRouter.get("/getAll-users",identifyUser,followController.getAllUsersController)
//following route
followRouter.get("/following/:username",identifyUser,followController.getFollowingController)

//follower route
followRouter.get("/follower/:username",identifyUser,followController.getFollowerController)

module.exports=followRouter