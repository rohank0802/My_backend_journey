// UI LAYER — InputBar
// The chat input area with auto-resize textarea and send button
// Connects to hooks layer (useChatInput) — never reads state directly

import { useChatInput } from '../../hooks/useChatInput'

export default function InputBar() {
  const { input, taRef, handleSend, handleKeyDown, handleChange, isLoading } = useChatInput()

  return (
    <div className="sticky bottom-0 p-4 px-6 pb-5 bg-gradient-to-t from-[#131313] via-[#131313]/90 to-transparent flex flex-col gap-2">
      <div className="flex items-end gap-2 bg-[#1a1a1a] border border-[#404040] rounded-2xl p-2 focus-within:border-[#00dbe9] focus-within:ring-2 focus-within:ring-[#00dbe9]/10 transition-all">
        {/* Attach button */}
        <button
          className="p-2 bg-transparent border-none text-[#849495] hover:text-[#b9cacb] hover:bg-[#242424] rounded-lg transition-all cursor-pointer flex items-center"
          type="button"
          title="Attach file"
          aria-label="Attach file"
        >
          <span className="material-symbols-outlined !text-[20px]">attach_file</span>
        </button>

        {/* Auto-resizing textarea */}
        <textarea
          ref={taRef}
          id="arena-input"
          className="flex-1 bg-transparent border-none outline-none text-white font-sans text-sm leading-relaxed resize-none p-2 max-h-40 overflow-y-auto placeholder-[#849495] disabled:opacity-60"
          placeholder="Ask anything — both models will answer..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
          aria-label="Problem input"
        />

        {/* Send button */}
        <button
          className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] text-black flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
          type="button"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send"
        >
          <span className={`material-symbols-outlined !text-[20px] ${isLoading ? 'animate-spin' : ''}`}>
            {isLoading ? 'autorenew' : 'send'}
          </span>
        </button>
      </div>

      <p className="text-[11px] text-[#849495] text-center font-mono">
        Enter to send · Shift+Enter for newline
      </p>
    </div>
  )
}
