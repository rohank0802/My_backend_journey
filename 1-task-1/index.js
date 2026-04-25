const express=require("express")
const app=express()
app.get('/',(req,res)=>{
   res.send("hi there!")
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})// thus callback function execution data will show on terminal.