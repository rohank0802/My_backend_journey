const express=require("express")
const cookie=require("cookie-parser")
const authRouter=require("./routes/auth.routes")
const app=express()

app.use(cookie())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})




module.exports=app