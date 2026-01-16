/**
 * Claude Forge - Claude Executor Service
 *
 * Handles invocation of Claude Code CLI. This is the core execution
 * engine that spawns CLI processes and captures their output.
 * All AI execution must go through this service.
 */

import { spawn } from 'child_process';
import { createHash } from 'crypto';
import { Commit, ExecutionRequest } from '../../shared/types';

// Generate a unique ID from a path
function generateProjectId(path: string): string {
  return createHash('md5').update(path).digest('hex').substring(0, 12);
}
import { fileWatcher } from './file-watcher';
import { commitManager } from './commit-manager';
import { composePrompt, parseCommitMetadata } from '../utils/prompt-composer';

/**
 * Result of a Claude CLI execution.
 */
interface ExecutionOutput {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * ClaudeExecutor manages Claude Code CLI invocations.
 */
export class ClaudeExecutor {
  private isExecuting: boolean = false;

  /**
   * Executes a prompt using Claude Code CLI.
   *
   * Flow:
   * 1. Start file watcher
   * 2. Compose the full prompt
   * 3. Spawn Claude CLI process
   * 4. Capture output
   * 5. Stop file watcher
   * 6. Create and save commit
   */
  async execute(request: ExecutionRequest): Promise<{ success: boolean; commit?: Commit; error?: string }> {
    if (this.isExecuting) {
      return { success: false, error: 'An execution is already in progress' };
    }

    this.isExecuting = true;

    try {
      // Start watching for file changes
      fileWatcher.startWatching(request.projectPath);

      // Compose the full prompt with system instructions
      const composedPrompt = composePrompt(request.agent, request.userPrompt);

      // Execute Claude CLI
      const output = await this.runClaude(composedPrompt, request.projectPath);

      // Stop watching and get file changes
      const fileChanges = fileWatcher.stopWatching();

      // Parse commit metadata from response
      const metadata = parseCommitMetadata(output.stdout);

      // Create the commit object
      const commit = commitManager.createCommit({
        project: {
          id: generateProjectId(request.projectPath),
          name: request.projectPath.split(/[/\\]/).pop() || 'unknown',
          path: request.projectPath
        },
        agent: request.agent,
        execution: {
          backend: 'claude-code-cli',
          working_directory: request.projectPath,
          exit_code: output.exitCode
        },
        prompt: {
          user: request.userPrompt,
          composed: composedPrompt
        },
        ai_output: {
          raw_response: output.stdout,
          commit_title: metadata.title,
          commit_summary: metadata.summary
        },
        filesystem_changes: {
          files_read: [],  // Claude doesn't report reads in CLI output
          files_written: fileChanges.written,
          files_deleted: fileChanges.deleted
        },
        notes: {
          warnings: [],
          errors: output.stderr ? [output.stderr] : []
        }
      });

      // Save the commit to disk
      commitManager.saveCommit(request.projectPath, commit);

      return { success: true, commit };
    } catch (err) {
      // Ensure watcher is stopped on error
      fileWatcher.stopWatching();

      const errorMessage = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMessage };
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Spawns the Claude CLI process and captures output.
   * Uses --print flag for non-interactive output.
   */
  private runClaude(prompt: string, workingDirectory: string): Promise<ExecutionOutput> {
    return new Promise((resolve, reject) => {
      // Spawn Claude CLI with non-interactive flags
      // --print: non-interactive output mode
      // --dangerously-skip-permissions: bypass all permission checks for full automation
      // shell: false to avoid escaping issues with complex prompts
      const proc = spawn('claude', [
        '--print',
        '--dangerously-skip-permissions',
        prompt
      ], {
        cwd: workingDirectory,
        shell: false,
        env: { ...process.env }
      });

      let stdout = '';
      let stderr = '';

      // Capture stdout
      proc.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      // Capture stderr
      proc.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      // Handle process completion
      proc.on('close', (code: number | null) => {
        resolve({
          stdout,
          stderr,
          exitCode: code ?? 1
        });
      });

      // Handle process errors
      proc.on('error', (err: Error) => {
        reject(new Error(`Failed to spawn Claude CLI: ${err.message}`));
      });
    });
  }

  /**
   * Checks if an execution is currently in progress.
   */
  isRunning(): boolean {
    return this.isExecuting;
  }
}

// Singleton instance
export const claudeExecutor = new ClaudeExecutor();
