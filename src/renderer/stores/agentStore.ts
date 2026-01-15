/**
 * Claude Forge - Agent Store
 *
 * Zustand store for managing agent state.
 * Handles agent listing, creation, editing, and selection.
 */

import { create } from 'zustand';
import { Agent } from '../../shared/types';

interface AgentState {
  // Agent state
  agents: Agent[];
  selectedAgent: Agent | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadAgents: () => Promise<void>;
  selectAgent: (agent: Agent | null) => void;
  createAgent: (data: Omit<Agent, 'id'>) => Promise<Agent | null>;
  updateAgent: (agent: Agent) => Promise<boolean>;
  deleteAgent: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  // Initial state
  agents: [],
  selectedAgent: null,
  isLoading: false,
  error: null,

  // Load all agents from main process
  loadAgents: async () => {
    set({ isLoading: true, error: null });

    try {
      const agents = await window.claudeForge.agent.list();
      set({ agents, isLoading: false });

      // Auto-select Developer agent if no agent is selected
      const { selectedAgent } = get();
      if (!selectedAgent && agents.length > 0) {
        const developer = agents.find(a => a.id === 'developer');
        set({ selectedAgent: developer || agents[0] });
      }
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  // Select an agent for execution
  selectAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  // Create a new custom agent
  createAgent: async (data) => {
    set({ error: null });

    try {
      const newAgent = await window.claudeForge.agent.create(data);

      // Add to local state
      set(state => ({
        agents: [...state.agents, newAgent]
      }));

      return newAgent;
    } catch (err) {
      set({ error: String(err) });
      return null;
    }
  },

  // Update an existing agent
  updateAgent: async (agent) => {
    set({ error: null });

    try {
      await window.claudeForge.agent.update(agent);

      // Update local state
      set(state => ({
        agents: state.agents.map(a => a.id === agent.id ? agent : a),
        selectedAgent: state.selectedAgent?.id === agent.id ? agent : state.selectedAgent
      }));

      return true;
    } catch (err) {
      set({ error: String(err) });
      return false;
    }
  },

  // Delete a custom agent
  deleteAgent: async (id) => {
    set({ error: null });

    try {
      await window.claudeForge.agent.delete(id);

      // Update local state
      set(state => ({
        agents: state.agents.filter(a => a.id !== id),
        selectedAgent: state.selectedAgent?.id === id ? null : state.selectedAgent
      }));

      return true;
    } catch (err) {
      set({ error: String(err) });
      return false;
    }
  },

  // Clear error state
  clearError: () => {
    set({ error: null });
  }
}));
