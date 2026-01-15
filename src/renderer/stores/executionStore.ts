/**
 * Claude Forge - Execution Store
 *
 * Zustand store for managing execution state.
 * Handles prompt execution, progress tracking, and results.
 */

import { create } from 'zustand';
import { Agent, Commit } from '../../shared/types';

// Execution status states
type ExecutionStatus = 'idle' | 'preparing' | 'executing' | 'completed' | 'error';

interface ExecutionState {
  // Execution state
  status: ExecutionStatus;
  currentPrompt: string;
  error: string | null;
  lastResult: Commit | null;

  // Actions
  execute: (projectPath: string, agent: Agent, prompt: string) => Promise<Commit | null>;
  setPrompt: (prompt: string) => void;
  clearError: () => void;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  // Initial state
  status: 'idle',
  currentPrompt: '',
  error: null,
  lastResult: null,

  // Execute a prompt with the specified agent
  execute: async (projectPath: string, agent: Agent, prompt: string) => {
    set({ status: 'preparing', error: null, currentPrompt: prompt });

    try {
      set({ status: 'executing' });

      const result = await window.claudeForge.execute.run({
        projectPath,
        agent,
        userPrompt: prompt
      });

      if (result.success && result.commit) {
        set({
          status: 'completed',
          lastResult: result.commit,
          currentPrompt: ''
        });
        return result.commit;
      } else {
        set({
          status: 'error',
          error: result.error || 'Execution failed'
        });
        return null;
      }
    } catch (err) {
      set({
        status: 'error',
        error: String(err)
      });
      return null;
    }
  },

  // Update the current prompt text
  setPrompt: (prompt: string) => {
    set({ currentPrompt: prompt });
  },

  // Clear error state
  clearError: () => {
    set({ error: null, status: 'idle' });
  },

  // Reset to initial state
  reset: () => {
    set({
      status: 'idle',
      currentPrompt: '',
      error: null,
      lastResult: null
    });
  }
}));
