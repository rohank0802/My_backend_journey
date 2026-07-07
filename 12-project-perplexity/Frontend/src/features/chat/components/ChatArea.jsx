import React from 'react'
import MessageBubble from "./MessageBubble.jsx";
import ChatInput from "./ChatInput.jsx";
import { HiSparkles,HiBars3 } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ChatArea = ({setsidebarOpen}) => {

const chats=useSelector((state)=>state.chat.chats)
const currentChatId=useSelector((state)=>state.chat.currentChatId)
const loading=useSelector((state)=>state.chat.isLoading)
const messages=currentChatId?chats[currentChatId]?.messages||[]:[]
  return (
     <div className="flex-1 flex flex-col bg-[#0B0B0F]">

      {/* Header */}
      <div className="h-20 border-b border-[#25252E] flex items-center justify-between px-8">
        <div className='flex items-center gap-4'>
         <button className='md:hidden'onClick={()=>setsidebarOpen(true)}>
      <HiBars3 size={28}/>
         </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            AI Assistant
          </h1>

          <p className="text-gray-400 text-sm">
            Ask anything...
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-[#1A1A24] flex items-center justify-center">
          <HiSparkles
            className="text-[#6D5EF9]"
            size={22}
          />
        </div>

      </div>

      {/* Messages */}


<div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">

  {messages.length === 0 ? (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          What can I help with?
        </h1>

        <p className="text-gray-400 mt-3">
          Start a new conversation.
        </p>
      </div>
    </div>
  ) : (
    messages.map((message, index) => (
      <MessageBubble
        key={index}
        role={message.role}
        content={message.content}
      />
    ))
  )}

  {loading && (
    <MessageBubble
      role="assistant"
      isThinking={true}
    />
  )}

</div>



      {/* Bottom Input */}

      <ChatInput />

    </div>
  )
}

export default ChatArea
