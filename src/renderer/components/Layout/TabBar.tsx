/**
 * Claude Forge - Tab Bar Component
 *
 * Horizontal tab bar for switching between open projects.
 * Displays at the top of the application window.
 */

import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import './TabBar.css';

/**
 * TabBar component for multi-project navigation.
 */
function TabBar(): React.ReactElement {
  const { projects, activeProjectId, setActiveProject, closeProject, openProject } = useProjectStore();
  const { getProjectTasks } = useTaskStore();

  // Handle tab click
  const handleTabClick = (projectId: string) => {
    setActiveProject(projectId);
  };

  // Handle tab close (stop propagation to prevent switching)
  const handleCloseClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    closeProject(projectId);
  };

  // Count running tasks for a project
  const getRunningCount = (projectId: string): number => {
    return getProjectTasks(projectId).filter(t => t.status === 'running').length;
  };

  return (
    <div className="tab-bar">
      <div className="tab-bar-tabs">
        {projects.map(project => {
          const isActive = project.id === activeProjectId;
          const runningCount = getRunningCount(project.id);

          return (
            <div
              key={project.id}
              className={`tab-bar-tab ${isActive ? 'tab-bar-tab-active' : ''}`}
              onClick={() => handleTabClick(project.id)}
              role="tab"
              tabIndex={0}
              aria-selected={isActive}
            >
              <span className="tab-bar-tab-name">{project.name}</span>
              {runningCount > 0 && (
                <span className="tab-bar-tab-badge">{runningCount}</span>
              )}
              <button
                className="tab-bar-tab-close"
                onClick={(e) => handleCloseClick(e, project.id)}
                title="Close project"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Add project button */}
      <button
        className="tab-bar-add"
        onClick={openProject}
        title="Open project"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

export default TabBar;
