/**
 * Claude Forge - Main Application Component
 *
 * The root component that manages the application layout and
 * coordinates between the sidebar and main content areas.
 */

import React, { useEffect } from 'react';
import { useProjectStore } from './stores/projectStore';
import { useAgentStore } from './stores/agentStore';
import { useCommitStore } from './stores/commitStore';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import ProjectSelector from './components/Project/ProjectSelector';

/**
 * Main application component.
 * Displays project selector if no project is open,
 * otherwise shows the main workspace.
 */
function App(): React.ReactElement {
  const { project, isLoading } = useProjectStore();
  const { loadAgents } = useAgentStore();
  const { loadCommits, clearCommits } = useCommitStore();

  // Load agents on mount
  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  // Load commits when project changes
  useEffect(() => {
    if (project) {
      loadCommits(project.path);
    } else {
      clearCommits();
    }
  }, [project, loadCommits, clearCommits]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
        <span>Loading...</span>
      </div>
    );
  }

  // Show project selector if no project is open
  if (!project) {
    return <ProjectSelector />;
  }

  // Main workspace layout
  return (
    <div className="app-container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
