// UI LAYER — ArenaResponse
// Orchestrates the two SolutionCards + JudgePanel, plus a loading state
// Does NOT connect to any hook — receives data and loading as props

import SolutionCard from '../SolutionCard/SolutionCard'
import JudgePanel from '../JudgePanel/JudgePanel'

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-[#849495] text-xs">
      <div className="flex gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00dbe9] animate-bounce" style={{ animationDelay: '0s' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-[#bd00ff] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
      <p>Models are battling it out...</p>
    </div>
  )
}

export default function ArenaResponse({ data, loading }) {
  if (loading) return <LoadingState />
  if (!data) return null

  const { judge } = data
  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Side-by-side solution cards */}
      <div className="grid grid-cols-2 gap-4">
        <SolutionCard
          title="Solution 1"
          solution={data.solution_1}
          score={judge.solution_1_score}
          reasoning={judge.solution_1_reasoning}
          color="#00dbe9"
          isWinner={judge.solution_1_score >= judge.solution_2_score}
        />
        <SolutionCard
          title="Solution 2"
          solution={data.solution_2}
          score={judge.solution_2_score}
          reasoning={judge.solution_2_reasoning}
          color="#bd00ff"
          isWinner={judge.solution_2_score > judge.solution_1_score}
        />
      </div>

      {/* Full-width judge verdict */}
      <JudgePanel judge={judge} />
    </div>
  )
}
