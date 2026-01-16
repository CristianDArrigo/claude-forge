/**
 * Claude Forge - File Manager Service
 *
 * Handles file system operations for the file explorer.
 * Provides directory listing with filtering for common ignore patterns.
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, basename, extname, relative } from 'path';
import { FileEntry, TreeNode } from '../../shared/types';

// Directories and files to ignore in file explorer
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.cache',
  '.turbo',
  'coverage',
  '.nyc_output',
  '__pycache__',
  '.pytest_cache',
  '.tox',
  'venv',
  '.venv',
  'env',
  '.env.local',
  '.DS_Store',
  'Thumbs.db',
  '.claude_commits'
];

/**
 * FileManager handles file system operations.
 */
class FileManager {
  /**
   * Checks if a file/directory should be ignored.
   */
  private shouldIgnore(name: string): boolean {
    return IGNORE_PATTERNS.includes(name) || name.startsWith('.');
  }

  /**
   * Lists contents of a directory.
   */
  listDirectory(dirPath: string, includeHidden: boolean = false): FileEntry[] {
    if (!existsSync(dirPath)) {
      return [];
    }

    try {
      const entries = readdirSync(dirPath, { withFileTypes: true });
      const result: FileEntry[] = [];

      for (const entry of entries) {
        // Skip ignored patterns
        if (!includeHidden && this.shouldIgnore(entry.name)) {
          continue;
        }

        const fullPath = join(dirPath, entry.name);
        const isDirectory = entry.isDirectory();

        try {
          const stats = statSync(fullPath);

          result.push({
            name: entry.name,
            path: fullPath,
            type: isDirectory ? 'directory' : 'file',
            size: isDirectory ? undefined : stats.size,
            extension: isDirectory ? undefined : extname(entry.name)
          });
        } catch {
          // Skip files that can't be accessed
          continue;
        }
      }

      // Sort: directories first, then alphabetically
      result.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      return result;
    } catch (err) {
      console.error('Failed to list directory:', err);
      return [];
    }
  }

  /**
   * Gets a tree structure for a directory (single level, lazy loading).
   */
  getDirectoryTree(rootPath: string, depth: number = 1): TreeNode | null {
    if (!existsSync(rootPath)) {
      return null;
    }

    const name = basename(rootPath);

    // Create root node
    const root: TreeNode = {
      name,
      path: rootPath,
      type: 'directory',
      isLoaded: depth > 0,
      children: []
    };

    if (depth <= 0) {
      return root;
    }

    // Load children
    const entries = this.listDirectory(rootPath);
    root.children = entries.map(entry => {
      if (entry.type === 'directory') {
        return {
          ...entry,
          children: [],
          isLoaded: false
        } as TreeNode;
      }
      return entry as TreeNode;
    });

    return root;
  }

  /**
   * Gets children for a specific directory (for lazy loading).
   */
  getChildren(dirPath: string): TreeNode[] {
    const entries = this.listDirectory(dirPath);

    return entries.map(entry => {
      if (entry.type === 'directory') {
        return {
          ...entry,
          children: [],
          isLoaded: false
        } as TreeNode;
      }
      return entry as TreeNode;
    });
  }

  /**
   * Checks if a path exists.
   */
  exists(path: string): boolean {
    return existsSync(path);
  }

  /**
   * Gets relative path from root.
   */
  getRelativePath(rootPath: string, filePath: string): string {
    return relative(rootPath, filePath);
  }
}

// Export singleton instance
export const fileManager = new FileManager();
