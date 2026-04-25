const express=require("express")
const app=express()
app.use(express.json())//with this our express will be capable to read the data from frontend .this is middleware.without this we cannot read the data coming fromend
const notes=[
    // {
    //     title:"test title 1",
    //     description:"test description 1"
    // },
    // {
    //      title:"test title 2",
    //     description:"test description 2"
    // }
]
// now for creating an api with post method to send the data from the front end and receive it to the server
//using postman to check/test
app.post("/notes",(req,res)=>{
    // 1 what all the data come form the front end we will access that with req 
    // to access the body data
    console.log(req.body)
    notes.push(req.body)
    
    res.send("note created")
    //until this line we wre using post method to send the data to server

})
// if we have to look at the data to frontend/client side we will use get method of http
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})