/**
 * Claude Forge - Commit Store
 *
 * Zustand store for managing commit timeline state.
 * Handles commit listing, expansion states, and navigation.
 */

import { create } from 'zustand';
import { Commit } from '../../shared/types';

interface CommitState {
  // Commit state
  commits: Commit[];
  expandedCommitIds: Set<string>;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadCommits: (projectPath: string) => Promise<void>;
  addCommit: (commit: Commit) => void;
  toggleExpanded: (commitId: string) => void;
  expandCommit: (commitId: string) => void;
  collapseCommit: (commitId: string) => void;
  collapseAll: () => void;
  clearCommits: () => void;
  clearError: () => void;
}

export const useCommitStore = create<CommitState>((set) => ({
  // Initial state
  commits: [],
  expandedCommitIds: new Set(),
  isLoading: false,
  error: null,

  // Load all commits for a project
  loadCommits: async (projectPath: string) => {
    set({ isLoading: true, error: null });

    try {
      const commits = await window.claudeForge.commit.list(projectPath);
      set({ commits, isLoading: false });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  // Add a new commit to the top of the list
  addCommit: (commit: Commit) => {
    set(state => ({
      commits: [commit, ...state.commits],
      // Auto-expand the new commit
      expandedCommitIds: new Set([commit.commit_id, ...state.expandedCommitIds])
    }));
  },

  // Toggle expansion state of a commit card
  toggleExpanded: (commitId: string) => {
    set(state => {
      const newExpanded = new Set(state.expandedCommitIds);
      if (newExpanded.has(commitId)) {
        newExpanded.delete(commitId);
      } else {
        newExpanded.add(commitId);
      }
      return { expandedCommitIds: newExpanded };
    });
  },

  // Expand a specific commit
  expandCommit: (commitId: string) => {
    set(state => ({
      expandedCommitIds: new Set([...state.expandedCommitIds, commitId])
    }));
  },

  // Collapse a specific commit
  collapseCommit: (commitId: string) => {
    set(state => {
      const newExpanded = new Set(state.expandedCommitIds);
      newExpanded.delete(commitId);
      return { expandedCommitIds: newExpanded };
    });
  },

  // Collapse all commits
  collapseAll: () => {
    set({ expandedCommitIds: new Set() });
  },

  // Clear all commits (when closing project)
  clearCommits: () => {
    set({ commits: [], expandedCommitIds: new Set() });
  },

  // Clear error state
  clearError: () => {
    set({ error: null });
  }
}));
