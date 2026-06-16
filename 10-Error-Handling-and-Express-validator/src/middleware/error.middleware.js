import dotenv from "dotenv"
dotenv.config()

function handleError(err,req,res,next){
// res.status(err.status).json({
//     message:err.message,
//     // if we have to show exactly where the error comes
//     // note it is for development purpose 
//     //in production we didn,t give stack
//     stack:err.stack


// })

//to access environment

const response={
    message:err.message
}
if(process.env.NODE_ENVIRONMENT==="development"){
    response.stack=err.stack
}

res.status(err.status).json(response)
}

export default handleError