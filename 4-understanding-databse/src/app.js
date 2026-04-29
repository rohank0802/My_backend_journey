//this file
// use for creating server
//use for server config 
const express=require("express")
const app=express()


// app.use(express.json())

// const notes=[]
// //POST METHOD
// app.post("/notes",(req,res)=>{
//   console.log(req.body)
//   notes.push(req.body)
//   console.log(notes)

//   //status code 201 for a new resource has be greated
//   res.status(201).json({
//     message:"note created sucessfully"
//   })
// })
// //READ METHOD
// app.get("/notes",(req,res)=>{
//     res.status(200).json({
//         notes:notes
//     })
//     console.log(notes)
// })
// //DELETE METHOD
// app.delete("/notes/:index",(req,res)=>{
//     delete notes[req.params.index]
//     res.status(204).json({
//         //in this staus code 204 the deletion req will be sucessful but the content will not return
//         message:"Note deleted sucessfully"
//     })
// })
// //PATCH METHOD
// app.patch("/notes/:index",(req,res)=>{
//     notes[req.params.index].description=req.body.description
//     res.status(200).json({
//         message:"note updatesd sucessfully"
//     })
// })
module.exports=app

// now we use data base to store the data 