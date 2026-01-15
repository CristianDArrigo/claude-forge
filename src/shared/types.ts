/**
 * Claude Forge - Shared TypeScript Types
 *
 * This module contains all type definitions shared between
 * the main process and renderer process.
 */

// Agent permission flags
export interface AgentPermissions {
  read: boolean;   // Can read files in the project
  write: boolean;  // Can create and modify files
  delete: boolean; // Can delete files
}

// Agent definition - isolated execution profile
export interface Agent {
  id: string;
  name: string;
  role: string;    // System-level instruction describing the agent's purpose
  permissions: AgentPermissions;
}

// Project metadata
export interface Project {
  name: string;
  path: string;    // Absolute path to project directory
}

// Execution metadata stored in each commit
export interface ExecutionInfo {
  backend: 'claude-code-cli';
  working_directory: string;
  exit_code: number;
}

// Prompt data stored in each commit
export interface PromptInfo {
  user: string;     // Original user prompt
  composed: string; // Full prompt including system instructions
}

// AI output stored in each commit
export interface AIOutput {
  raw_response: string;    // Complete unfiltered response from Claude
  commit_title: string;    // AI-generated one-line summary
  commit_summary: string;  // AI-generated detailed summary
}

// Filesystem changes detected during execution
export interface FilesystemChanges {
  files_read: string[];    // Files that were read during execution
  files_written: string[]; // Files that were created or modified
  files_deleted: string[]; // Files that were deleted
}

// Notes and diagnostics for a commit
export interface CommitNotes {
  warnings: string[];
  errors: string[];
}

// Complete commit structure as stored in .claude_commits/
export interface Commit {
  commit_id: string;       // ISO timestamp format (YYYY-MM-DDTHH:mm:ss.sssZ)
  timestamp: string;       // Same as commit_id for human readability
  project: Project;
  agent: Agent;
  execution: ExecutionInfo;
  prompt: PromptInfo;
  ai_output: AIOutput;
  filesystem_changes: FilesystemChanges;
  notes: CommitNotes;
}

// Execution request from renderer to main process
export interface ExecutionRequest {
  projectPath: string;
  agent: Agent;
  userPrompt: string;
}

// Execution result returned to renderer
export interface ExecutionResult {
  success: boolean;
  commit?: Commit;
  error?: string;
}

// Project opening/creation result
export interface ProjectResult {
  success: boolean;
  project?: Project;
  error?: string;
}

// IPC channel names for type-safe communication
export const IPC_CHANNELS = {
  // Project operations
  PROJECT_OPEN: 'project:open',
  PROJECT_CREATE: 'project:create',
  PROJECT_SELECT_DIRECTORY: 'project:select-directory',

  // Agent operations
  AGENT_LIST: 'agent:list',
  AGENT_CREATE: 'agent:create',
  AGENT_UPDATE: 'agent:update',
  AGENT_DELETE: 'agent:delete',

  // Execution operations
  EXECUTE_RUN: 'execute:run',
  EXECUTE_STATUS: 'execute:status',

  // Commit operations
  COMMIT_LIST: 'commit:list',
  COMMIT_GET: 'commit:get'
} as const;

// Type for IPC channel names
export type IPCChannel = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS];
