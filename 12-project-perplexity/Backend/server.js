import "dotenv/config"
import app from "./src/app.js"
import connectedToDB from "./src/config/database.js"
// import {testAi} from "./src/services/ai.service.js"
connectedToDB()
// testAi()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})