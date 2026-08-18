import { Router } from "express";
import { authAccessUser } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import {validateAddTooCart} from "../validators/cart.validator.js"
import {addToCartController,getCartController} from "../controllers/cart.controller.js"
const cartRoute=Router()


/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add itme to cart
 * @access Private
 * @argument productId-ID of the product to add
 * @argument variantId-ID of the variant to add
 * @argument quantity -Quantity of the item to add (,default:1)
 */
cartRoute.post("/add/:productId/:variantId",authAccessUser,authorizeRoles("buyer"),validateAddTooCart,addToCartController)

/**
 * @route GET api/cart
 * @desc GET user' cart
 * @access Private
 */
cartRoute.get("/",authAccessUser,authorizeRoles("buyer"),getCartController)

export default cartRoute