/**
 * Claude Forge - Task Item Component
 *
 * Individual task item displayed in the TasksPanel.
 * Shows task status, project, prompt preview, and actions.
 */

import React from 'react';
import { Task } from '../../../shared/types';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import './TasksPanel.css';

interface TaskItemProps {
  task: Task;
}

/**
 * Formats elapsed or total time.
 */
function formatTime(startTime: string, endTime?: string): string {
  const start = new Date(startTime).getTime();
  const end = endTime ? new Date(endTime).getTime() : Date.now();
  const elapsed = Math.floor((end - start) / 1000);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * TaskItem component for displaying a single task.
 */
function TaskItem({ task }: TaskItemProps): React.ReactElement {
  const { setActiveProject } = useProjectStore();
  const { cancelTask, setActiveTask } = useTaskStore();

  // Truncate prompt for preview
  const promptPreview = task.prompt.length > 50
    ? task.prompt.substring(0, 50) + '...'
    : task.prompt;

  // Status indicator
  const getStatusIcon = () => {
    switch (task.status) {
      case 'running':
        return <div className="task-item-spinner" />;
      case 'completed':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'failed':
      case 'cancelled':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        );
      default:
        return <div className="task-item-dot" />;
    }
  };

  // Handle click to navigate to project
  const handleClick = () => {
    setActiveProject(task.projectId);
    if (task.status === 'running') {
      setActiveTask(task.id);
    }
  };

  // Handle cancel
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelTask(task.id);
  };

  return (
    <div
      className={`task-item task-item-${task.status}`}
      onClick={handleClick}
    >
      <div className="task-item-status">
        {getStatusIcon()}
      </div>

      <div className="task-item-info">
        <div className="task-item-header">
          <span className="task-item-project">{task.projectName}</span>
          <span className="task-item-agent">{task.agent.name}</span>
        </div>
        <div className="task-item-prompt">{promptPreview}</div>
      </div>

      <div className="task-item-meta">
        <span className="task-item-time">{formatTime(task.startTime, task.endTime)}</span>
        {task.status === 'running' && (
          <button
            className="task-item-cancel"
            onClick={handleCancel}
            title="Cancel task"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
