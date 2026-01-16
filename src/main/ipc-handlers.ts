/**
 * Claude Forge - IPC Handlers
 *
 * Registers all IPC handlers that bridge communication between
 * the main process and renderer process. Each handler maps to
 * a specific service operation.
 */

import { ipcMain, dialog } from 'electron';
import { IPC_CHANNELS, Agent, ExecutionRequest, TaskStartRequest } from '../shared/types';
import { projectManager } from './services/project-manager';
import { agentManager } from './services/agent-manager';
import { claudeExecutor } from './services/claude-executor';
import { commitManager } from './services/commit-manager';
import { taskManager } from './services/task-manager';

/**
 * Registers all IPC handlers.
 * Must be called before creating the browser window.
 */
export function registerIPCHandlers(): void {
  // Project handlers

  // Select directory using native dialog
  ipcMain.handle(IPC_CHANNELS.PROJECT_SELECT_DIRECTORY, async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      title: 'Select Project Directory'
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0];
  });

  // Open existing project
  ipcMain.handle(IPC_CHANNELS.PROJECT_OPEN, async (_event, path: string) => {
    return projectManager.openProject(path);
  });

  // Create new project
  ipcMain.handle(IPC_CHANNELS.PROJECT_CREATE, async (_event, path: string, name: string) => {
    return projectManager.createProject(path, name);
  });

  // Agent handlers

  // List all agents
  ipcMain.handle(IPC_CHANNELS.AGENT_LIST, async () => {
    return agentManager.listAgents();
  });

  // Create new agent
  ipcMain.handle(IPC_CHANNELS.AGENT_CREATE, async (_event, agentData: Omit<Agent, 'id'>) => {
    return agentManager.createAgent(agentData);
  });

  // Update existing agent
  ipcMain.handle(IPC_CHANNELS.AGENT_UPDATE, async (_event, agent: Agent) => {
    try {
      agentManager.updateAgent(agent);
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  });

  // Delete agent
  ipcMain.handle(IPC_CHANNELS.AGENT_DELETE, async (_event, id: string) => {
    try {
      agentManager.deleteAgent(id);
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  });

  // Execution handlers

  // Run Claude execution
  ipcMain.handle(IPC_CHANNELS.EXECUTE_RUN, async (_event, request: ExecutionRequest) => {
    return claudeExecutor.execute(request);
  });

  // Get execution status
  ipcMain.handle(IPC_CHANNELS.EXECUTE_STATUS, async () => {
    return { isRunning: claudeExecutor.isRunning() };
  });

  // Commit handlers

  // List all commits for a project
  ipcMain.handle(IPC_CHANNELS.COMMIT_LIST, async (_event, projectPath: string) => {
    return commitManager.listCommits(projectPath);
  });

  // Get specific commit
  ipcMain.handle(IPC_CHANNELS.COMMIT_GET, async (_event, projectPath: string, commitId: string) => {
    return commitManager.getCommit(projectPath, commitId);
  });

  // Delete a specific commit
  ipcMain.handle(IPC_CHANNELS.COMMIT_DELETE, async (_event, projectPath: string, commitId: string) => {
    const success = commitManager.deleteCommit(projectPath, commitId);
    return { success };
  });

  // Delete all commits for a project
  ipcMain.handle(IPC_CHANNELS.COMMIT_DELETE_ALL, async (_event, projectPath: string) => {
    const count = commitManager.deleteAllCommits(projectPath);
    return { success: true, deleted: count };
  });

  // Task handlers (streaming execution)

  // Start a new task
  ipcMain.handle(IPC_CHANNELS.TASK_START, async (_event, request: TaskStartRequest) => {
    const result = taskManager.startTask(request);
    if (result.error) {
      return { success: false, error: result.error };
    }
    return { success: true, taskId: result.taskId };
  });

  // Cancel a running task
  ipcMain.handle(IPC_CHANNELS.TASK_CANCEL, async (_event, taskId: string) => {
    const success = taskManager.cancelTask(taskId);
    return { success };
  });

  // List all tasks
  ipcMain.handle(IPC_CHANNELS.TASK_LIST, async () => {
    return taskManager.listTasks();
  });

  // Get a specific task
  ipcMain.handle(IPC_CHANNELS.TASK_GET, async (_event, taskId: string) => {
    return taskManager.getTask(taskId) || null;
  });
}
