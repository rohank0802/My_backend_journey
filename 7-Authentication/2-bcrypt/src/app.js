const express=require("express")
const app=express()
const cookies=require("cookie-parser")
const authRouter=require("./routes/auth.routes")
 app.use(express.json())
app.use(cookies())
 app.use("/api/authe",authRouter)
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})

module.exports=app