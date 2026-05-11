const express=require("express")
const authControllers=require("../controllers/auth.controller")
const authRouter=express.Router()

//register auser
authRouter.post("/register",authControllers.registerController)

//login user
authRouter.post("/login",authControllers.loginController)


// refresh page
authRouter.get("/get-me",authControllers.refreshPageController)


module.exports=authRouter


