// UI LAYER — CodeBlock
// Renders syntax-highlighted code with line numbers and a copy button
// Pure presentational — receives `code` string as prop, no hooks

import { useState } from 'react'

/** Tokenizes a single line of JS code for syntax highlighting */
function highlightLine(line) {
  const keywords = [
    'function', 'return', 'const', 'let', 'var', 'if', 'for',
    'export', 'import', 'from', 'else', 'while', 'new', 'typeof', 'class',
  ]
  const tokens = []
  let i = 0

  while (i < line.length) {
    // Comment
    if (line.slice(i, i + 2) === '//') {
      tokens.push(<span key={i} className="text-[#585b70] italic">{line.slice(i)}</span>)
      break
    }
    // String literal
    if (line[i] === "'" || line[i] === '"' || line[i] === '`') {
      const q = line[i]; let j = i + 1
      while (j < line.length && line[j] !== q) j++
      tokens.push(<span key={i} className="text-[#a6e3a1]">{line.slice(i, j + 1)}</span>)
      i = j + 1; continue
    }
    // Number literal
    if (/\d/.test(line[i]) && (i === 0 || !/[a-zA-Z_$]/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.]/.test(line[j])) j++
      tokens.push(<span key={i} className="text-[#fab387]">{line.slice(i, j)}</span>)
      i = j; continue
    }
    // Identifier / keyword / function call
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++
      const word = line.slice(i, j)
      if (keywords.includes(word)) tokens.push(<span key={i} className="text-[#cba6f7]">{word}</span>)
      else if (line[j] === '(') tokens.push(<span key={i} className="text-[#89dceb]">{word}</span>)
      else tokens.push(<span key={i}>{word}</span>)
      i = j; continue
    }
    tokens.push(<span key={i}>{line[i]}</span>)
    i++
  }
  return tokens
}

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-[#050505] border border-[#2d2d2d] rounded-lg overflow-hidden my-2">
      <button
        className="absolute top-2 right-2 flex items-center gap-1 py-1 px-2.5 bg-[#242424] border border-[#404040] rounded-md text-[#b9cacb] text-[11px] hover:bg-[#2d2d2d] hover:text-white transition-all cursor-pointer z-10"
        onClick={handleCopy}
      >
        <span className="material-symbols-outlined !text-[14px]">
          {copied ? 'check' : 'content_copy'}
        </span>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="py-3 pr-2 pl-0 my-0 overflow-x-auto font-mono text-xs leading-relaxed text-[#cdd6f4]">
        <code>
          {code.split('\n').map((line, idx) => (
            <div key={idx} className="flex">
              <span className="min-w-[40px] px-3 text-[#4a4a6a] text-right select-none shrink-0">
                {idx + 1}
              </span>
              <span className="flex-1 whitespace-pre">{highlightLine(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
