//this file
//use for starting the server
//connecting to database

const app=require("./src/app")
const mongoose=require("mongoose")// import mongodb database
const dotenv=require("dotenv").config()
function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to DataBase")
    }).catch((err)=>{
        console.log("DB Error",err.message)
    })
}
connectToDb()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
