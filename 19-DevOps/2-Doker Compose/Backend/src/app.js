import express from 'express'


const app=express()


app.get("/",(req,res)=>{
    res.send("hello worl")
})

app.get("/api/data",(req,res)=>{
    const data={
        message:"this is some sample data from the api",
        timestamp:new Date()
    }
    res.json({
        success:true,
        data
    })
})

export default app