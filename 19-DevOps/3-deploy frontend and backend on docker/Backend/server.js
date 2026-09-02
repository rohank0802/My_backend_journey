import express from "express"
import morgan from "morgan"
const app=express()

app.use(morgan("dev"))
app.use(express.static('public'))
app.get("/api.health",(req,res)=>{
    res.status(200).json({
        status:"OK"
    })
})

app.get("/api/hello",(req,res)=>{
    res.status(200).json({
        message:"hello World"
    })
})
app.get("/api/users",(req,res)=>{
    const users=[
        {id:1,name:"Rohan"},
        {id:2,name:"Rohit"},
        {id:3,name:"Rahul"},
        {id:4,name:"ritesh"}
    ]
    res.status(200).json({
        message:"data fetched successfully",
        success:true,
        users
    })
})

// wild card route
app.get("*name",(req,res)=>{
    res.sendFile("public/index.html",{root:__dirname})
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})