import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useAuth} from "../../auth/hook/useAuth.js"
  
import { useChat } from '../hooks/usechat.js'
import Sidebar from '../components/Sidebar.jsx'
import ChatArea from '../components/ChatArea.jsx'


const Dashborad = () => {
  const chat=useChat()
    const {handleLogout}=useAuth()
const {user}=useSelector(state=>state.auth)
console.log(user)
useEffect(()=>{
chat.initializeSocketConnection()
chat.handleGetChats()
},[])
  return (
    <main className='h-screen bg-[#0B0B0F] text-white flex overflow-hidden'>
     <Sidebar/>
     <ChatArea/>
    </main>
  )
}

export default Dashborad

