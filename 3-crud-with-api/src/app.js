/*
server create work
-server config work
*/
const express=require("express")
const app=express()// server is created
app.use(express.json())
const notes=[]
//POST METHOD
app.post("/note",(req,res)=>{
  console.log(req.body)
  notes.push(req.body)
  console.log(notes)
  res.send("note created")
})
//GET MEthod
app.get("/note",(req,res)=>{
    res.send(notes)
})
//DELETE METHOD 
// using params /
// //
// params   /:index
app.delete("/note/:index",(req,res)=>{
delete notes[req.params.index]
    res.send("note deleted sucessfully")
})
// PATCH METHOD   /notes/:index
//re.body={dexcription:-"sample modified desc."}
app.patch("/note/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description
    res.send("note updates sucessfully")
})

module.exports=app  // for exporting the created server.