/**
 * Claude Forge - Project Manager Service
 *
 * Handles project lifecycle operations including opening, creating,
 * and validating projects. Ensures .claude_commits directory exists.
 */

import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { Project } from '../../shared/types';

// Directory name for storing Claude Forge commits
const COMMITS_DIR = '.claude_commits';

/**
 * ProjectManager handles all project-related operations.
 */
export class ProjectManager {
  private currentProject: Project | null = null;

  /**
   * Gets the currently open project.
   */
  getCurrentProject(): Project | null {
    return this.currentProject;
  }

  /**
   * Opens an existing project at the specified path.
   * Validates the directory and ensures .claude_commits exists.
   */
  openProject(projectPath: string): { success: boolean; project?: Project; error?: string } {
    // Validate the path exists and is a directory
    if (!existsSync(projectPath)) {
      return { success: false, error: 'Directory does not exist' };
    }

    const stats = statSync(projectPath);
    if (!stats.isDirectory()) {
      return { success: false, error: 'Path is not a directory' };
    }

    // Ensure .claude_commits directory exists
    const commitsPath = join(projectPath, COMMITS_DIR);
    if (!existsSync(commitsPath)) {
      mkdirSync(commitsPath, { recursive: true });
    }

    // Create project object
    const project: Project = {
      name: basename(projectPath),
      path: projectPath
    };

    this.currentProject = project;

    return { success: true, project };
  }

  /**
   * Creates a new project at the specified path.
   * Creates the directory structure including .claude_commits.
   */
  createProject(projectPath: string, name: string): { success: boolean; project?: Project; error?: string } {
    // Create the project directory if it doesn't exist
    if (!existsSync(projectPath)) {
      try {
        mkdirSync(projectPath, { recursive: true });
      } catch (err) {
        return { success: false, error: `Failed to create directory: ${err}` };
      }
    }

    // Create .claude_commits directory
    const commitsPath = join(projectPath, COMMITS_DIR);
    if (!existsSync(commitsPath)) {
      mkdirSync(commitsPath, { recursive: true });
    }

    // Create project object
    const project: Project = {
      name: name || basename(projectPath),
      path: projectPath
    };

    this.currentProject = project;

    return { success: true, project };
  }

  /**
   * Validates that a path is a valid Claude Forge project.
   * A valid project has a .claude_commits directory.
   */
  isValidProject(projectPath: string): boolean {
    const commitsPath = join(projectPath, COMMITS_DIR);
    return existsSync(commitsPath) && statSync(commitsPath).isDirectory();
  }

  /**
   * Gets the path to the commits directory for a project.
   */
  getCommitsPath(projectPath: string): string {
    return join(projectPath, COMMITS_DIR);
  }

  /**
   * Lists all commit files in a project's .claude_commits directory.
   * Returns file names sorted by name (which are timestamps).
   */
  listCommitFiles(projectPath: string): string[] {
    const commitsPath = this.getCommitsPath(projectPath);

    if (!existsSync(commitsPath)) {
      return [];
    }

    return readdirSync(commitsPath)
      .filter(file => file.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first
  }

  /**
   * Closes the current project.
   */
  closeProject(): void {
    this.currentProject = null;
  }
}

// Singleton instance
export const projectManager = new ProjectManager();
