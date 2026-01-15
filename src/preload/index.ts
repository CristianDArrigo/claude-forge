/**
 * Claude Forge - Preload Script
 *
 * This script runs in a privileged context and exposes a secure API
 * to the renderer process via contextBridge. All IPC communication
 * must go through this bridge.
 */

import { contextBridge, ipcRenderer } from 'electron';
import { Agent, Commit, ExecutionRequest, IPC_CHANNELS } from '../shared/types';

/**
 * API exposed to the renderer process.
 * This is the only way for the renderer to communicate with the main process.
 */
const api = {
  // Project operations
  project: {
    /**
     * Opens a dialog to select a directory and opens it as a project.
     * Returns the project info or null if cancelled.
     */
    selectDirectory: (): Promise<string | null> => {
      return ipcRenderer.invoke(IPC_CHANNELS.PROJECT_SELECT_DIRECTORY);
    },

    /**
     * Opens an existing project at the specified path.
     */
    open: (path: string): Promise<{ success: boolean; error?: string }> => {
      return ipcRenderer.invoke(IPC_CHANNELS.PROJECT_OPEN, path);
    },

    /**
     * Creates a new project at the specified path.
     */
    create: (path: string, name: string): Promise<{ success: boolean; error?: string }> => {
      return ipcRenderer.invoke(IPC_CHANNELS.PROJECT_CREATE, path, name);
    }
  },

  // Agent operations
  agent: {
    /**
     * Lists all available agents (default + custom).
     */
    list: (): Promise<Agent[]> => {
      return ipcRenderer.invoke(IPC_CHANNELS.AGENT_LIST);
    },

    /**
     * Creates a new custom agent.
     */
    create: (agent: Omit<Agent, 'id'>): Promise<Agent> => {
      return ipcRenderer.invoke(IPC_CHANNELS.AGENT_CREATE, agent);
    },

    /**
     * Updates an existing agent.
     */
    update: (agent: Agent): Promise<void> => {
      return ipcRenderer.invoke(IPC_CHANNELS.AGENT_UPDATE, agent);
    },

    /**
     * Deletes a custom agent by ID.
     */
    delete: (id: string): Promise<void> => {
      return ipcRenderer.invoke(IPC_CHANNELS.AGENT_DELETE, id);
    }
  },

  // Execution operations
  execute: {
    /**
     * Runs a prompt with the specified agent.
     * This invokes Claude Code CLI and creates a commit.
     */
    run: (request: ExecutionRequest): Promise<{ success: boolean; commit?: Commit; error?: string }> => {
      return ipcRenderer.invoke(IPC_CHANNELS.EXECUTE_RUN, request);
    }
  },

  // Commit operations
  commit: {
    /**
     * Lists all commits for the current project.
     */
    list: (projectPath: string): Promise<Commit[]> => {
      return ipcRenderer.invoke(IPC_CHANNELS.COMMIT_LIST, projectPath);
    },

    /**
     * Gets a specific commit by ID.
     */
    get: (projectPath: string, commitId: string): Promise<Commit | null> => {
      return ipcRenderer.invoke(IPC_CHANNELS.COMMIT_GET, projectPath, commitId);
    }
  }
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('claudeForge', api);

// TypeScript declaration for the exposed API
declare global {
  interface Window {
    claudeForge: typeof api;
  }
}
