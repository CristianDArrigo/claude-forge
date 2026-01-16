/**
 * Claude Forge - Main Content Component
 *
 * The main workspace area containing the prompt input,
 * execution card for active tasks, and commit timeline.
 */

import React from 'react';
import PromptInput from '../Prompt/PromptInput';
import ExecutionCard from '../Execution/ExecutionCard';
import CommitTimeline from '../Timeline/CommitTimeline';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import './MainContent.css';

/**
 * MainContent component containing the primary workspace.
 */
function MainContent(): React.ReactElement {
  const { activeProjectId } = useProjectStore();
  const { tasks, activeTaskId } = useTaskStore();

  // Find active task for current project (either explicitly active or most recent running)
  const activeTask = React.useMemo(() => {
    if (!activeProjectId) return null;

    // If there's an explicitly active task, use it
    if (activeTaskId) {
      const task = tasks.find(t => t.id === activeTaskId);
      if (task && task.projectId === activeProjectId) {
        return task;
      }
    }

    // Otherwise find the most recent running task for this project
    const projectTasks = tasks.filter(t => t.projectId === activeProjectId);
    const runningTask = projectTasks.find(t => t.status === 'running');
    return runningTask || null;
  }, [activeProjectId, activeTaskId, tasks]);

  return (
    <main className="main-content">
      {/* Prompt input area */}
      <div className="main-content-header">
        <PromptInput />
      </div>

      {/* Execution card for active task */}
      {activeTask && (
        <div className="main-content-status">
          <ExecutionCard task={activeTask} />
        </div>
      )}

      {/* Commit timeline */}
      <div className="main-content-timeline">
        <CommitTimeline />
      </div>
    </main>
  );
}

export default MainContent;
