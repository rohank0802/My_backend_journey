const express=require("express")
const productModel=require("./model/product.model")
const app=express()
const cors=require("cors")
// this,path,stect is use for backend serves frontend means to make single server deployment
const path=require("path")
app.use(express.static("./public"))


app.use(express.json())
app.use(cors())///with this we are allwing cors means we are allowing cross browser access .Note this will we only done for development purpose .in real production app we will not do this.
//post method
app.post("/api/products",async(req,res)=>{
    const{productName,productPrice}=req.body
    const product=await productModel.create({
        productName,productPrice
    })
    res.status(201).json({
        message:"product created successfully",
        product
    })
})
//get method
app.get("/api/products",async(req,res)=>{
const getproduct=await productModel.find()
res.status(200).json({
message:"products fetched from database",
getproduct
})
})

// Delete method
app.delete("/api/products/:id",async(req,res)=>{
const id=req.params.id
 const deleteddata=await productModel.findByIdAndDelete(id)

res.status(200).json({
    message:"product deleted sucessfully",
    deleteddata
})
})
 //patch method
 app.patch("/api/products/:id",async(req,res)=>{
    const id=req.params.id
    const{productPrice}=req.body
    const updateeddata=await productModel.findByIdAndUpdate(id,{productPrice})
    res.status(200).json({
          message:"product updated successfully",
      })
 })
//after that if i gave any path that is not in public folder then we will send index.html folder
 app.get('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
 })

module.exports=app