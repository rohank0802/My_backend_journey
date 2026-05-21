const express=require("express")
const postController=require("../controllers/post.controller")

const postRouter=express.Router()
// this is multer middleware it is used to read the file type data to the server .
const multer=require("multer")
const identifyUser=require("../middlewares/auth.middleware")


const upload=multer({storage:multer.memoryStorage()})
 
postRouter.post("/",upload.single("image"),
identifyUser,
postController.createPostController)

// get all post after token varify 
postRouter.get("/",identifyUser,postController.getPostController)

// get/api/posts/detaild/:postid
//return an detail abpout specific post with id also check whether the post blongs to the user that request came from

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


//@route POST/api/posts/feed
//@description get all the posts created in the db
// access private means only loggedin user can see the all feed
postRouter.get("/feed",identifyUser,postController.getFeedController)

// for like route
postRouter.post("/like/:postId",identifyUser,postController.createLikeController)

//for unlike 
postRouter.delete("/unlike/:postId",identifyUser,postController.createUnlikeController)

module.exports=postRouter