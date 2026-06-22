import {Router} from "express"
import{ registerController,verifyEmailController,loginController,getMeController,refreshPageController,logoutController} from "../controllers/auth.controller.js"
import {registerValidation,loginValidator} from "../validation/auth.validator.js"
import {authAcessUser}from"../middlewares/auth.middleware.js"
const authRouter=Router()


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @body {username,email,password},
 * 
 */
authRouter.post("/register",registerValidation,registerController)


/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email,password}
 */
authRouter.post("/login",loginValidator,loginController)

authRouter.get("/get-me",authAcessUser,getMeController)

authRouter.get("/refresh-page",refreshPageController)

authRouter.post("/logout",logoutController)

/**
 * @route GET /api/auth/verify-email
 * @desc verify users email address
 * @access Public
 * @query {token}
 */

authRouter.get("/verify-email",verifyEmailController)
export default authRouter


