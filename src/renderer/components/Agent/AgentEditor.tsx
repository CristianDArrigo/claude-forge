/**
 * Claude Forge - Agent Editor Component
 *
 * Modal dialog for creating and editing custom agents.
 * Allows configuration of agent name, role, and permissions.
 */

import React, { useState } from 'react';
import { useAgentStore } from '../../stores/agentStore';
import { Agent } from '../../../shared/types';
import './AgentEditor.css';

interface AgentEditorProps {
  agent?: Agent;          // Agent to edit (undefined for new agent)
  onClose: () => void;    // Called when editor should close
}

/**
 * AgentEditor modal for creating/editing agents.
 */
function AgentEditor({ agent, onClose }: AgentEditorProps): React.ReactElement {
  const { createAgent, updateAgent } = useAgentStore();

  // Form state
  const [name, setName] = useState(agent?.name || '');
  const [role, setRole] = useState(agent?.role || '');
  const [canRead, setCanRead] = useState(agent?.permissions.read ?? true);
  const [canWrite, setCanWrite] = useState(agent?.permissions.write ?? true);
  const [canDelete, setCanDelete] = useState(agent?.permissions.delete ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!agent;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && agent) {
        await updateAgent({
          ...agent,
          name: name.trim(),
          role: role.trim(),
          permissions: {
            read: canRead,
            write: canWrite,
            delete: canDelete
          }
        });
      } else {
        await createAgent({
          name: name.trim(),
          role: role.trim(),
          permissions: {
            read: canRead,
            write: canWrite,
            delete: canDelete
          }
        });
      }
      onClose();
    } catch (err) {
      console.error('Failed to save agent:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="agent-editor-backdrop" onClick={handleBackdropClick}>
      <div className="agent-editor-modal">
        <h2 className="agent-editor-title">
          {isEditing ? 'Edit Agent' : 'New Agent'}
        </h2>

        <form onSubmit={handleSubmit} className="agent-editor-form">
          {/* Name field */}
          <div className="agent-editor-field">
            <label className="label" htmlFor="agent-name">Name</label>
            <input
              id="agent-name"
              type="text"
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Security Engineer"
              required
            />
          </div>

          {/* Role field */}
          <div className="agent-editor-field">
            <label className="label" htmlFor="agent-role">Role</label>
            <textarea
              id="agent-role"
              className="input textarea"
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="Describe what this agent does and how it should behave..."
              required
            />
          </div>

          {/* Permissions */}
          <div className="agent-editor-field">
            <span className="label">Permissions</span>
            <div className="agent-editor-permissions">
              <label className="agent-editor-checkbox">
                <input
                  type="checkbox"
                  checked={canRead}
                  onChange={e => setCanRead(e.target.checked)}
                />
                <span>Read files</span>
              </label>
              <label className="agent-editor-checkbox">
                <input
                  type="checkbox"
                  checked={canWrite}
                  onChange={e => setCanWrite(e.target.checked)}
                />
                <span>Write files</span>
              </label>
              <label className="agent-editor-checkbox">
                <input
                  type="checkbox"
                  checked={canDelete}
                  onChange={e => setCanDelete(e.target.checked)}
                />
                <span>Delete files</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="agent-editor-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !name.trim() || !role.trim()}
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Save' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgentEditor;
