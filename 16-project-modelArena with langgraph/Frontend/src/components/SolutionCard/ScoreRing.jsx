// UI LAYER — ScoreRing
// Animated SVG circular ring that displays a numeric score
// Purely presentational — no hooks, no imports beyond React

export default function ScoreRing({ score, color }) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 10) * circumference

  return (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg width="56" height="56" aria-label={`Score: ${score} out of 10`}>
        {/* Background track */}
        <circle cx="28" cy="28" r={radius} className="fill-none stroke-[#2d2d2d] stroke-[4]" />
        {/* Animated fill */}
        <circle
          cx="28" cy="28" r={radius}
          className="fill-none stroke-[4] stroke-round origin-center -rotate-90 transition-[stroke-dashoffset] duration-1000 ease-out"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <span className="absolute text-xs font-bold font-mono" style={{ color }}>{score}</span>
    </div>
  )
}
