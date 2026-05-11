const express=require("express")
const postController=require("../controllers/post.controller")
const postRouter=express.Router()
// this is multer middleware it is used to read the file type data to the server .
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),postController.createPostController)

module.exports=postRouter