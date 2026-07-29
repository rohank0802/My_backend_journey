import {Router} from "express"
import {validateRegisterUserLocal,loginValidatorLocal} from "../validators/auth.validator.js"
import { registerLocal,verifyEmailController,loginControllerLocal,getMeController,refreshPageController,logoutController} from "../controllers/auth.controller.js"
import {authAccessUser} from "../middlewares/auth.middleware.js"
const authRouter=Router()


authRouter.post("/register",validateRegisterUserLocal,registerLocal)
authRouter.get("/verify-email",verifyEmailController)

//login controller
authRouter.post("/login",loginValidatorLocal,loginControllerLocal)
//getme controller
authRouter.get("/get-me",authAccessUser,getMeController)
//refresh page controller
authRouter.get("/refresh-page",refreshPageController)
//logout path
authRouter.get("/logout",logoutController)

export default authRouter

