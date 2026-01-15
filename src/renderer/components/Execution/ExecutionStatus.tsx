/**
 * Claude Forge - Execution Status Component
 *
 * Displays the current execution status when Claude is running.
 * Shows a loading indicator and status message.
 */

import React from 'react';
import { useExecutionStore } from '../../stores/executionStore';
import './ExecutionStatus.css';

/**
 * ExecutionStatus component showing current execution progress.
 */
function ExecutionStatus(): React.ReactElement {
  const { status, currentPrompt } = useExecutionStore();

  // Determine status message
  const getMessage = (): string => {
    switch (status) {
      case 'preparing':
        return 'Preparing execution...';
      case 'executing':
        return 'Claude is working...';
      default:
        return '';
    }
  };

  // Truncate prompt for display
  const truncatePrompt = (prompt: string, maxLength: number = 100): string => {
    if (prompt.length <= maxLength) {
      return prompt;
    }
    return prompt.substring(0, maxLength) + '...';
  };

  return (
    <div className="execution-status">
      <div className="execution-status-indicator">
        <div className="execution-status-spinner" />
        <span className="execution-status-message">{getMessage()}</span>
      </div>
      {currentPrompt && (
        <div className="execution-status-prompt">
          {truncatePrompt(currentPrompt)}
        </div>
      )}
    </div>
  );
}

export default ExecutionStatus;
