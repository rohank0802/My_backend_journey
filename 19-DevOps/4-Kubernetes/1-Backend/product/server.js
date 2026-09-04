import express from "express"
import morgan from "morgan"
import axios from "axios"

const app=express()

app.use(morgan("dev"))
app.use(express.json())

app.get("/api/product",async(req,res)=>{
    const response=await axios.get("http://express-service/")
    res.send(response.data)
})


app.listen(8080,()=>{
console.log("server is running on port 8080")
})