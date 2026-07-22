// UI LAYER — Sidebar
// Navigation sidebar with brand, new chat button, history list, footer links
// Connects to hooks layer (useHistory) — never touches state directly

import { useHistory } from '../../hooks/useHistory'

export default function Sidebar() {
  const { history, newChat } = useHistory()

  return (
    <aside className="w-[280px] min-w-[280px] h-screen bg-[#1a1a1a] border-r border-[#2d2d2d] flex flex-col p-5 gap-4 overflow-y-auto z-10">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#2d2d2d]">
        <span className="material-symbols-outlined !text-[32px] bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] bg-clip-text text-transparent" aria-hidden="true">
          smart_toy
        </span>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] bg-clip-text text-transparent tracking-tight">
            Model Arena
          </h1>
          <p className="text-[11px] text-[#849495] font-mono tracking-wider">Dual AI Battle</p>
        </div>
      </div>

      {/* ── New Chat Button ── */}
      <button
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] text-black font-semibold text-sm rounded-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md"
        type="button"
        onClick={newChat}
      >
        <span className="material-symbols-outlined !text-[20px]">add</span>
        New Chat
      </button>

      {/* ── History list ── */}
      <nav className="flex flex-col gap-0.5 flex-1" aria-label="Chat history">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#849495] px-2 py-3">
          Recent History
        </span>
        {history.map((h) => (
          <a
            key={h.id}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs transition-all border ${
              h.active
                ? 'bg-[#00dbe9]/10 text-[#00dbe9] border-[#00dbe9]/30 font-medium'
                : 'text-[#b9cacb] border-transparent hover:bg-[#242424] hover:text-white'
            }`}
            href="#"
            aria-current={h.active ? 'page' : undefined}
          >
            <span className="material-symbols-outlined !text-[18px] shrink-0" aria-hidden="true">
              {h.icon}
            </span>
            <span className="truncate">{h.title}</span>
          </a>
        ))}
      </nav>

      {/* ── Footer links ── */}
      <div className="flex flex-col gap-1 pt-4 border-t border-[#2d2d2d]">
        <a className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#849495] hover:text-[#b9cacb] hover:bg-[#242424] rounded-lg transition-all" href="#">
          <span className="material-symbols-outlined !text-[18px]">help</span>
          Help
        </a>
        <a className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#849495] hover:text-[#b9cacb] hover:bg-[#242424] rounded-lg transition-all" href="#">
          <span className="material-symbols-outlined !text-[18px]">settings</span>
          Settings
        </a>
      </div>
    </aside>
  )
}
