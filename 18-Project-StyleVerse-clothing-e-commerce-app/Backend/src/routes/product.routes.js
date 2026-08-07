import {Router} from "express"
import { authorizeRoles } from "../middlewares/authorize.middleware.js"    
import { authAccessUser } from "../middlewares/auth.middleware.js"
import { createProductController,getSellerProductsController } from "../controllers/Product.controller.js"

import {createProductVaidator} from "../validators/auth.validator.js"
import multer from "multer"


const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:7*1024*1024 //7MB
    }
})

const productRouter=Router()


//create product route
productRouter.post("/createProduct",authAccessUser,authorizeRoles("seller"),createProductVaidator,upload.array("images",7),createProductController)

//view created products by perticular seller
productRouter.get("/viewProducts",authAccessUser,authorizeRoles("seller"),getSellerProductsController)


export default productRouter