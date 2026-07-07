
import { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ role, content,isThinking=false }) {
  const isUser = role === "user";
  const [dots,setDots]=useState("")

  useEffect(()=>{
if(!isThinking)return;
const interval =setInterval(()=>{
    setDots((prev)=>{
        if(prev.length===3)return ""
        return prev+"."
    })
},400)
 return ()=>clearInterval(interval)
  },[isThinking])

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-3xl px-6 py-4 ${
          isUser
            ? "bg-[#6D5EF9] text-white"
            : "bg-[#171720] border border-[#2C2C35] text-gray-200"
        }`}
      >
        {isThinking?(<p className="italic text-gray-400">Thinking{dots}</p>):isUser ? (
          <p>{content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-2">{children}</ol>
              ),
              code: ({ children }) => (
                <code className="bg-white/10 rounded px-1 py-0.5">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-black/30 rounded-xl p-3 overflow-x-auto">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;