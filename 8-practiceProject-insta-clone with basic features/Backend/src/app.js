const express= require("express")
const app=express()
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.route")
const followRouter=require("./routes/follow.routes")
const cors=require("cors")
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5174",credentials:true
}))


// this routes is for authentications
app.use("/api/auth",authRouter)

// this routes id for create posts
app.use("/api/posts",postRouter)

// this route is for follow
app.use("/api/users/",followRouter)



app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})


module.exports=app