/**
 * Claude Forge - Project Store
 *
 * Zustand store for managing project state.
 * Handles project opening, creation, and current project tracking.
 */

import { create } from 'zustand';
import { Project } from '../../shared/types';

interface ProjectState {
  // Current project state
  project: Project | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  openProject: () => Promise<void>;
  createProject: () => Promise<void>;
  setProject: (project: Project | null) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  // Initial state
  project: null,
  isLoading: false,
  error: null,

  // Open an existing project via directory selection
  openProject: async () => {
    set({ isLoading: true, error: null });

    try {
      // Show directory selection dialog
      const selectedPath = await window.claudeForge.project.selectDirectory();

      if (!selectedPath) {
        set({ isLoading: false });
        return;
      }

      // Open the selected directory as a project
      const result = await window.claudeForge.project.open(selectedPath);

      if (result.success) {
        set({
          project: {
            name: selectedPath.split(/[/\\]/).pop() || 'Project',
            path: selectedPath
          },
          isLoading: false
        });
      } else {
        set({ error: result.error || 'Failed to open project', isLoading: false });
      }
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  // Create a new project via directory selection
  createProject: async () => {
    set({ isLoading: true, error: null });

    try {
      // Show directory selection dialog
      const selectedPath = await window.claudeForge.project.selectDirectory();

      if (!selectedPath) {
        set({ isLoading: false });
        return;
      }

      // Create the project
      const name = selectedPath.split(/[/\\]/).pop() || 'Project';
      const result = await window.claudeForge.project.create(selectedPath, name);

      if (result.success) {
        set({
          project: { name, path: selectedPath },
          isLoading: false
        });
      } else {
        set({ error: result.error || 'Failed to create project', isLoading: false });
      }
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  // Set project directly (used for programmatic updates)
  setProject: (project) => {
    set({ project });
  },

  // Clear any error state
  clearError: () => {
    set({ error: null });
  }
}));
