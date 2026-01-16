/**
 * Claude Forge - Task Store
 *
 * Zustand store for managing global task state.
 * Tracks all running and completed tasks across all projects.
 */

import { create } from 'zustand';
import { Task, TaskStartRequest, StreamChunk, Commit } from '../../shared/types';
import { useCommitStore } from './commitStore';

interface TaskState {
  // Task state
  tasks: Task[];
  activeTaskId: string | null;  // Currently focused task (for ExecutionCard)

  // Actions
  startTask: (request: TaskStartRequest) => Promise<string | null>;
  cancelTask: (taskId: string) => Promise<void>;
  setActiveTask: (taskId: string | null) => void;
  updateTaskOutput: (taskId: string, chunk: string) => void;
  completeTask: (taskId: string, commit: Commit) => void;
  failTask: (taskId: string, error: string) => void;
  clearFinishedTasks: () => void;
  loadTasks: () => Promise<void>;

  // Helpers
  getTask: (taskId: string) => Task | undefined;
  getProjectTasks: (projectId: string) => Task[];
  getRunningTasks: () => Task[];

  // Event subscription management
  initializeListeners: () => () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  // Initial state
  tasks: [],
  activeTaskId: null,

  // Start a new task
  startTask: async (request: TaskStartRequest) => {
    const result = await window.claudeForge.task.start(request);

    if (!result.success || !result.taskId) {
      console.error('Failed to start task:', result.error);
      return null;
    }

    // Optimistically add task to local state
    const task: Task = {
      id: result.taskId,
      projectId: request.projectId,
      projectPath: request.projectPath,
      projectName: request.projectName,
      agent: request.agent,
      prompt: request.userPrompt,
      status: 'running',
      startTime: new Date().toISOString(),
      output: ''
    };

    set(state => ({
      tasks: [task, ...state.tasks],
      activeTaskId: result.taskId  // Set as active task
    }));

    return result.taskId;
  },

  // Cancel a running task
  cancelTask: async (taskId: string) => {
    await window.claudeForge.task.cancel(taskId);

    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === taskId ? { ...t, status: 'cancelled' as const, endTime: new Date().toISOString() } : t
      )
    }));
  },

  // Set the currently active/focused task
  setActiveTask: (taskId: string | null) => {
    set({ activeTaskId: taskId });
  },

  // Update task output with new streaming data
  updateTaskOutput: (taskId: string, chunk: string) => {
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === taskId ? { ...t, output: t.output + chunk } : t
      )
    }));
  },

  // Mark task as completed with commit
  completeTask: (taskId: string, commit: Commit) => {
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === taskId ? {
          ...t,
          status: 'completed' as const,
          endTime: new Date().toISOString(),
          commit
        } : t
      )
    }));
  },

  // Mark task as failed
  failTask: (taskId: string, error: string) => {
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === taskId ? {
          ...t,
          status: 'failed' as const,
          endTime: new Date().toISOString(),
          error
        } : t
      )
    }));
  },

  // Clear all finished tasks
  clearFinishedTasks: () => {
    set(state => ({
      tasks: state.tasks.filter(t => t.status === 'running' || t.status === 'queued')
    }));
  },

  // Load tasks from main process
  loadTasks: async () => {
    const tasks = await window.claudeForge.task.list();
    set({ tasks });
  },

  // Get a specific task
  getTask: (taskId: string) => {
    return get().tasks.find(t => t.id === taskId);
  },

  // Get tasks for a specific project
  getProjectTasks: (projectId: string) => {
    return get().tasks.filter(t => t.projectId === projectId);
  },

  // Get all running tasks
  getRunningTasks: () => {
    return get().tasks.filter(t => t.status === 'running');
  },

  // Initialize event listeners for streaming
  initializeListeners: () => {
    const { updateTaskOutput, completeTask, failTask } = get();

    // Listen for stream chunks
    const unsubStream = window.claudeForge.task.onStream((chunk: StreamChunk) => {
      if (chunk.type === 'stdout' || chunk.type === 'stderr') {
        updateTaskOutput(chunk.taskId, chunk.data);
      }
    });

    // Listen for task completion
    const unsubComplete = window.claudeForge.task.onComplete((data) => {
      completeTask(data.taskId, data.commit);
      // Add commit to the commit store for timeline display
      useCommitStore.getState().addCommit(data.commit);
    });

    // Listen for task errors
    const unsubError = window.claudeForge.task.onError((data) => {
      failTask(data.taskId, data.error);
    });

    // Return cleanup function
    return () => {
      unsubStream();
      unsubComplete();
      unsubError();
    };
  }
}));
