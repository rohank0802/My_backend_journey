// ============================================================
// HOOKS LAYER — useHistory
// Thin wrapper that exposes sidebar-specific data from useArena
// Keeps the Sidebar component decoupled from the full arena API
// ============================================================

import { useArena } from './useArena'

/**
 * Hook for the Sidebar UI component.
 * @returns {{ history, newChat }}
 */
export function useHistory() {
  const { history, newChat } = useArena()
  return { history, newChat }
}
