/**
 * Claude Forge - File Watcher Service
 *
 * Uses chokidar to monitor filesystem changes during Claude execution.
 * Tracks file additions, modifications, and deletions to record in commits.
 */

import * as chokidar from 'chokidar';
import { relative } from 'path';

// Patterns to ignore during file watching
const IGNORED_PATTERNS = [
  '**/node_modules/**',
  '**/.git/**',
  '**/.claude_commits/**',
  '**/dist/**',
  '**/build/**',
  '**/*.log',
  '**/.DS_Store',
  '**/Thumbs.db'
];

/**
 * Tracks filesystem changes during execution.
 */
export interface FileChanges {
  written: string[];  // Files created or modified
  deleted: string[];  // Files deleted
}

/**
 * FileWatcher monitors a project directory for changes.
 */
export class FileWatcher {
  private watcher: chokidar.FSWatcher | null = null;
  private projectPath: string = '';
  private changes: FileChanges = { written: [], deleted: [] };
  private isWatching: boolean = false;

  /**
   * Starts watching a project directory for changes.
   * Must be called before Claude execution begins.
   */
  startWatching(projectPath: string): void {
    if (this.isWatching) {
      this.stopWatching();
    }

    this.projectPath = projectPath;
    this.changes = { written: [], deleted: [] };
    this.isWatching = true;

    // Initialize chokidar watcher
    this.watcher = chokidar.watch(projectPath, {
      ignored: IGNORED_PATTERNS,
      persistent: true,
      ignoreInitial: true,     // Don't emit events for existing files
      awaitWriteFinish: {      // Wait for writes to complete
        stabilityThreshold: 100,
        pollInterval: 50
      }
    });

    // Track file additions and modifications
    this.watcher.on('add', (filePath: string) => {
      const relativePath = this.getRelativePath(filePath);
      if (!this.changes.written.includes(relativePath)) {
        this.changes.written.push(relativePath);
      }
    });

    this.watcher.on('change', (filePath: string) => {
      const relativePath = this.getRelativePath(filePath);
      if (!this.changes.written.includes(relativePath)) {
        this.changes.written.push(relativePath);
      }
    });

    // Track file deletions
    this.watcher.on('unlink', (filePath: string) => {
      const relativePath = this.getRelativePath(filePath);
      if (!this.changes.deleted.includes(relativePath)) {
        this.changes.deleted.push(relativePath);
      }
      // Remove from written if it was also tracked as written
      const writtenIndex = this.changes.written.indexOf(relativePath);
      if (writtenIndex !== -1) {
        this.changes.written.splice(writtenIndex, 1);
      }
    });

    // Handle errors
    this.watcher.on('error', (error: Error) => {
      console.error('File watcher error:', error);
    });
  }

  /**
   * Stops watching and returns the collected changes.
   */
  stopWatching(): FileChanges {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }

    this.isWatching = false;

    // Return a copy of the changes
    const result = { ...this.changes };

    // Sort for consistent output
    result.written.sort();
    result.deleted.sort();

    return result;
  }

  /**
   * Gets the current changes without stopping the watcher.
   */
  getChanges(): FileChanges {
    return {
      written: [...this.changes.written].sort(),
      deleted: [...this.changes.deleted].sort()
    };
  }

  /**
   * Converts an absolute path to a relative path from project root.
   */
  private getRelativePath(absolutePath: string): string {
    return relative(this.projectPath, absolutePath).replace(/\\/g, '/');
  }

  /**
   * Checks if the watcher is currently active.
   */
  isActive(): boolean {
    return this.isWatching;
  }
}

// Singleton instance
export const fileWatcher = new FileWatcher();
