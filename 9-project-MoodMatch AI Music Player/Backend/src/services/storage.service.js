const imageKit=require("@imagekit/nodejs").default
const {toFile}= require("@imagekit/nodejs")
const client= new imageKit({
privateKey:process.env["IMAGEKIT_PRIVATE_KEY"]
})

async function uploadFile({buffer,filename,folder=""}){

    const file=await client.files.upload({
        file:await toFile(Buffer.from(buffer),filename),
        fileName:filename,
        folder
    })
    return file
}
module.exports={uploadFile}