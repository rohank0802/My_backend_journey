import { useState } from "react";
import { useChat } from "../hooks/usechat";
import {
  HiPaperAirplane,
  HiPaperClip,
  HiMicrophone,
  HiPlus,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

function ChatInput() {
  const [message, setMessage] = useState("");
  const currentChatId=useSelector((state)=>state.chat.currentChatId)
const chat=useChat()
  const handleSend = () => {
    if (!message.trim()) return;

    chat.handleSendMessage({message,chatId:currentChatId})
    setMessage("");
  };

  return (
    <div className="border-t border-[#25252E] bg-[#111116] p-6">

      <div className="flex items-center gap-3 bg-[#171720] border border-[#2C2C35] rounded-3xl px-5 py-3">

        {/* Add */}
        <button className="text-gray-400 hover:text-white transition">
          <HiPlus size={22} />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          className="w-11 h-11 rounded-full bg-[#6D5EF9] hover:bg-[#7D6FFF] transition flex items-center justify-center"
        >
          <HiPaperAirplane
            size={20}
            className="rotate-45 text-white"
          />
        </button>

      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        AI can make mistakes. Verify important information.
      </p>

    </div>
  );
}

export default ChatInput;