/**
 * Claude Forge - Execution Card Component
 *
 * Expandable card showing current task execution with streaming output.
 * Replaces the simple ExecutionStatus component.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { Task } from '../../../shared/types';
import './ExecutionCard.css';

interface ExecutionCardProps {
  task: Task;
}

/**
 * Formats elapsed time since start.
 */
function formatElapsed(startTime: string): string {
  const start = new Date(startTime).getTime();
  const now = Date.now();
  const elapsed = Math.floor((now - start) / 1000);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * ExecutionCard component for displaying task execution.
 */
function ExecutionCard({ task }: ExecutionCardProps): React.ReactElement {
  const { cancelTask, setActiveTask } = useTaskStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [elapsed, setElapsed] = useState(formatElapsed(task.startTime));
  const outputRef = useRef<HTMLPreElement>(null);

  // Update elapsed time every second
  useEffect(() => {
    if (task.status !== 'running') return;

    const interval = setInterval(() => {
      setElapsed(formatElapsed(task.startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [task.startTime, task.status]);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (outputRef.current && isExpanded) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [task.output, isExpanded]);

  // Handle cancel
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelTask(task.id);
  };

  // Handle background (just collapse and clear active)
  const handleBackground = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setActiveTask(null);
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Truncate output for collapsed preview
  const getOutputPreview = (): string => {
    const lines = task.output.trim().split('\n');
    if (lines.length === 0) return 'Starting...';
    const lastLine = lines[lines.length - 1];
    return lastLine.length > 80 ? lastLine.substring(0, 80) + '...' : lastLine;
  };

  const isRunning = task.status === 'running';

  return (
    <div className={`execution-card ${isExpanded ? 'execution-card-expanded' : ''}`}>
      {/* Header - always visible */}
      <div className="execution-card-header" onClick={toggleExpanded}>
        <div className="execution-card-status">
          {isRunning ? (
            <div className="execution-card-spinner" />
          ) : (
            <div className={`execution-card-dot execution-card-dot-${task.status}`} />
          )}
          <span className="execution-card-title">
            {isRunning ? 'Claude is working...' : task.status === 'completed' ? 'Completed' : 'Failed'}
          </span>
        </div>

        <div className="execution-card-meta">
          <span className="execution-card-agent">{task.agent.name}</span>
          <span className="execution-card-elapsed">{elapsed}</span>
          <span className={`execution-card-chevron ${isExpanded ? 'execution-card-chevron-open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Collapsed preview */}
      {!isExpanded && isRunning && (
        <div className="execution-card-preview">
          {getOutputPreview()}
        </div>
      )}

      {/* Expanded content */}
      {isExpanded && (
        <div className="execution-card-content">
          {/* Prompt */}
          <div className="execution-card-prompt">
            <span className="execution-card-prompt-label">Prompt:</span>
            <span className="execution-card-prompt-text">{task.prompt}</span>
          </div>

          {/* Output */}
          <pre ref={outputRef} className="execution-card-output">
            {task.output || 'Waiting for output...'}
          </pre>

          {/* Actions */}
          {isRunning && (
            <div className="execution-card-actions">
              <button
                className="btn btn-secondary"
                onClick={handleBackground}
              >
                Send to Background
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Error message */}
          {task.error && (
            <div className="execution-card-error">
              {task.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExecutionCard;
