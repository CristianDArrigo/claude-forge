/**
 * Claude Forge - Prompt History Store
 *
 * Zustand store for managing prompt history per project.
 * Allows navigating through previous prompts with arrow keys.
 * Persists history to localStorage.
 */

import { create } from 'zustand';

// Maximum number of prompts to keep in history
const MAX_HISTORY = 50;

// LocalStorage key prefix for prompt history
const STORAGE_KEY_PREFIX = 'claude-forge-prompt-history-';

interface PromptHistoryState {
  // Current project ID for history scoping
  projectId: string | null;

  // Prompt history for current project (most recent first)
  history: string[];

  // Navigation index: -1 means new prompt, 0+ means history index
  currentIndex: number;

  // Temporary storage for current input when navigating
  tempPrompt: string;

  // Actions
  setProject: (projectId: string) => void;
  addPrompt: (prompt: string) => void;
  navigateUp: () => string | null;
  navigateDown: () => string | null;
  resetNavigation: () => void;
  setTempPrompt: (prompt: string) => void;
  clearHistory: () => void;
}

/**
 * Loads history from localStorage for a project.
 */
function loadHistory(projectId: string): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + projectId);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, MAX_HISTORY);
      }
    }
  } catch (err) {
    console.error('Failed to load prompt history:', err);
  }
  return [];
}

/**
 * Saves history to localStorage for a project.
 */
function saveHistory(projectId: string, history: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + projectId, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save prompt history:', err);
  }
}

export const usePromptHistoryStore = create<PromptHistoryState>((set, get) => ({
  // Initial state
  projectId: null,
  history: [],
  currentIndex: -1,
  tempPrompt: '',

  // Set the current project and load its history
  setProject: (projectId: string) => {
    const history = loadHistory(projectId);
    set({
      projectId,
      history,
      currentIndex: -1,
      tempPrompt: ''
    });
  },

  // Add a prompt to history (called after execution)
  addPrompt: (prompt: string) => {
    const { projectId, history } = get();
    if (!projectId || !prompt.trim()) return;

    // Remove duplicate if exists
    const filtered = history.filter(h => h !== prompt);

    // Add to front of history
    const newHistory = [prompt, ...filtered].slice(0, MAX_HISTORY);

    // Save and update state
    saveHistory(projectId, newHistory);
    set({
      history: newHistory,
      currentIndex: -1,
      tempPrompt: ''
    });
  },

  // Navigate up through history (older prompts)
  navigateUp: () => {
    const { history, currentIndex } = get();

    // No history to navigate
    if (history.length === 0) return null;

    // At newest history item or new prompt
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      set({ currentIndex: newIndex });
      return history[newIndex];
    }

    // Already at oldest item
    return history[currentIndex];
  },

  // Navigate down through history (newer prompts)
  navigateDown: () => {
    const state = get();

    // Already at new prompt state
    if (state.currentIndex === -1) return null;

    // Move toward newer prompts
    const newIndex = state.currentIndex - 1;
    set({ currentIndex: newIndex });

    // If back to new prompt, return temp prompt
    if (newIndex === -1) {
      return state.tempPrompt;
    }

    return state.history[newIndex];
  },

  // Reset navigation state (called when user starts typing)
  resetNavigation: () => {
    set({ currentIndex: -1, tempPrompt: '' });
  },

  // Save current prompt before navigating
  setTempPrompt: (prompt: string) => {
    set({ tempPrompt: prompt });
  },

  // Clear all history for current project
  clearHistory: () => {
    const { projectId } = get();
    if (!projectId) return;

    localStorage.removeItem(STORAGE_KEY_PREFIX + projectId);
    set({
      history: [],
      currentIndex: -1,
      tempPrompt: ''
    });
  }
}));
