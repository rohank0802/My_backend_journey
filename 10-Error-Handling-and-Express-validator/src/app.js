import express from "express"
import authRouter from "./routes/auth.routes.js"
import handleError from "./middleware/error.middleware.js"
const app=express()
app.use(express.json())
app.use("/api/auth",authRouter)


// notes always use the error handling middle ware is used in last 
app.use(handleError)
  export default app