import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import {stockOfVariant} from "../dao/product.dao.js"
import mongoose from "mongoose";
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

        const selectedVariant=product.variants.id(variantId)
        
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
                amount:selectedVariant.price.amount
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

// let cart=await cartModel.findOne({user:user.id}).populate("items.product")
let cart=await cartModel.aggregate(
  [
    {
      $match: {
        user: new mongoose.Types.ObjectId(user.id)
      }
    },
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $unwind: { path: '$items.product.variants' }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$items.variant',
            '$items.product.variants._id'
          ]
        }
      }
    },
    {
      $addFields: {
        totalItemsPrice: {
          price: {
            $multiply: [
              '$items.quantity',
              '$items.product.variants.price.amount'
            ]
          },
          currency:
            '$items.product.variants.price.currency'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalcartItemsPrice: {
          $sum: '$totalItemsPrice.price'
        },
        currency: {
          $first: '$totalItemsPrice.currency'
        },
        items: { $push: '$items' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
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


export const IncrementCartItemQunatity=async(req,res)=>{

    try{

        const {productId,variantId} =req.params
    
        const product=await productModel.findOne({
            _id:productId,
            "variants._id":variantId
        })
        if(!product){
            return res.status(404).json({
                message:"product or variant not found",
                success:false
            })
        }
    
        const cart=await cartModel.findOne({user:req.user.id})
        if(!cart){
            return res.status(404).json({
                message:"cart not found",
                success:false
            })
        }
    
        const stock=await stockOfVariant(productId,variantId)
    
        const itemquantityInCart=cart.items.find(item=>item.product.toString()===productId && item.variant?.toString()===variantId)?.quantity||0
    
        
        if(itemquantityInCart+1>stock){
    
            return res.status(400).json({
                message:`Only ${stock} items is left in the stock. and you already have ${itemquantityInCart} items in your cart`,
                success:false
            })
        }
    
       const updatedCart= await cartModel.findOneAndUpdate(
            {user:req.user.id,"items.product":productId,"items.variant":variantId},
            {$inc:{"items.$.quantity":1}},
            {new:true}
        )
      if(!updatedCart){
        return res.status(404).json({
            message:"Cart item not found",
            success:false
        })
      }

        return res.status(200).json({
            message:"Cart item quantity incremented successfully",
            success:true
        })
    }
    catch(error){
      return res.status(500).json({
        message:`${error.message}`,
        success:false
      })
    }

    
}

export const decrementcartItemQuantity=async(req,res)=>{
    try{
      const {productId,variantId} =req.params
    
        const product=await productModel.findOne({
            _id:productId,
            "variants._id":variantId
        })
        if(!product){
            return res.status(404).json({
                message:"product or variant not found",
                success:false
            })
        }
    
        const cart=await cartModel.findOne({user:req.user.id})
        if(!cart){
            return res.status(404).json({
                message:"cart not found",
                success:false
            })
        }
    
        const stock=await stockOfVariant(productId,variantId)
    
        const cartItem=cart.items.find(item=>item.product.toString()===productId && item.variant?.toString()===variantId)

        if(!cartItem){
            return res.status(404).json({
                message:"Cart item not found",
                success:false
            })
        }

        //don't allow quantity below 1
        if(cartItem.quantity<=1){
            return res.status(400).json({
                message:"Quantity cannot be less tha one",
                success:false
            })
        }

        //decrease quantity by 1
        const updatedCart= await cartModel.findOneAndUpdate(
            {user:req.user.id,"items.product":productId,"items.variant":variantId},
            {$inc:{"items.$.quantity":-1}},
            {new:true}
        )
      if(!updatedCart){
        return res.status(404).json({
            message:"Cart item not found",
            success:false
        })
      }

        return res.status(200).json({
            message:"Cart item quantity decremented successfully",
            success:true
        })
    }
    catch(error){
    return res.status(500).json({
        message:`${error.message}`,
        success:false
    })
    }
}


export const deleteCartproductVariant=async(req,res)=>{
    try{
     const {productId,variantId}=req.params

     //check product+variant
     const product=await productModel.findOne({
        _id:productId,
        "variants._id":variantId
     })

  if(!product){
    return res.status(404).json({
        message:"Product or variant not found",
        success:false
    })
  }


  //find user cart
  const cart=await cartModel.findOne({
    user:req.user.id
  })
  if(!cart){
     return res.status(404).json({
        message:"cart not found",
        success:false
    })
  }

  //check whether this exact product +variant in cart 

  const cartItem=cart.items.find(item=> item.product.toString()===productId &&item.variant.toString()===variantId)

  if(!cartItem){
     return res.status(404).json({
        message:"cart item not found",
        success:false
    })
  }

  //remove only the item

  const updatedCart=await cartModel.findOneAndUpdate({
    user:req.user.id
  },
   {
    $pull:{
        items:{
            product:productId,
            variant:variantId
        }
    }
   },
   {
    new:true
   }
)

    if(!updatedCart){
        return res.status(404).json({
            message:"Cart item not found",
            success:false
        })
      }

        return res.status(200).json({
            message:"Cart item deleted successfully",
            success:true
        })
 

    }
    catch(error){
  res.status(500).json({
    message:`${error.message}`,
    success:false
  })
    }
}