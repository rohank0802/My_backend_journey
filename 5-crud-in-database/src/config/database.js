//this file is use to create database means connect db to server/node.js
const mongoose=require("mongoose")
 function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
          console.log("connected to Database")
    }).catch((err)=>{
console.log("DB error",err.message)
    })
}

module.exports=connectToDb