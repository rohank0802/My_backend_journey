const express=require("express")
const postController=require("../controllers/post.controller")

const postRouter=express.Router()
// this is multer middleware it is used to read the file type data to the server .
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
 
postRouter.post("/",upload.single("image"),
postController.createPostController)

// get all post after token varify 
postRouter.get("/",postController.getPostController)

// get/api/posts/detaild/:postid
//return an detail abpout specific post with id also check whether the post blongs to the user that request came from

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports=postRouter