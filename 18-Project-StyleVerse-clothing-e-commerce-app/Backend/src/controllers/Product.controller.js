import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.service.js"



export async function createProductController(req,res){
try{
    const {title,description,price}=req.body
const seller=req.user

//check the image is uploaded in multer
if(!req.files||req.files.length===0){
return res.status(400).json({
    success:false,
    message:"Please upload at least 1 product image"
})
}

//upload all the image to image kit
const images=await Promise.all(req.files.map(async(file,index)=>{
    const uploadedImage= await uploadFile({
        buffer:file.buffer,
        fileName:file.originalname,
        folder:"StyleVerse/products"
    })
    return{
        url:uploadedImage.url,
        fileId:uploadedImage.fileId,
        alt:req.body.images?.[index]?.alt||`${title} - Image${index+1}`
    }
}))

//create product
const product=await productModel.create({
    title,description,
    price:{
        amount:price,currency:"INR"
    },
    seller:seller.id,
    images
})
return res.status(201).json({
    success:true,
    message:"Product created successfully",
    product
})
}
catch(error){
    console.log(error)
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}


//get seller products

export async function getSellerProductsController(req,res){
    try{

        const sellerId=req.user.id

        const products=await productModel.find({
            seller:sellerId
        })
        
        return res.status(200).json({
            success:true,
            message:"products fetched successfully",
            products
        })
    }
    catch(error){
     return res.status(500).json({
        success:false,
        message:error.message
     })
    }
}