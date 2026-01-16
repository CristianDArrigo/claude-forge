/**
 * Claude Forge - Project Store
 *
 * Zustand store for managing multi-project state.
 * Supports multiple open projects with tab-based navigation.
 */

import { create } from 'zustand';
import { Project } from '../../shared/types';

// Generate a unique ID from a path (simple hash)
function generateProjectId(path: string): string {
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    const char = path.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

interface ProjectState {
  // Multi-project state
  projects: Project[];
  activeProjectId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  openProject: () => Promise<void>;
  addProject: (path: string) => Promise<Project | null>;
  closeProject: (projectId: string) => void;
  setActiveProject: (projectId: string) => void;
  clearError: () => void;

  // Getters
  getActiveProject: () => Project | null;
  getProject: (projectId: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial state
  projects: [],
  activeProjectId: null,
  isLoading: false,
  error: null,

  // Open a project via directory selection
  openProject: async () => {
    set({ isLoading: true, error: null });

    try {
      // Show directory selection dialog
      const selectedPath = await window.claudeForge.project.selectDirectory();

      if (!selectedPath) {
        set({ isLoading: false });
        return;
      }

      // Check if project is already open
      const existing = get().projects.find(p => p.path === selectedPath);
      if (existing) {
        set({ activeProjectId: existing.id, isLoading: false });
        return;
      }

      // Open the selected directory as a project
      const result = await window.claudeForge.project.open(selectedPath);

      if (result.success) {
        const projectId = generateProjectId(selectedPath);
        const project: Project = {
          id: projectId,
          name: selectedPath.split(/[/\\]/).pop() || 'Project',
          path: selectedPath
        };

        set(state => ({
          projects: [...state.projects, project],
          activeProjectId: projectId,
          isLoading: false
        }));
      } else {
        set({ error: result.error || 'Failed to open project', isLoading: false });
      }
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  // Add a project programmatically
  addProject: async (path: string) => {
    // Check if already open
    const existing = get().projects.find(p => p.path === path);
    if (existing) {
      set({ activeProjectId: existing.id });
      return existing;
    }

    // Open the project
    const result = await window.claudeForge.project.open(path);

    if (result.success) {
      const projectId = generateProjectId(path);
      const project: Project = {
        id: projectId,
        name: path.split(/[/\\]/).pop() || 'Project',
        path
      };

      set(state => ({
        projects: [...state.projects, project],
        activeProjectId: projectId
      }));

      return project;
    }

    return null;
  },

  // Close a project
  closeProject: (projectId: string) => {
    const { projects, activeProjectId } = get();
    const newProjects = projects.filter(p => p.id !== projectId);

    // If closing the active project, switch to another
    let newActiveId = activeProjectId;
    if (activeProjectId === projectId) {
      const currentIndex = projects.findIndex(p => p.id === projectId);
      if (newProjects.length > 0) {
        // Try to switch to the next project, or the previous one
        const nextIndex = Math.min(currentIndex, newProjects.length - 1);
        newActiveId = newProjects[nextIndex].id;
      } else {
        newActiveId = null;
      }
    }

    set({
      projects: newProjects,
      activeProjectId: newActiveId
    });
  },

  // Set the active project
  setActiveProject: (projectId: string) => {
    set({ activeProjectId: projectId });
  },

  // Clear error state
  clearError: () => {
    set({ error: null });
  },

  // Get the currently active project
  getActiveProject: () => {
    const { projects, activeProjectId } = get();
    if (!activeProjectId) return null;
    return projects.find(p => p.id === activeProjectId) || null;
  },

  // Get a project by ID
  getProject: (projectId: string) => {
    return get().projects.find(p => p.id === projectId);
  }
}));
