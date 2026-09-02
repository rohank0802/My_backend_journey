import express from "express"


const app=express()

const PORT=3000


app.get("/",(req,res)=>{
    res.status(200).json({message:"HEllo world"})
})

app.get("/api/data",(req,res)=>{
    const data={
        id:1,
        name:"smaple data",
        description:"this is a sample data reponse from api"
    }
    res.status(200).json({
        success:true,
        data
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})