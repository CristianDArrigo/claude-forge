/**
 * Claude Forge - Sidebar Component
 *
 * The left sidebar containing project info and agent list.
 * Provides navigation and agent selection functionality.
 */

import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import AgentList from '../Agent/AgentList';
import './Sidebar.css';

/**
 * Sidebar component displaying project info and available agents.
 */
function Sidebar(): React.ReactElement {
  const { project, setProject } = useProjectStore();

  // Handler to close the current project
  const handleCloseProject = () => {
    setProject(null);
  };

  return (
    <aside className="sidebar">
      {/* Project section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="sidebar-section-title">Project</span>
          <button
            className="btn btn-ghost sidebar-close-btn"
            onClick={handleCloseProject}
            title="Close project"
          >
            Close
          </button>
        </div>
        <div className="project-info">
          <div className="project-name">{project?.name || 'No Project'}</div>
          <div className="project-path">{project?.path || ''}</div>
        </div>
      </div>

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
