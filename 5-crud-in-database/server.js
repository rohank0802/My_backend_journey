const app=require("./src/app")

const connectToDb=require("./src/config/database")// imporing the database.js file here and starting the databse server here
require("dotenv").config()

connectToDb()


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
