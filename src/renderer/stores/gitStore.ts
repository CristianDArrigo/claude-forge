/**
 * Claude Forge - Git Store
 *
 * Zustand store for managing git state.
 * Handles status, staging, commits, push/pull operations.
 */

import { create } from 'zustand';
import { GitStatus } from '../../shared/types';

interface GitState {
  // Git status for current project
  status: GitStatus | null;

  // Current project path (for git operations)
  projectPath: string | null;

  // Loading states
  isLoading: boolean;
  isCommitting: boolean;
  isPushing: boolean;
  isPulling: boolean;

  // Commit message input
  commitMessage: string;

  // Error message
  error: string | null;

  // Actions
  loadStatus: (projectPath: string) => Promise<void>;
  refreshStatus: () => Promise<void>;
  stageFile: (filePath: string) => Promise<void>;
  unstageFile: (filePath: string) => Promise<void>;
  stageAll: () => Promise<void>;
  commit: () => Promise<boolean>;
  push: () => Promise<boolean>;
  pull: () => Promise<boolean>;
  setCommitMessage: (message: string) => void;
  clearError: () => void;
  clearStatus: () => void;
}

export const useGitStore = create<GitState>((set, get) => ({
  // Initial state
  status: null,
  projectPath: null,
  isLoading: false,
  isCommitting: false,
  isPushing: false,
  isPulling: false,
  commitMessage: '',
  error: null,

  // Load git status for a project
  loadStatus: async (projectPath: string) => {
    set({ isLoading: true, projectPath, error: null });

    try {
      const status = await window.claudeForge.git.getStatus(projectPath);
      set({ status, isLoading: false });
    } catch (err) {
      console.error('Failed to load git status:', err);
      set({ status: null, isLoading: false, error: String(err) });
    }
  },

  // Refresh git status for current project
  refreshStatus: async () => {
    const { projectPath } = get();
    if (!projectPath) return;

    try {
      const status = await window.claudeForge.git.getStatus(projectPath);
      set({ status });
    } catch (err) {
      console.error('Failed to refresh git status:', err);
    }
  },

  // Stage a file
  stageFile: async (filePath: string) => {
    const { projectPath } = get();
    if (!projectPath) return;

    try {
      const result = await window.claudeForge.git.stage(projectPath, filePath);
      if (!result.success) {
        set({ error: result.error || 'Failed to stage file' });
        return;
      }
      await get().refreshStatus();
    } catch (err) {
      set({ error: String(err) });
    }
  },

  // Unstage a file
  unstageFile: async (filePath: string) => {
    const { projectPath } = get();
    if (!projectPath) return;

    try {
      const result = await window.claudeForge.git.unstage(projectPath, filePath);
      if (!result.success) {
        set({ error: result.error || 'Failed to unstage file' });
        return;
      }
      await get().refreshStatus();
    } catch (err) {
      set({ error: String(err) });
    }
  },

  // Stage all changes
  stageAll: async () => {
    const { projectPath, status } = get();
    if (!projectPath || !status) return;

    try {
      // Stage all untracked and modified files
      for (const change of status.changes) {
        if (!change.staged) {
          await window.claudeForge.git.stage(projectPath, change.path);
        }
      }
      await get().refreshStatus();
    } catch (err) {
      set({ error: String(err) });
    }
  },

  // Create commit
  commit: async () => {
    const { projectPath, commitMessage } = get();
    if (!projectPath || !commitMessage.trim()) return false;

    set({ isCommitting: true, error: null });

    try {
      const result = await window.claudeForge.git.commit(projectPath, commitMessage.trim());
      if (!result.success) {
        set({ error: result.error || 'Failed to commit', isCommitting: false });
        return false;
      }
      set({ commitMessage: '', isCommitting: false });
      await get().refreshStatus();
      return true;
    } catch (err) {
      set({ error: String(err), isCommitting: false });
      return false;
    }
  },

  // Push to remote
  push: async () => {
    const { projectPath } = get();
    if (!projectPath) return false;

    set({ isPushing: true, error: null });

    try {
      const result = await window.claudeForge.git.push(projectPath);
      if (!result.success) {
        set({ error: result.error || 'Failed to push', isPushing: false });
        return false;
      }
      set({ isPushing: false });
      await get().refreshStatus();
      return true;
    } catch (err) {
      set({ error: String(err), isPushing: false });
      return false;
    }
  },

  // Pull from remote
  pull: async () => {
    const { projectPath } = get();
    if (!projectPath) return false;

    set({ isPulling: true, error: null });

    try {
      const result = await window.claudeForge.git.pull(projectPath);
      if (!result.success) {
        set({ error: result.error || 'Failed to pull', isPulling: false });
        return false;
      }
      set({ isPulling: false });
      await get().refreshStatus();
      return true;
    } catch (err) {
      set({ error: String(err), isPulling: false });
      return false;
    }
  },

  // Set commit message
  setCommitMessage: (message: string) => {
    set({ commitMessage: message });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Clear status (when switching projects)
  clearStatus: () => {
    set({
      status: null,
      projectPath: null,
      commitMessage: '',
      error: null
    });
  }
}));
