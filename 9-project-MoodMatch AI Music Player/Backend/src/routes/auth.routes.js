const express=require("express")
const router=express.Router()
const authController=require("../controllers/auth.controller")
const authAccessMiddleware=require("../middlewares/auth.middleware")

router.post("/register",authController.registerUserController)
router.post("/login",authController.loginUserController)
router.get("/get-me",authAccessMiddleware,authController.refreshPageController)

router.get("/logout",authController.logoutUser)
module.exports=router