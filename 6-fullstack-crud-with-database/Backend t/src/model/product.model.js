// creating schema
const mongoose=require("mongoose")
const productSchema= new mongoose.Schema({
    productName:String,
    productPrice:Number
})

// creating model
const productModel=mongoose.model("products",productSchema)
module.exports=productModel