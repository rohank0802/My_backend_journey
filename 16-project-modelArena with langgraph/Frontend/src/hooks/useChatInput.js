// ============================================================
// HOOKS LAYER — useChatInput
// Manages the chat input field's local state + auto-resize logic
// Delegates the actual send operation to useArena (hooks layer)
// ============================================================

import { useState, useRef } from 'react'
import { useArena } from './useArena'

/**
 * Hook for the InputBar UI component.
 * @returns {{ input, taRef, handleSend, handleKeyDown, handleChange, isLoading }}
 */
export function useChatInput() {
  const [input, setInput] = useState('')
  const taRef = useRef(null)
  const { sendMessage, isLoading } = useArena()

  /** Validates, clears, and sends the current input */
  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    if (taRef.current) taRef.current.style.height = 'auto'
    sendMessage(text)
  }

  /** Sends on Enter; allows Shift+Enter for newlines */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /** Updates value and auto-resizes the textarea */
  const handleChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return { input, taRef, handleSend, handleKeyDown, handleChange, isLoading }
}
