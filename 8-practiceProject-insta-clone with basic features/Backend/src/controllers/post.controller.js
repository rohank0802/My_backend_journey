const postModel=require("../models/post.model")
const userModel=require("../models/user.model")
const likeModel=require("../models/like.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")
const postRouter = require("../routes/post.route")

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

//verify user get  user all postsn of the user
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

// get all posts of the users after verify login

async function getFeedController(req,res){
    try{
       const userId=req.user.id
       const findUserexists=await userModel.findById(userId)
       if(!findUserexists){
        return res.status(404).json({
            message:"unauthorized user access denied."
        })
       }
        const posts=await Promise.all((await postModel.find({}).sort({_id:-1}).populate("user","-password").lean()).map(async(post)=>{
            const isLiked=await likeModel.findOne({
                user:userId,
                post:post._id

            })
            post.isLiked=Boolean(isLiked)
            return post
        }))
        res.status(200).json({ 
            message:"posts fetched successfully",
            posts
        })
    }
    catch(err){
        res.status(500).json({
            message:`${err.message},something went wrong while creating server`
        })
    }
}






// know  will make controller of  like

async function createLikeController(req,res){
    // fir we will get user id from the authmiddleware
    const userId=req.user.id
    //know we will get post id from params
    const postId=req.params.postId

const findPost=await postModel.findById(postId)
if(!findPost){
   return res.status(404).json({
        message:"post not found"
    })
}
const alreadyLiked=await likeModel.findOne({
      user:userId,post:postId
})
if(alreadyLiked){
    return res.status(200).json({
        message:"you already liked that post"
    })
}
    const like=await likeModel.create({
       user:userId,post:postId
    })
    await like.populate("user","-password -email")
    res.status(201).json({
        message:"like created sucessfuly",
        like
    })
}

async function createUnlikeController(req,res){
 // fir we will get user id from the authmiddleware
    const userId=req.user.id
    //know we will get post id from params
    const postId=req.params.postId

    const findPost=await likeModel.findOne({
        post:postId,
        user:userId
    })
    if(!findPost){
        return res.status(404).json({
            message:"post is not exist"
        })
    }
    const unlikePost=await likeModel.findOneAndDelete({post:postId})
    res.status(200).json({
        message:"you have sucessfully unliked "
    })

}

module.exports={
    createPostController,
    getPostController,
    getPostDetailsController,
    createLikeController,
    createUnlikeController,
    getFeedController
}