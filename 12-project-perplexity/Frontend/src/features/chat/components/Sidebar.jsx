import React from 'react'
import{ FaPlus} from "react-icons/fa6"
import {HiOutlineChatBubbleLeftRight} from "react-icons/hi2"
import {BsThreeDotsVertical} from "react-icons/bs"
import { useAuth } from '../../auth/hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/usechat'
const Sidebar = () => {
    const chats=useSelector((state)=>state.chat.chats)
    const chat=Object.values(chats)
     const {handleLogout}=useAuth()
     const {handleOpenChat}=useChat()
        const navigate=useNavigate()
    async function logout(){
     const success=await handleLogout()
     if(success){
        navigate("/login")
     }
    }
  return (
      <div className="w-[320px] bg-[#111116] border-r border-[#26262E] flex flex-col">

      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          <span className="text-[#6D5EF9]">P</span>erplexity
        </h1>
      </div>

      {/* New Chat */}
      <div className="px-6">
        <button className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#6D5EF9] py-3 font-semibold hover:bg-[#7B6DFF] duration-300">
          <FaPlus />
          New Chat
        </button>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto mt-8 px-4">

        <p className="text-gray-400 text-sm mb-4 px-2">
          Recent Chats
        </p>

        {chat.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-[#1A1A24] cursor-pointer duration-300 mb-2"
          >
            <HiOutlineChatBubbleLeftRight
              size={20}
              className="text-gray-400"
            />

            <button onClick={()=>handleOpenChat(chat.id)} className="truncate text-sm
            border border-transparent hover:border-gray-500 rounded-md px-2 py-1 transition-all duration-200">
              {chat.title}

            </button>
          </div>
        ))}
      </div>

      {/* Bottom Profile */}
      <div className="border-t border-[#26262E] p-5">

        <div className="flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpeLZukCjz8__4x2sFwpBhXAN9VwkdHRmM7Ruh-v3jFg&s=10"
              className="w-12 h-12 rounded-full"
              alt=""
            />

            <div>
              <button  className='bg-[#6D5EF9] py-1 px-3 rounded-2xl hover:scale-3d' onClick={handleLogout}>Logout</button>

              <p className="text-gray-400 text-sm">
                Free Plan
              </p>
            </div>

          </div>

          <BsThreeDotsVertical
            className="text-gray-400 cursor-pointer"
          />

        </div>

      </div>

    </div>
  )
}

export default Sidebar
