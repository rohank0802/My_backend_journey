const express= require("express")
const cookiesParser=require("cookie-parser")
const app=express()
app.use(express.json())
app.use(cookiesParser())


//router
const authrouter=require("./routes/auth.routes")
app.use("/api/auth",authrouter)
module.exports=app