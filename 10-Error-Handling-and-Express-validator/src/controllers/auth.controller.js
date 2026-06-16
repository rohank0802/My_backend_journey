// export async function registerUser(req,res,next){

//     try{
//         // throw new Error("encounter an error while registring new user")
       
//         throw new Error("password is to weak")
//     }
//     catch(err){
//         // if w ehave send err with dirrent status codes for difrent type of error.
//         // here we set new code in err
//         err.status=400
// next(err)
//     }
// }


//2
// know we will see express validation
// means the data that is coming to backend from frontend their format is correct or not.

 export async function registerUser(req,res){
res.status(201).json({
    message:"registered successfully"
})
}