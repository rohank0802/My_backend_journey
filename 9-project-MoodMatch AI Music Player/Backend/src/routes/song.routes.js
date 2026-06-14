const express=require("express")
const router=express.Router()
const upload=require("../middlewares/upload.middleware")
const songController=require("../controllers/song.controller")
///api/song/
router.post("/",upload.single("song"),songController.uploadSongController)
router.get("/",songController.getSong)
module.exports=router