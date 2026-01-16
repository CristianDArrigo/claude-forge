/**
 * Claude Forge - Main Application Component
 *
 * The root component that manages the application layout with
 * multi-project tabs, sidebar, main content, and tasks panel.
 */

import React, { useEffect } from 'react';
import { useProjectStore } from './stores/projectStore';
import { useAgentStore } from './stores/agentStore';
import { useCommitStore } from './stores/commitStore';
import { useTaskStore } from './stores/taskStore';
import TabBar from './components/Layout/TabBar';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import TasksPanel from './components/Tasks/TasksPanel';
import ProjectSelector from './components/Project/ProjectSelector';

/**
 * Main application component.
 * Displays project selector if no projects are open,
 * otherwise shows the full workspace with tabs.
 */
function App(): React.ReactElement {
  const { projects, isLoading, getActiveProject } = useProjectStore();
  const { loadAgents } = useAgentStore();
  const { loadCommits, clearCommits } = useCommitStore();
  const { initializeListeners } = useTaskStore();

  const activeProject = getActiveProject();

  // Load agents on mount
  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  // Initialize task event listeners
  useEffect(() => {
    const cleanup = initializeListeners();
    return cleanup;
  }, [initializeListeners]);

  // Load commits when active project changes
  useEffect(() => {
    if (activeProject) {
      loadCommits(activeProject.path);
    } else {
      clearCommits();
    }
  }, [activeProject, loadCommits, clearCommits]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
        <span>Loading...</span>
      </div>
    );
  }

  // Show project selector if no projects are open
  if (projects.length === 0) {
    return <ProjectSelector />;
  }

  // Main workspace layout with multi-project support
  return (
    <div className="app-container">
      <TabBar />
      <div className="app-workspace">
        <Sidebar />
        <MainContent />
      </div>
      <TasksPanel />
    </div>
  );
}

export default App;
