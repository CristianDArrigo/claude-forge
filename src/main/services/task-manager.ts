/**
 * Claude Forge - Task Manager Service
 *
 * Manages all execution tasks globally. Supports multiple concurrent
 * executions, streaming output, and background task management.
 */

import { BrowserWindow } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStartRequest, StreamChunk, Commit, IPC_CHANNELS } from '../../shared/types';
import { fileWatcher } from './file-watcher';
import { commitManager } from './commit-manager';
import { notificationManager } from './notification-manager';
import { composePrompt, parseCommitMetadata } from '../utils/prompt-composer';
import { spawn, ChildProcess } from 'child_process';

// Maximum number of concurrent task executions
const MAX_CONCURRENT_TASKS = 3;

/**
 * TaskManager handles all task lifecycle operations including
 * creation, execution, streaming, and completion.
 */
export class TaskManager {
  private tasks: Map<string, Task> = new Map();
  private processes: Map<string, ChildProcess> = new Map();
  private runningCount: number = 0;

  /**
   * Creates and starts a new task.
   * Returns the task ID immediately, execution happens asynchronously.
   */
  startTask(request: TaskStartRequest): { taskId: string; error?: string } {
    // Check concurrent limit
    if (this.runningCount >= MAX_CONCURRENT_TASKS) {
      return { taskId: '', error: 'Maximum concurrent tasks reached. Please wait for a task to complete.' };
    }

    // Create task object
    const taskId = uuidv4();
    const task: Task = {
      id: taskId,
      projectId: request.projectId,
      projectPath: request.projectPath,
      projectName: request.projectName,
      agent: request.agent,
      prompt: request.userPrompt,
      status: 'running',
      startTime: new Date().toISOString(),
      output: ''
    };

    this.tasks.set(taskId, task);
    this.runningCount++;

    // Start execution asynchronously
    this.executeTask(taskId, request);

    return { taskId };
  }

