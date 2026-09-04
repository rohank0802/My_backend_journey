import express from "express"
import morgan from "morgan"
const app=express()

app.use(morgan("dev"))

// createa heavy computation api to check if the load comes on our server then kubernetes will do auto scalling or no
app.get("/",(req,res)=>{
   let sum=0
   for(let i=0;i<=1000000000;i++){
    sum+=i
   }
   res.send(`hello world! Sum is ${sum}`)
})


app.listen(3000,()=>{
    console.log("server is running pn port 3000")
})