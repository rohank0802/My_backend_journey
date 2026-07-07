
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  HiOutlineChatBubbleLeftRight,
  HiXMark,
} from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../auth/hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/usechat";
import { setCurrentChatId } from "../chat.slice";

const Sidebar = ({ sidebarOpen, setsidebarOpen }) => {
  const chats = useSelector((state) => state.chat.chats);
  const chat = Object.values(chats);

  const { handleLogout } = useAuth();
  const { handleOpenChat,handleDeleteChat } = useChat();
useEffect(()=>{

},[handleDeleteChat])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout() {
    const success = await handleLogout();

    if (success) {
      navigate("/login");
    }
  }

  function handleNewChat() {
    dispatch(setCurrentChatId(null));
    setsidebarOpen(false);
  }

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setsidebarOpen(false)}
        />
      )
      }

      {/* Sidebar */}
      <div
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-[320px]
          bg-[#111116]
          border-r border-[#26262E]
          flex flex-col
          z-50
          transform
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setsidebarOpen(false)}>
            <HiXMark size={28} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#6D5EF9]">N</span>exora
          </h1>
        </div>

        {/* New Chat */}
        <div className="px-6">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#6D5EF9] py-3 font-semibold hover:bg-[#7B6DFF] duration-300"
          >
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
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-[#1A1A24] duration-300 mb-2"
            >
              <HiOutlineChatBubbleLeftRight
                size={20}
                className="text-gray-400"
              />

              <button
                onClick={() => {
                  handleOpenChat(chat.id,chats);
                  setsidebarOpen(false);
                }}
                className="truncate text-sm border border-transparent hover:border-gray-500 rounded-md px-2 py-1 transition-all duration-200"
              >
                {chat.title}
              </button>
              <button onClick={()=>{
                handleDeleteChat(chat.id)
                console.log(chat.id)
              }}
              className="py-1 px-1.5 rounded-2xl bg-[#6D5EF9]">Delete</button>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#26262E] p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpeLZukCjz8__4x2sFwpBhXAN9VwkdHRmM7Ruh-v3jFg&s=10"
                className="w-12 h-12 rounded-full"
                alt=""
              />

              <div>
                <button
                  onClick={logout}
                  className="bg-[#6D5EF9] py-1 px-3 rounded-2xl hover:bg-[#7B6DFF]"
                >
                  Logout
                </button>

                <p className="text-gray-400 text-sm">
                  Free Plan
                </p>
              </div>
            </div>

            <BsThreeDotsVertical className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;