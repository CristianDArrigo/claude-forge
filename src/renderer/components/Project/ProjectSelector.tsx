/**
 * Claude Forge - Project Selector Component
 *
 * Displayed when no project is open. Allows users to
 * open an existing project or create a new one.
 */

import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import './ProjectSelector.css';

/**
 * ProjectSelector component for project opening/creation.
 */
function ProjectSelector(): React.ReactElement {
  const { openProject, createProject, isLoading, error, clearError } = useProjectStore();

  return (
    <div className="project-selector">
      <div className="project-selector-content">
        {/* Logo/Title */}
        <div className="project-selector-header">
          <h1 className="project-selector-title">Claude Forge</h1>
          <p className="project-selector-subtitle">
            AI Engineering Environment
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="project-selector-error">
            <span>{error}</span>
            <button className="btn btn-ghost" onClick={clearError}>
              Dismiss
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="project-selector-actions">
          <button
            className="btn btn-primary project-selector-btn"
            onClick={openProject}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Open Project'}
          </button>
          <button
            className="btn btn-secondary project-selector-btn"
            onClick={createProject}
            disabled={isLoading}
          >
            Create New Project
          </button>
        </div>

        {/* Description */}
        <p className="project-selector-description">
          Select a folder to open as a project. Claude Forge will create
          a <code>.claude_commits</code> directory to store execution history.
        </p>
      </div>
    </div>
  );
}

export default ProjectSelector;
