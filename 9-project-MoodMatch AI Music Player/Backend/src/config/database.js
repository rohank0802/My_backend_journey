const mongoose=require("mongoose")

async function connectToDB(){

try{
   await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to database")
}
catch(err){
    console.log(err.message,"something wrong when creating db")
    process.exit(1)
}

}

module.exports=connectToDB