  /**
   * Executes a task asynchronously with streaming output.
   */
  private async executeTask(taskId: string, request: TaskStartRequest): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) return;

    try {
      // Start file watcher for this task
      fileWatcher.startWatching(request.projectPath);

      // Compose the full prompt
      const composedPrompt = composePrompt(request.agent, request.userPrompt);

      // Emit status update
      this.emitStream(taskId, {
        taskId,
        type: 'status',
        data: 'Starting Claude Code CLI...',
        timestamp: Date.now()
      });

      // Spawn Claude CLI process with non-interactive flags
      // --print: non-interactive output mode
      // --dangerously-skip-permissions: bypass all permission checks for full automation
      // Use shell: true on Windows for PATH resolution, pass prompt via stdin to avoid escaping issues
      const proc = spawn('claude', [
        '--print',
        '--dangerously-skip-permissions'
      ], {
        cwd: request.projectPath,
        shell: true,
        env: { ...process.env }
      });

      // Pass prompt via stdin to avoid shell escaping issues
      proc.stdin.write(composedPrompt);
      proc.stdin.end();

      this.processes.set(taskId, proc);

      // Handle stdout streaming
      proc.stdout.on('data', (data: Buffer) => {
        const chunk = data.toString();
        task.output += chunk;

        this.emitStream(taskId, {
          taskId,
          type: 'stdout',
          data: chunk,
          timestamp: Date.now()
        });
      });

      // Handle stderr streaming
      proc.stderr.on('data', (data: Buffer) => {
        const chunk = data.toString();
        task.output += chunk;

        this.emitStream(taskId, {
          taskId,
          type: 'stderr',
          data: chunk,
          timestamp: Date.now()
        });
      });

      // Handle process completion
      proc.on('close', (code: number | null) => {
        this.processes.delete(taskId);
        this.runningCount--;

        // Stop file watcher and get changes
        const fileChanges = fileWatcher.stopWatching();

        // Parse commit metadata from output
        const metadata = parseCommitMetadata(task.output);

        // Create commit
        const commit = commitManager.createCommit({
          project: {
            id: request.projectId,
            name: request.projectName,
            path: request.projectPath
          },
          agent: request.agent,
          execution: {
            backend: 'claude-code-cli',
            working_directory: request.projectPath,
            exit_code: code ?? 1
          },
          prompt: {
            user: request.userPrompt,
            composed: composedPrompt
          },
          ai_output: {
            raw_response: task.output,
            commit_title: metadata.title,
            commit_summary: metadata.summary
          },
          filesystem_changes: {
            files_read: [],
            files_written: fileChanges.written,
            files_deleted: fileChanges.deleted
          },
          notes: {
            warnings: [],
            errors: code !== 0 ? [`Process exited with code ${code}`] : []
          }
        });

        // Save commit to disk
        commitManager.saveCommit(request.projectPath, commit);

        // Update task status
        task.status = code === 0 ? 'completed' : 'failed';
        task.endTime = new Date().toISOString();
        task.commit = commit;

        // Emit completion event
        this.emitComplete(taskId, commit);
      });

      // Handle process errors
      proc.on('error', (err: Error) => {
        this.processes.delete(taskId);
        this.runningCount--;
        fileWatcher.stopWatching();

        task.status = 'failed';
        task.endTime = new Date().toISOString();
        task.error = err.message;

        this.emitError(taskId, err.message);
      });

    } catch (err) {
      this.runningCount--;
      fileWatcher.stopWatching();

      task.status = 'failed';
      task.endTime = new Date().toISOString();
      task.error = String(err);

      this.emitError(taskId, String(err));
    }
  }

  /**
   * Cancels a running task.
   */
  cancelTask(taskId: string): boolean {
    const proc = this.processes.get(taskId);
    const task = this.tasks.get(taskId);

    if (!proc || !task) {
      return false;
    }

    // Kill the process
    proc.kill('SIGTERM');
    this.processes.delete(taskId);
    this.runningCount--;

    // Update task status
    task.status = 'cancelled';
    task.endTime = new Date().toISOString();

    // Stop file watcher
    fileWatcher.stopWatching();

    // Emit cancellation as error
    this.emitError(taskId, 'Task cancelled by user');

    return true;
  }

  /**
   * Gets a task by ID.
   */
  getTask(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  /**
   * Lists all tasks.
   */
  listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Lists tasks for a specific project.
   */
  listProjectTasks(projectId: string): Task[] {
    return Array.from(this.tasks.values()).filter(t => t.projectId === projectId);
  }

  /**
   * Clears completed/failed/cancelled tasks.
   */
  clearFinishedTasks(): void {
    for (const [id, task] of this.tasks) {
      if (task.status !== 'running' && task.status !== 'queued') {
        this.tasks.delete(id);
      }
    }
  }

  /**
   * Gets the main browser window for sending IPC events.
   */
  private getWindow(): BrowserWindow | null {
    const windows = BrowserWindow.getAllWindows();
    return windows.length > 0 ? windows[0] : null;
  }

  /**
   * Emits a stream chunk to the renderer.
   */
  private emitStream(_taskId: string, chunk: StreamChunk): void {
    const win = this.getWindow();
    if (win) {
      win.webContents.send(IPC_CHANNELS.TASK_STREAM, chunk);
    }
  }

  /**
   * Emits task completion to the renderer.
   * Also triggers desktop notification if task completed successfully.
   */
  private emitComplete(taskId: string, commit: Commit): void {
    const win = this.getWindow();
    const task = this.tasks.get(taskId);
    if (win && task) {
      win.webContents.send(IPC_CHANNELS.TASK_COMPLETE, { taskId, task, commit });

      // Send desktop notification for completed task
      if (task.status === 'completed') {
        notificationManager.notifyTaskComplete(task.projectName, commit);
      } else if (task.status === 'failed') {
        notificationManager.notifyTaskFailed(task.projectName, 'Task execution failed');
      }
    }
  }

  /**
   * Emits task error to the renderer.
   * Also triggers desktop notification for failed task.
   */
  private emitError(taskId: string, error: string): void {
    const win = this.getWindow();
    const task = this.tasks.get(taskId);
    if (win && task) {
      win.webContents.send(IPC_CHANNELS.TASK_ERROR, { taskId, task, error });

      // Send desktop notification for failed task
      notificationManager.notifyTaskFailed(task.projectName, error);
    }
  }
}

// Singleton instance
export const taskManager = new TaskManager();
