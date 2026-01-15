/**
 * Claude Forge - Agent Manager Service
 *
 * Manages agent definitions including default agents and custom agents.
 * Agents are isolated execution profiles with specific roles and permissions.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { app } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from '../../shared/types';

// Default agents provided out of the box
const DEFAULT_AGENTS: Agent[] = [
  {
    id: 'architect',
    name: 'Architect',
    role: 'Design system architecture, create technical specifications, and plan implementations. Focus on structure, patterns, and high-level design.',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Implement features, write code, and build functionality. Follow existing patterns and conventions in the codebase.',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: 'reviewer',
    name: 'Reviewer',
    role: 'Review code for bugs, security issues, and improvements. Provide feedback without making changes.',
    permissions: { read: true, write: false, delete: false }
  },
  {
    id: 'documentation',
    name: 'Documentation',
    role: 'Write and update documentation, comments, and README files. Explain code and usage clearly.',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: 'security',
    name: 'Security Engineer',
    role: 'Focus on security hardening, threat modeling, and defensive coding. Identify and fix vulnerabilities.',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: 'refactor',
    name: 'Refactorer',
    role: 'Improve code structure, reduce duplication, and enhance maintainability without changing functionality.',
    permissions: { read: true, write: true, delete: true }
  }
];

/**
 * AgentManager handles CRUD operations for agents.
 */
export class AgentManager {
  private customAgents: Agent[] = [];
  private customAgentsPath: string;

  constructor() {
    // Store custom agents in user data directory
    this.customAgentsPath = join(app.getPath('userData'), 'custom-agents.json');
    this.loadCustomAgents();
  }

  /**
   * Loads custom agents from the user data file.
   */
  private loadCustomAgents(): void {
    if (existsSync(this.customAgentsPath)) {
      try {
        const data = readFileSync(this.customAgentsPath, 'utf-8');
        this.customAgents = JSON.parse(data);
      } catch (err) {
        console.error('Failed to load custom agents:', err);
        this.customAgents = [];
      }
    }
  }

  /**
   * Saves custom agents to the user data file.
   */
  private saveCustomAgents(): void {
    try {
      writeFileSync(this.customAgentsPath, JSON.stringify(this.customAgents, null, 2));
    } catch (err) {
      console.error('Failed to save custom agents:', err);
    }
  }

  /**
   * Lists all available agents (default + custom).
   */
  listAgents(): Agent[] {
    return [...DEFAULT_AGENTS, ...this.customAgents];
  }

  /**
   * Gets a specific agent by ID.
   */
  getAgent(id: string): Agent | undefined {
    return this.listAgents().find(agent => agent.id === id);
  }

  /**
   * Creates a new custom agent.
   */
  createAgent(agentData: Omit<Agent, 'id'>): Agent {
    const agent: Agent = {
      ...agentData,
      id: uuidv4()
    };

    this.customAgents.push(agent);
    this.saveCustomAgents();

    return agent;
  }

  /**
   * Updates an existing custom agent.
   * Default agents cannot be modified.
   */
  updateAgent(agent: Agent): void {
    // Check if it's a default agent
    if (DEFAULT_AGENTS.some(a => a.id === agent.id)) {
      throw new Error('Cannot modify default agents');
    }

    const index = this.customAgents.findIndex(a => a.id === agent.id);
    if (index === -1) {
      throw new Error('Agent not found');
    }

    this.customAgents[index] = agent;
    this.saveCustomAgents();
  }

  /**
   * Deletes a custom agent by ID.
   * Default agents cannot be deleted.
   */
  deleteAgent(id: string): void {
    // Check if it's a default agent
    if (DEFAULT_AGENTS.some(a => a.id === id)) {
      throw new Error('Cannot delete default agents');
    }

    const index = this.customAgents.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Agent not found');
    }

    this.customAgents.splice(index, 1);
    this.saveCustomAgents();
  }

  /**
   * Checks if an agent is a default (built-in) agent.
   */
  isDefaultAgent(id: string): boolean {
    return DEFAULT_AGENTS.some(a => a.id === id);
  }
}

// Singleton instance
export const agentManager = new AgentManager();
