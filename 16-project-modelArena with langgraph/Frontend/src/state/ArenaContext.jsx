// ============================================================
// STATE LAYER — global state via React Context + useReducer
// Imports constants from API layer (never calls API functions directly)
// Only the hooks layer dispatches actions to this context
// ============================================================

import { createContext, useContext, useReducer } from 'react'
import { INITIAL_HISTORY, INITIAL_MESSAGE } from '../api/arenaApi'

// ─── Initial State ───────────────────────────────────────────
const initialState = {
  messages: [INITIAL_MESSAGE],
  history: INITIAL_HISTORY,
  isLoading: false,
}

// ─── Reducer ─────────────────────────────────────────────────
function arenaReducer(state, action) {
  switch (action.type) {
    // Append a new loading message to the list
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }

    // Fill in the response data for a specific message id
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload.id
            ? { ...m, loading: false, data: action.payload.data }
            : m
        ),
      }

    // Toggle global loading flag
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    // Prepend new history entry and deactivate all existing entries
    case 'UPDATE_HISTORY': {
      const { id, title } = action.payload
      return {
        ...state,
        history: [
          { id, title, icon: 'compare_arrows', active: true },
          ...state.history.map((h) => ({ ...h, active: false })),
        ],
      }
    }

    // Clear chat — reset messages and deactivate history
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        history: state.history.map((h) => ({ ...h, active: false })),
      }

    default:
      return state
  }
}

// ─── Context + Provider ──────────────────────────────────────
const ArenaContext = createContext(null)

/**
 * Wraps the app and provides arena state to all descendants.
 * Place in main.jsx above <App />.
 */
export function ArenaProvider({ children }) {
  const [state, dispatch] = useReducer(arenaReducer, initialState)
  return (
    <ArenaContext.Provider value={{ state, dispatch }}>
      {children}
    </ArenaContext.Provider>
  )
}

/**
 * Low-level selector — used ONLY by the hooks layer.
 * UI components should never import this directly.
 */
export function useArenaState() {
  const ctx = useContext(ArenaContext)
  if (!ctx) throw new Error('useArenaState must be used inside <ArenaProvider>')
  return ctx
}
