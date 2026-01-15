/**
 * Claude Forge - Agent List Component
 *
 * Displays the list of available agents (default + custom)
 * and allows selection of an agent for execution.
 */

import React, { useState } from 'react';
import { useAgentStore } from '../../stores/agentStore';
import AgentEditor from './AgentEditor';
import './AgentList.css';

/**
 * AgentList component displaying available agents.
 */
function AgentList(): React.ReactElement {
  const { agents, selectedAgent, selectAgent } = useAgentStore();
  const [showEditor, setShowEditor] = useState(false);

  // Format permissions for display
  const formatPermissions = (permissions: { read: boolean; write: boolean; delete: boolean }): string => {
    const perms: string[] = [];
    if (permissions.read) perms.push('R');
    if (permissions.write) perms.push('W');
    if (permissions.delete) perms.push('D');
    return perms.join('');
  };

  return (
    <div className="agent-list-container">
      <div className="agent-list">
        {agents.map(agent => (
          <button
            key={agent.id}
            className={`agent-item ${selectedAgent?.id === agent.id ? 'agent-item-selected' : ''}`}
            onClick={() => selectAgent(agent)}
          >
            <div className="agent-item-info">
              <span className="agent-item-name">{agent.name}</span>
              <span className="agent-item-permissions">
                {formatPermissions(agent.permissions)}
              </span>
            </div>
            <span className="agent-item-role">{agent.role}</span>
          </button>
        ))}
      </div>

      {/* Add agent button */}
      <button
        className="btn btn-secondary agent-add-btn"
        onClick={() => setShowEditor(true)}
      >
        + New Agent
      </button>

      {/* Agent editor modal */}
      {showEditor && (
        <AgentEditor
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}

export default AgentList;
