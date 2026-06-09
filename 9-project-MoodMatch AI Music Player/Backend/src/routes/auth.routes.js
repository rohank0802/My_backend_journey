const express=require("express")
const router=express.Router()
const authController=require("../controllers/auth.controller")


router.post("/register",authController.registerUserController)
router.post("/login",authController.loginUserController)
router.get("/get-me",authController.refreshPageController)


module.exports=router