const postModel=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")
//accessing inamgekit private key
const imageKit=new ImageKit({
 privateKey:process.env["IMAGEKIT_PRIVATE_KEY"]
})
// here we creating post
async function createPostController(req,res){

 const file=await imageKit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"Test",
    folder:"insta-clone-posts"
 })
 const post=await postModel.create({
    caption:req.body.caption,
    imageUrl:file.url,
    user:req.user.id
 })
 res.status(201).json({
 message:"post created successfuly",
 post
 })
}

//verify user get  user all posts
async function getPostController(req,res){


const userId=req.user.id
const posts=await postModel.find({user:userId})
res.status(200).json({
    message:"posts fetched successfuly",
    posts
})

}

// verify user and then get single post
async function getPostDetailsController(req,res){

const userId=req.user.id
const postId=req.params.postId
const post=await postModel.findById(postId)
if(!post){
    return res.status(404).json({
        message:"post not found."
    })
}

const isValidUser=post.user.toString()===userId

if(!isValidUser){
    return res.status(403).json({
        message:"Fobidden to access content"
    })
}
return res.status(200).json({
    message:"post fetched sucessfully",
    post
})
}



module.exports={
    createPostController,
    getPostController,
    getPostDetailsController
}