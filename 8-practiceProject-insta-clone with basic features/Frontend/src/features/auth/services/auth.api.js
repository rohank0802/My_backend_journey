import axios from "axios"


const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})
//register
export async function registerController(registerFormdata){
    try{
      const response=await api.post("/register",registerFormdata)
      return response.data
    }
    catch(err){
    console.log(err)
    }
}

//login
export async function login(formLoginData){
const dataToSend={
  email:"",
  username:"",
  password:formLoginData.password

}
if(formLoginData.loginId.includes("@")){
  dataToSend.email=formLoginData.loginId
}else{
  dataToSend.username=formLoginData.loginId
}


try{

  const response=await api.post("/login",dataToSend)
  return response.data
}
catch(err){
  console.log(err.message)
}
}

export async function getMe(){
try{
const response=await api.get("/get-me")
return response.data
}
catch(err){
    return err.message
}
}
