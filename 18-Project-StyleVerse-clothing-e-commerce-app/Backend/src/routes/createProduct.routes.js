import {Router} from "express"
import { authorizeRoles } from "../middlewares/authorize.middleware.js"    
import { authAccessUser } from "../middlewares/auth.middleware.js"
import { createProductController } from "../controllers/createProduct.controller.js"
import {createProductVaidator} from "../validators/auth.validator.js"
import multer from "multer"


const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:7*1024*1024 //7MB
    }
})

const createProductRouter=Router()


//create product route
createProductRouter.post("/",authAccessUser,authorizeRoles("seller"),createProductVaidator,upload.array("images",7),createProductController)


export default createProductRouter