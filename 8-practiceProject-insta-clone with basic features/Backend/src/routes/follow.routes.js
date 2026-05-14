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
followRouter.post("/unfollow/:username",identifyUser,followController.unfollowUserController)
module.exports=followRouter