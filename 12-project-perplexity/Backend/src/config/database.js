import mongoose from "mongoose"


async function connectedToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to Database")
    }
    catch(err){
console.log(`${err.message} while try to connect with db`)
process.exit(1)
    }
}

export default connectedToDB