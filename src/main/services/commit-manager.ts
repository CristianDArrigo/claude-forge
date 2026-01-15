/**
 * Claude Forge - Commit Manager Service
 *
 * Handles creation, storage, and retrieval of commit JSON files.
 * Each execution produces exactly one commit, stored as an immutable
 * JSON file in .claude_commits/.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Commit, Agent, Project, ExecutionInfo, PromptInfo, AIOutput, FilesystemChanges, CommitNotes } from '../../shared/types';

// Directory name for storing commits
const COMMITS_DIR = '.claude_commits';

/**
 * Data required to create a new commit (without generated fields).
 */
interface CommitData {
  project: Project;
  agent: Agent;
  execution: ExecutionInfo;
  prompt: PromptInfo;
  ai_output: AIOutput;
  filesystem_changes: FilesystemChanges;
  notes: CommitNotes;
}

/**
 * CommitManager handles all commit persistence operations.
 */
export class CommitManager {
  /**
   * Creates a new commit object with a timestamp-based ID.
   */
  createCommit(data: CommitData): Commit {
    const timestamp = new Date().toISOString();

    return {
      commit_id: timestamp,
      timestamp,
      ...data
    };
  }

  /**
   * Saves a commit to the project's .claude_commits directory.
   * Commit files are named with their timestamp for sortable ordering.
   */
  saveCommit(projectPath: string, commit: Commit): void {
    const commitsDir = join(projectPath, COMMITS_DIR);

    // Ensure commits directory exists
    if (!existsSync(commitsDir)) {
      mkdirSync(commitsDir, { recursive: true });
    }

    // Create filename from timestamp (replace colons for Windows compatibility)
    const filename = commit.commit_id.replace(/:/g, '-') + '.json';
    const filePath = join(commitsDir, filename);

    // Write commit JSON with pretty formatting
    writeFileSync(filePath, JSON.stringify(commit, null, 2), 'utf-8');
  }

  /**
   * Lists all commits for a project, sorted by timestamp (most recent first).
   */
  listCommits(projectPath: string): Commit[] {
    const commitsDir = join(projectPath, COMMITS_DIR);

    if (!existsSync(commitsDir)) {
      return [];
    }

    const files = readdirSync(commitsDir)
      .filter(file => file.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first

    const commits: Commit[] = [];

    for (const file of files) {
      try {
        const filePath = join(commitsDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const commit = JSON.parse(content) as Commit;
        commits.push(commit);
      } catch (err) {
        console.error(`Failed to read commit file ${file}:`, err);
      }
    }

    return commits;
  }

  /**
   * Gets a specific commit by ID.
   */
  getCommit(projectPath: string, commitId: string): Commit | null {
    const commitsDir = join(projectPath, COMMITS_DIR);

    // Convert commit ID to filename format
    const filename = commitId.replace(/:/g, '-') + '.json';
    const filePath = join(commitsDir, filename);

    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Commit;
    } catch (err) {
      console.error(`Failed to read commit ${commitId}:`, err);
      return null;
    }
  }

  /**
   * Gets the most recent commit for a project.
   */
  getLatestCommit(projectPath: string): Commit | null {
    const commits = this.listCommits(projectPath);
    return commits.length > 0 ? commits[0] : null;
  }

  /**
   * Counts the total number of commits in a project.
   */
  countCommits(projectPath: string): number {
    const commitsDir = join(projectPath, COMMITS_DIR);

    if (!existsSync(commitsDir)) {
      return 0;
    }

    return readdirSync(commitsDir).filter(file => file.endsWith('.json')).length;
  }
}

// Singleton instance
export const commitManager = new CommitManager();
