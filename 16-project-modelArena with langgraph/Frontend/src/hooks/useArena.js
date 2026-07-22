// ============================================================
// HOOKS LAYER — useArena
// Bridges: State (ArenaContext) ↔ API (arenaApi)
// UI components import this hook; they never touch state/api directly
// ============================================================

import { useArenaState } from '../state/ArenaContext'
import { submitProblem } from '../api/arenaApi'

/**
 * Primary hook for arena functionality.
 * @returns {{ messages, history, isLoading, sendMessage, newChat }}
 */
export function useArena() {
  const { state, dispatch } = useArenaState()

  /**
   * Orchestrates a full arena request:
   * 1. Optimistically adds a loading message to state
   * 2. Calls the API layer
   * 3. Updates state with the response
   */
  const sendMessage = async (text) => {
    const id = Date.now()

    dispatch({ type: 'ADD_MESSAGE', payload: { id, userText: text, data: null, loading: true } })
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const data = await submitProblem(text)
      dispatch({ type: 'UPDATE_MESSAGE', payload: { id, data } })
      dispatch({ type: 'UPDATE_HISTORY', payload: { id, title: text.slice(0, 28) } })
    } catch (err) {
      console.error('[useArena] submitProblem failed:', err)
      dispatch({ type: 'UPDATE_MESSAGE', payload: { id, data: null } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  /** Clears all messages and resets history active state */
  const newChat = () => dispatch({ type: 'CLEAR_MESSAGES' })

  return {
    messages: state.messages,
    history: state.history,
    isLoading: state.isLoading,
    sendMessage,
    newChat,
  }
}
