// UI LAYER — UserMessage
// Renders a single user chat bubble with avatar

export default function UserMessage({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00dbe9] to-[#bd00ff] flex items-center justify-center text-black shrink-0" aria-hidden="true">
        <span className="material-symbols-outlined !text-[20px]">person</span>
      </div>
      <div className="bg-[#242424] border border-[#2d2d2d] rounded-2xl rounded-tl-none px-4 py-3 max-w-[600px]">
        <p className="text-sm text-[#e5e2e1] leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
