const express= require("express")
const cookiesParser=require("cookie-parser")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cookiesParser())
app.use(cors({
    origin:"http://localhost:5173",credentials:true
}))


//router
const authrouter=require("./routes/auth.routes")
const songRoutes=require("./routes/song.routes")

app.use("/api/auth",authrouter)
app.use("/api/song",songRoutes)
module.exports=app