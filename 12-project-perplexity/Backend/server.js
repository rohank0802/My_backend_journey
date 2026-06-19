import "dotenv/config"
import app from "./src/app.js"
import connectedToDB from "./src/config/database.js"

connectedToDB()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})