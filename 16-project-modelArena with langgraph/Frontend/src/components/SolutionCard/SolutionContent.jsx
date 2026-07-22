// UI LAYER — SolutionContent
// Parses and renders markdown-like solution text
// Delegates code blocks to <CodeBlock> (sibling component)

import CodeBlock from '../CodeBlock/CodeBlock'

const toHTML = (str) =>
  str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="font-mono text-xs bg-[#2d2d2d] px-1.5 py-0.5 rounded text-[#00dbe9]">$1</code>')

export default function SolutionContent({ text }) {
  // Split on fenced code blocks, keeping the delimiters as separate parts
  const parts = text.split(/(```\w*\n[\s\S]*?```)/g)

  return (
    <div className="flex flex-col gap-2.5">
      {parts.map((part, i) => {
        // Code block — strip the fence markers, pass raw code to <CodeBlock>
        if (part.startsWith('```')) {
          const lines = part.split('\n')
          const code = lines.slice(1, -1).join('\n')
          return <CodeBlock key={i} code={code} />
        }

        // Text block — render headings, bullets, paragraphs
        return part
          .split('\n')
          .filter((l) => l.trim())
          .map((line, li) => {
            if (line.startsWith('### '))
              return <h4 key={`${i}-${li}`} className="text-xs font-semibold font-mono text-[#b9cacb] uppercase tracking-wider mt-2">{line.slice(4)}</h4>
            if (line.startsWith('## '))
              return <h3 key={`${i}-${li}`} className="text-sm font-semibold text-white mt-1.5">{line.slice(3)}</h3>
            if (line.trim().startsWith('- '))
              return (
                <li
                  key={`${i}-${li}`}
                  className="text-xs text-[#b9cacb] leading-relaxed ml-4 list-disc"
                  dangerouslySetInnerHTML={{ __html: toHTML(line.slice(2)) }}
                />
              )
            return (
              <p
                key={`${i}-${li}`}
                className="text-xs text-[#b9cacb] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: toHTML(line) }}
              />
            )
          })
      })}
    </div>
  )
}
