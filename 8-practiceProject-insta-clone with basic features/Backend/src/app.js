const express= require("express")
const app=express()
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.route")
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})


module.exports=app