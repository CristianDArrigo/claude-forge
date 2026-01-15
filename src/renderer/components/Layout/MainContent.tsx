/**
 * Claude Forge - Main Content Component
 *
 * The main workspace area containing the prompt input,
 * execution status, and commit timeline.
 */

import React from 'react';
import PromptInput from '../Prompt/PromptInput';
import ExecutionStatus from '../Execution/ExecutionStatus';
import CommitTimeline from '../Timeline/CommitTimeline';
import { useExecutionStore } from '../../stores/executionStore';
import './MainContent.css';

/**
 * MainContent component containing the primary workspace.
 */
function MainContent(): React.ReactElement {
  const { status } = useExecutionStore();

  // Show execution status when running
  const isExecuting = status === 'preparing' || status === 'executing';

  return (
    <main className="main-content">
      {/* Prompt input area */}
      <div className="main-content-header">
        <PromptInput />
      </div>

      {/* Execution status (shown when running) */}
      {isExecuting && (
        <div className="main-content-status">
          <ExecutionStatus />
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
