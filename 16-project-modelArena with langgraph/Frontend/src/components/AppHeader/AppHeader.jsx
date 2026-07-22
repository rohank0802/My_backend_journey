// UI LAYER — AppHeader
// Top navigation bar showing arena title, model chips, and user avatar
// Purely presentational — no hooks, no state

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3.5 bg-[#131313] border-b border-[#2d2d2d]">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">⚔️ Arena</span>
        <span className="text-xs font-mono text-[#849495] tracking-wider">AI Model Battle</span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-[#00dbe9]/10 text-[#00dbe9] border border-[#00dbe9]/30">
          Model A
        </span>
        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-[#bd00ff]/10 text-[#bd00ff] border border-[#bd00ff]/30">
          Model B
        </span>
        <div className="w-9 h-9 rounded-full bg-[#242424] border border-[#404040] flex items-center justify-center text-[#b9cacb] hover:border-[#00dbe9] cursor-pointer transition-all" aria-label="User profile">
          <span className="material-symbols-outlined !text-[20px]" aria-hidden="true">person</span>
        </div>
      </div>
    </header>
  )
}
