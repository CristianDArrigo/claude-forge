/**
 * Claude Forge - Tasks Panel Component
 *
 * Collapsible bottom panel showing all tasks across all projects.
 * Provides a global view of running and completed executions.
 */

import React, { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import TaskItem from './TaskItem';
import './TasksPanel.css';

/**
 * TasksPanel component for global task management.
 */
function TasksPanel(): React.ReactElement {
  const { tasks, clearFinishedTasks } = useTaskStore();
  const [isExpanded, setIsExpanded] = useState(true);

  // Count running tasks
  const runningCount = tasks.filter(t => t.status === 'running').length;
  const totalCount = tasks.length;

  // Toggle panel
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  // If no tasks, don't show the panel
  if (totalCount === 0) {
    return <></>;
  }

  return (
    <div className={`tasks-panel ${isExpanded ? 'tasks-panel-expanded' : ''}`}>
      {/* Header */}
      <div className="tasks-panel-header" onClick={togglePanel}>
        <div className="tasks-panel-title">
          <span>Tasks</span>
          {runningCount > 0 && (
            <span className="tasks-panel-badge">{runningCount} running</span>
          )}
          {runningCount === 0 && totalCount > 0 && (
            <span className="tasks-panel-count">{totalCount}</span>
          )}
        </div>

        <div className="tasks-panel-actions">
          {totalCount > runningCount && (
            <button
              className="btn btn-ghost tasks-panel-clear"
              onClick={(e) => {
                e.stopPropagation();
                clearFinishedTasks();
              }}
            >
              Clear Finished
            </button>
          )}
          <span className={`tasks-panel-chevron ${isExpanded ? 'tasks-panel-chevron-open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 15 12 9 18 15" />
            </svg>
          </span>
        </div>
      </div>

      {/* Task list */}
      {isExpanded && (
        <div className="tasks-panel-content">
          <div className="tasks-panel-list">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPanel;
