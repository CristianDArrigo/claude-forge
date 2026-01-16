/**
 * Claude Forge - Main Application Component
 *
 * The root component that manages the application layout with
 * multi-project tabs, sidebar, main content, and tasks panel.
 */

import React, { useEffect, useState } from 'react';
import { useProjectStore } from './stores/projectStore';
import { useAgentStore } from './stores/agentStore';
import { useCommitStore } from './stores/commitStore';
import { useTaskStore } from './stores/taskStore';
import TabBar from './components/Layout/TabBar';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import TasksPanel from './components/Tasks/TasksPanel';
import ProjectSelector from './components/Project/ProjectSelector';
import SplashScreen from './components/SplashScreen/SplashScreen';

/**
 * Main application component.
 * Displays project selector if no projects are open,
 * otherwise shows the full workspace with tabs.
 */
// Splash screen timing in milliseconds
const SPLASH_DURATION = 3000;
const FADE_DURATION = 800;

function App(): React.ReactElement {
  const { projects, isLoading, getActiveProject } = useProjectStore();
  const { loadAgents } = useAgentStore();
  const { loadCommits, clearCommits } = useCommitStore();
  const { initializeListeners } = useTaskStore();

  const [showSplash, setShowSplash] = useState(true);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);
  const activeProject = getActiveProject();

  // Handle splash screen with fade transition
  useEffect(() => {
    // Start fade out before hiding
    const fadeTimer = setTimeout(() => {
      setFadeOutSplash(true);
    }, SPLASH_DURATION - FADE_DURATION);

    // Hide splash after fade completes
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen fadeOut={fadeOutSplash} />;
  }

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
