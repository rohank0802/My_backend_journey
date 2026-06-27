import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useAuth} from "../../auth/hook/useAuth.js"
  import { useNavigate } from 'react-router-dom'  
import { useChat } from '../hooks/usechat.js'


const Dashborad = () => {
  const chat=useChat()
    const {handleLogout}=useAuth()
    const navigate=useNavigate()
const {user}=useSelector(state=>state.auth)
console.log(user)
async function logout(){
     const success=await handleLogout()
     if(success){
        navigate("/login")
     }
}
useEffect(()=>{
chat.initializeSocketConnection()
},[])
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashborad
