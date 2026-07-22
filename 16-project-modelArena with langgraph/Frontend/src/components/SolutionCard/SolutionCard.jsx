// UI LAYER — SolutionCard
// Composes ScoreRing + SolutionContent into a full solution card
// Receives all data as props; imports from hooks layer are forbidden here

import ScoreRing from './ScoreRing'
import SolutionContent from './SolutionContent'

export default function SolutionCard({ title, solution, score, reasoning, color, isWinner }) {
  return (
    <div
      className={`relative bg-[#1a1a1a] border rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        isWinner
          ? 'border-[#00dbe9] shadow-[0_0_24px_rgba(0,219,233,0.12)]'
          : 'border-[#2d2d2d]'
      }`}
      aria-label={`${title}${isWinner ? ' — Winner' : ''}`}
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: color }} />

      {/* ── Card Header ── */}
      <div className="flex items-center justify-between p-4 bg-[#242424] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          <span className="text-sm font-bold font-mono text-white">{title}</span>
          {isWinner && (
            <span className="text-[10px] font-bold font-mono tracking-widest text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-2 py-0.5 rounded-full animate-pulse">
              🏆 WINNER
            </span>
          )}
        </div>
        <ScoreRing score={score} color={color} />
      </div>

      {/* ── Solution Body (markdown + code) ── */}
      <div className="p-4 overflow-y-auto max-h-[520px] flex-1">
        <SolutionContent text={solution} />
      </div>

      {/* ── Judge Reasoning Footer ── */}
      <div className="p-3.5 px-4 bg-[#242424] border-t border-[#2d2d2d] flex items-start gap-2">
        <span className="material-symbols-outlined !text-[18px] shrink-0 mt-0.5" style={{ color }}>
          psychology
        </span>
        <p className="text-xs text-[#b9cacb] leading-relaxed flex-1">{reasoning}</p>
      </div>
    </div>
  )
}
