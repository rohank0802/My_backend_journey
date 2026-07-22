// UI LAYER — JudgePanel
// Displays the judge's scores, bar charts, and reasoning for both solutions
// Pure presentational — receives judge object as prop

const BARS = [
  { key: 'solution_1_score', label: 'Solution 1', color: '#00dbe9' },
  { key: 'solution_2_score', label: 'Solution 2', color: '#bd00ff' },
]

export default function JudgePanel({ judge }) {
  const s1 = judge.solution_1_score
  const s2 = judge.solution_2_score
  const winnerLabel = s1 >= s2 ? 'Solution 1' : 'Solution 2'
  const winnerColor = s1 >= s2 ? '#00dbe9' : '#bd00ff'

  return (
    <div className="relative bg-[#1a1a1a] border border-[#ffd700]/25 rounded-2xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/5 to-transparent pointer-events-none" />

      <div className="flex gap-4 p-5 relative z-10">
        {/* Gavel icon */}
        <div className="w-11 h-11 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center text-[#ffd700] shrink-0" aria-hidden="true">
          <span className="material-symbols-outlined !text-[24px]">gavel</span>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Title + winner badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-bold text-white">⚖️ Judge Recommendation</h3>
            <span className="text-xs font-bold font-mono px-3 py-0.5 border rounded-full tracking-wider" style={{ borderColor: winnerColor, color: winnerColor }}>
              🏆 {winnerLabel} Wins
            </span>
          </div>

          {/* Score bars */}
          <div className="flex flex-col gap-2">
            {BARS.map(({ key, label, color }) => (
              <div key={key} className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-semibold min-w-[80px]" style={{ color }}>{label}</span>
                <div className="flex-1 h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${judge[key] * 10}%`, background: color }} />
                </div>
                <span className="text-xs font-mono font-bold min-w-[40px] text-right" style={{ color }}>{judge[key]}/10</span>
              </div>
            ))}
          </div>

          {/* Side-by-side reasoning */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#00dbe9]">Solution 1 Analysis</span>
              <p className="text-xs text-[#b9cacb] leading-relaxed">{judge.solution_1_reasoning}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#bd00ff]">Solution 2 Analysis</span>
              <p className="text-xs text-[#b9cacb] leading-relaxed">{judge.solution_2_reasoning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
