/**
 * Claude Forge - Git Manager Service
 *
 * Handles Git operations using child_process to execute git commands.
 * Provides status, staging, commit, push, and pull functionality.
 */

import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { GitStatus, GitChange, GitChangeStatus, GitResult } from '../../shared/types';

/**
 * GitManager handles all git operations.
 */
class GitManager {
  /**
   * Executes a git command and returns the output.
   */
  private execGit(cwd: string, args: string[]): { success: boolean; output: string; error?: string } {
    try {
      const result = spawnSync('git', args, {
        cwd,
        encoding: 'utf-8',
        shell: true
      });

      if (result.status !== 0) {
        return {
          success: false,
          output: result.stdout || '',
          error: result.stderr || 'Unknown git error'
        };
      }

      return {
        success: true,
        output: result.stdout || ''
      };
    } catch (err) {
      return {
        success: false,
        output: '',
        error: String(err)
      };
    }
  }

  /**
   * Checks if a directory is a git repository.
   */
  isRepository(path: string): boolean {
    const gitDir = join(path, '.git');
    return existsSync(gitDir);
  }

  /**
   * Gets the current git status.
   */
  getStatus(path: string): GitStatus {
    // Default empty status
    const emptyStatus: GitStatus = {
      isRepo: false,
      branch: '',
      ahead: 0,
      behind: 0,
      changes: []
    };

    if (!this.isRepository(path)) {
      return emptyStatus;
    }

    // Get branch name
    const branchResult = this.execGit(path, ['branch', '--show-current']);
    const branch = branchResult.success ? branchResult.output.trim() : 'unknown';

    // Get ahead/behind from upstream
    let ahead = 0;
    let behind = 0;
    const trackingResult = this.execGit(path, ['rev-list', '--left-right', '--count', '@{u}...HEAD']);
    if (trackingResult.success) {
      const parts = trackingResult.output.trim().split(/\s+/);
      if (parts.length === 2) {
        behind = parseInt(parts[0], 10) || 0;
        ahead = parseInt(parts[1], 10) || 0;
      }
    }

    // Get status with porcelain format
    const statusResult = this.execGit(path, ['status', '--porcelain=v1']);
    const changes: GitChange[] = [];

    if (statusResult.success && statusResult.output) {
      const lines = statusResult.output.trim().split('\n').filter(l => l);

      for (const line of lines) {
        // Porcelain format: XY PATH
        // X = index status, Y = worktree status
        const indexStatus = line[0];
        const workStatus = line[1];
        const filePath = line.substring(3).trim();

        // Determine staged status
        const isStaged = indexStatus !== ' ' && indexStatus !== '?';

        // Determine change status
        let status: GitChangeStatus = 'modified';

        if (indexStatus === '?' && workStatus === '?') {
          status = 'untracked';
        } else if (indexStatus === 'A' || workStatus === 'A') {
          status = 'added';
        } else if (indexStatus === 'D' || workStatus === 'D') {
          status = 'deleted';
        } else if (indexStatus === 'R' || workStatus === 'R') {
          status = 'renamed';
        } else if (indexStatus === 'M' || workStatus === 'M') {
          status = 'modified';
        }

        changes.push({
          path: filePath,
          status,
          staged: isStaged
        });
      }
    }

    return {
      isRepo: true,
      branch,
      ahead,
      behind,
      changes
    };
  }

  /**
   * Stages a file.
   */
  stageFile(cwd: string, filePath: string): GitResult {
    const result = this.execGit(cwd, ['add', '--', filePath]);
    return {
      success: result.success,
      message: result.success ? `Staged ${filePath}` : undefined,
      error: result.error
    };
  }

  /**
   * Unstages a file.
   */
  unstageFile(cwd: string, filePath: string): GitResult {
    const result = this.execGit(cwd, ['reset', 'HEAD', '--', filePath]);
    return {
      success: result.success,
      message: result.success ? `Unstaged ${filePath}` : undefined,
      error: result.error
    };
  }

  /**
   * Stages all changes.
   */
  stageAll(cwd: string): GitResult {
    const result = this.execGit(cwd, ['add', '-A']);
    return {
      success: result.success,
      message: result.success ? 'Staged all changes' : undefined,
      error: result.error
    };
  }

  /**
   * Creates a commit with the given message.
   */
  commit(cwd: string, message: string): GitResult {
    if (!message.trim()) {
      return { success: false, error: 'Commit message cannot be empty' };
    }

    const result = this.execGit(cwd, ['commit', '-m', message]);
    return {
      success: result.success,
      message: result.success ? 'Commit created successfully' : undefined,
      error: result.error
    };
  }

  /**
   * Pushes to remote.
   */
  push(cwd: string): GitResult {
    const result = this.execGit(cwd, ['push']);
    return {
      success: result.success,
      message: result.success ? 'Pushed to remote' : undefined,
      error: result.error
    };
  }

  /**
   * Pulls from remote.
   */
  pull(cwd: string): GitResult {
    const result = this.execGit(cwd, ['pull']);
    return {
      success: result.success,
      message: result.success ? 'Pulled from remote' : undefined,
      error: result.error
    };
  }

  /**
   * Gets the diff for a file or all changes.
   */
  getDiff(cwd: string, filePath?: string, staged: boolean = false): string {
    const args = ['diff'];
    if (staged) {
      args.push('--staged');
    }
    if (filePath) {
      args.push('--', filePath);
    }

    const result = this.execGit(cwd, args);
    return result.success ? result.output : '';
  }
}

// Export singleton instance
export const gitManager = new GitManager();
