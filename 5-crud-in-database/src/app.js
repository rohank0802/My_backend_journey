const express=require("express")
const noteModel=require("./models/notes.model")
const app=express()
app.use(express.json())
//now we will do crud operation and save data in database

//Post Method
app.post("/notes",async(req,res)=>{
const {title,description}=req.body
 const note=await noteModel.create({
    title,description
})
res.status(201).json({
    message:"Note created sucessfully",
    note
})
})
//Get method
app.get("/notes", async(req,res)=>{
  const notes=await noteModel.find()  
  res.status(200).json({
    message:"Notes fetched successfully",
    notes
  })
})


module.exports=app