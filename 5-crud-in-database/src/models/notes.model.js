// schema - telling the db that we want to store the data in which format/schema
//so for that we have to create the different file name notes.model.js
const mongoose=require("mongoose")
    const notesSchema=new mongoose.Schema({
        title:String,
        description:String
    })


//Model - for doing crud in db we use model
//creating model
const noteModel=mongoose.model("notes",notesSchema)
// we makes different different colletion for diffrent type of data in the db and the name of the colletion i gave for specity data in (notes)
//note - each Collection should have its own schema and model
module.exports=noteModel
