import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import {stockOfVariant} from "../dao/product.dao.js"

export const addToCartController=async(req,res)=>{
    try{

        const {productId ,variantId} =req.params
        const{quantity=1}=req.body
        
        //find product variant
        const product=await productModel.findOne({
            _id:productId,
            "variants._id":variantId
        })
        
        
        //product or variant doesn,t exist
        if(!product){
            return res.status(404).json({
                message:"product or variant not found",
                success:false
            })
        }
        
        //calling function to find stock of selected variant
        const stock=await stockOfVariant(productId,variantId)
        
        if(stock===null){
            return res.status(404).json({
                message:"Variant not found",
                success:false
            })
        }
        
        //validate quantity come from req.body
        if(quantity<1){
            return res.status(400).json({
                message:"Quantity must be at least 1",
                success:false
            })
        }
        
        //find user's cart
        let cart=await cartModel.findOne({
            user:req.user.id
        })
        
        //if cart doesn't exist ,create it 
        if(!cart){
            cart =await cartModel.create({
                user:req.user.id,
                items:[]
            })
        }
        
        
        //check wether same product +variant already exists
        const existingItem=cart.items.find((item)=>item.product.toString()===productId.toString()&&item.variant?.toString()===variantId.toString())
        
        //if already axist
        if(existingItem){
            const newQuantity=existingItem.quantity+quantity
        
            //check total quantity against stock
            if(newQuantity>stock){
                return res.status(400).json({
                    message:`Only ${stock} item left in stock`,
                    success:false
                })
            }
            // imcrease existing items's quantity
            await cartModel.findOneAndUpdate(
                {
                    user:req.user.id,
                    "items.product":productId,
                    "items.variant":variantId
                },
                {
                    $inc:{
                        "items.$.quantity":quantity
                    }
                },
                {new:true}
            )
            return res.status(200).json({
                message:"Product quantity Increased successfully",
                success:true
            })
        }
        
        //if item doesn't exist,check requestr quantity against stock
        if(quantity>stock){
            return res.status(400).json({
                message:`only ${stock} items left in stock`,
                success:false
            })
        }
        
        // add new item to cart
        cart.items.push({
            product:productId,
            variant:variantId,
            quantity:quantity,
            price:{
                amount:product.price.amount
            }
        })
        
        //save cart
        await cart.save()
        
        return res.status(200).json({
            message:"product added to cart successfully",
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message:"internal server error",
            success:false,
            error:error.message
        })
    }

}

export const getCartController=async(req,res)=>{
try{
    const user =req.user

let cart=await cartModel.findOne({user:user.id}).populate("items.product")
if(!cart){
   cart=await cartModel.create({user:user.id,items:[]})
}
if(!cart.items){
    cart.items=[]
}
//for get exact variant
//  cart.items.forEach((item)=>{
//     const selectedVariant=item.product.variants.find((variant)=>variant._id.toString()===item.variant.toString()
// )
// item.varinat=selectedVariant
//  })

 return res.status(200).json({
    seccess:true,
    cart
 })
}
catch(error){
return res.status(500).json({
    success:false,
    message:error.message
})
}
}