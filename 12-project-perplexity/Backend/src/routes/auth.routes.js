import {Router} from "express"
import{ registerController} from "../controllers/auth.controller.js"
import {authvalidator} from "../validation/auth.validator.js"
const authRouter=Router()


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @body {username,email,password},
 * 
 */
authRouter.post("/register",authvalidator,registerController)

export default authRouter

