import {Router} from "express"
import {validateRegisterUserLocal,loginValidatorLocal} from "../validators/auth.validator.js"
import { registerLocal,verifyEmailController,loginControllerLocal,getMeController,refreshPageController,logoutController,googleCallback} from "../controllers/auth.controller.js"
import {authAccessUser} from "../middlewares/auth.middleware.js"
import passport from "passport"
const authRouter=Router()


authRouter.post("/register",validateRegisterUserLocal,registerLocal)
authRouter.get("/verify-email",verifyEmailController)
authRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
authRouter.get("/google/callback",passport.authenticate("google",{session:false,failureRedirect:"/login"}),googleCallback)
//login controller
authRouter.post("/login",loginValidatorLocal,loginControllerLocal)
//getme controller
authRouter.get("/get-me",authAccessUser,getMeController)
//refresh page controller
authRouter.get("/refresh-page",refreshPageController)
//logout path
authRouter.get("/logout",logoutController)

export default authRouter

