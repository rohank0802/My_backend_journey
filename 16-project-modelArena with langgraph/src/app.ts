import express from 'express'
import runGraph from "./ai/graph.ai.js"
const app=express()

app.get("/graph",async(req,res)=>{
    const result=await runGraph("write an code for factorial function in js")
    res.send(result)
})


export default app