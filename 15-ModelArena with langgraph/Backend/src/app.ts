import express from "express"
import graphServide from "./services/graph.ai.service.js"
const app=express()

app.get('/health',(req,res)=>{
    res.status(200).json({status:"ok"})
})

app.post("/use-graph",async(req,res)=>{
    await graphServide("write an factorial function js")
})


export default app