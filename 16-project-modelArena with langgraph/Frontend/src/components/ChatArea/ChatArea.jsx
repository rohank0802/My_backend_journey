// UI LAYER — ChatArea
// Renders the scrollable chat history
// Connects to hooks layer (useArena) to get messages

import { useRef, useEffect } from 'react'
import { useArena } from '../../hooks/useArena'
import UserMessage from '../UserMessage/UserMessage'
import ArenaResponse from '../ArenaResponse/ArenaResponse'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center p-12 my-auto">
      <span className="material-symbols-outlined !text-[64px] bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] bg-clip-text text-transparent" aria-hidden="true">
        smart_toy
      </span>
      <h2 className="text-2xl font-bold text-white">Welcome to Model Arena</h2>
      <p className="text-sm text-[#849495] max-w-[400px] leading-relaxed">
        Send a problem — two AI models will battle it out, and a judge will decide the winner.
      </p>
    </div>
  )
}

export default function ChatArea() {
  const { messages } = useArena()
  const chatEndRef = useRef(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 pb-32">
      {messages.length === 0 && <EmptyState />}

      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <UserMessage text={msg.userText} />
          <ArenaResponse data={msg.data} loading={msg.loading} />
        </div>
      ))}

      {/* Invisible anchor for auto-scroll */}
      <div ref={chatEndRef} />
    </div>
  )
}
