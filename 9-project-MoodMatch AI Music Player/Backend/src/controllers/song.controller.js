const songModel=require("../models/song.model")
const id3=require("node-id3")
const storageServiceImageKit=require("../services/storage.service")
async function uploadSongController(req,res){
    try{

        const {mood}=req.body
         const songbuffer=req.file.buffer
         //id3 is a external package that give us the songs internal data 
        const tags= id3.read(songbuffer)
        // calling a uploadfile funcion from services folder and giving songs datas in argument

        // for upload both together we use promise.all means rather than uploading one by one it will upload at same time.
        
        // const [songFile,posterFile]=await Promise.all([

        //     storageServiceImageKit.uploadFile({
        //      buffer:songbuffer,
        //      filename:tags.title+".mp3",
        //      folder:"/moodify/songs"
        //     }),
        //     storageServiceImageKit.uploadFile({
        //      buffer:tags.image.imageBuffer,
        //      filename:tags.title+".jpeg",
        //      folder:"/moodify/posters"
        //     })
        // ])
        const uploads=[
            storageServiceImageKit.uploadFile({
             buffer:songbuffer,
             filename:tags.title+".mp3",
             folder:"/moodify/songs"
            })
        ]
        if(tags.image?.imageBuffer){
            uploads.push(
                storageServiceImageKit.uploadFile({
             buffer:tags.image.imageBuffer,
             filename:tags.title+".jpeg",
             folder:"/moodify/posters"
            })
            )
        }
     const results=await Promise.all(uploads)
const songFile=results[0]
const posterFile=results[1]||null

if(!posterFile){
    return res.status(400).json({
        message:"album art is required"
    })
}
if(!tags.title){
    return res.status(400).json({
        message:"song title is not found in metadata"
    })
}


     const song=await songModel.create({
         title:tags.title,
         url:songFile.url,
         posterUrl:posterFile.url,
         mood
     })
     res.status(201).json({
        message:"song created successfully",
        song
     })
    }
    catch(err){
    res.status(500).json({
        message:err.message
    })
    }
}

async function getSong(req,res){
    try{
        const {mood}=req.query
        const song =(await songModel.aggregate([
            {$match:{mood}},
            {$sample:{size:1}}
        ]))[0]
        res.status(200).json({
            message:"song fetchched successfully",
            song
        })
    }
    catch(err){
     res.status(500).json({
        message:err.message
     })
    }

}

module.exports={
    uploadSongController,
    getSong
}