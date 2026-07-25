import express from 'express'
import runGraph from "./ai/graph.ai.js"
const app=express()

app.get("/graph",async(req,res)=>{
    const result=await runGraph("what is todays weather in delhi 24july 2026 ")
    res.send(result)
})


export default app