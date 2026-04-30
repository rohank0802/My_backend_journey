const app=require("./src/app")
const dotenv=require("dotenv").config()
const connectToDb =require("./src/config/database")

connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000")

})