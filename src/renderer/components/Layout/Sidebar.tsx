/**
 * Claude Forge - Sidebar Component
 *
 * The left sidebar containing project list and agent list.
 * Provides navigation between projects and agent selection.
 */

import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import AgentList from '../Agent/AgentList';
import FileExplorer from '../FileExplorer/FileExplorer';
import GitPanel from '../Git/GitPanel';
import './Sidebar.css';

/**
 * Sidebar component displaying project list and available agents.
 */
function Sidebar(): React.ReactElement {
  const { projects, activeProjectId, setActiveProject, closeProject, getActiveProject } = useProjectStore();
  const { getProjectTasks } = useTaskStore();

  const activeProject = getActiveProject();

  // Count running tasks for a project
  const getRunningCount = (projectId: string): number => {
    return getProjectTasks(projectId).filter(t => t.status === 'running').length;
  };

  return (
    <aside className="sidebar">
      {/* Projects section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="sidebar-section-title">Projects</span>
        </div>
        <div className="project-list">
          {projects.map(project => {
            const isActive = project.id === activeProjectId;
            const runningCount = getRunningCount(project.id);

            return (
              <div
                key={project.id}
                className={`project-list-item ${isActive ? 'project-list-item-active' : ''}`}
                onClick={() => setActiveProject(project.id)}
              >
                <div className="project-list-item-info">
                  <span className="project-list-item-name">{project.name}</span>
                  {runningCount > 0 && (
                    <span className="project-list-item-badge">{runningCount}</span>
                  )}
                </div>
                <button
                  className="project-list-item-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeProject(project.id);
                  }}
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

        {/* Active project path */}
        {activeProject && (
          <div className="project-path-info">
            <span className="project-path">{activeProject.path}</span>
          </div>
        )}
      </div>

      {/* File explorer section */}
      {activeProject && (
        <div className="sidebar-section sidebar-section-files">
          <FileExplorer />
        </div>
      )}

      {/* Git section */}
      {activeProject && (
        <div className="sidebar-section sidebar-section-git">
          <GitPanel />
        </div>
      )}

      {/* Agents section */}
      <div className="sidebar-section sidebar-section-grow">
        <div className="sidebar-section-header">
          <span className="sidebar-section-title">Agents</span>
        </div>
        <AgentList />
      </div>
    </aside>
  );
}

export default Sidebar;
