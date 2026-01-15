/**
 * Claude Forge - Commit Card Component
 *
 * Displays a single commit as a collapsible card.
 * Shows commit title, timestamp, and agent in collapsed state.
 * Expands to show summary, file changes, and raw response.
 */

import React, { useState } from 'react';
import { useCommitStore } from '../../stores/commitStore';
import { Commit } from '../../../shared/types';
import './CommitCard.css';

interface CommitCardProps {
  commit: Commit;
}

/**
 * Formats a timestamp for display.
 */
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * CommitCard component for displaying a single commit.
 */
function CommitCard({ commit }: CommitCardProps): React.ReactElement {
  const { expandedCommitIds, toggleExpanded } = useCommitStore();
  const [showRawResponse, setShowRawResponse] = useState(false);

  const isExpanded = expandedCommitIds.has(commit.commit_id);

  // Count file changes
  const filesWritten = commit.filesystem_changes.files_written.length;
  const filesDeleted = commit.filesystem_changes.files_deleted.length;
  const totalChanges = filesWritten + filesDeleted;

  return (
    <div className={`commit-card ${isExpanded ? 'commit-card-expanded' : ''}`}>
      {/* Collapsed header - always visible */}
      <button
        className="commit-card-header"
        onClick={() => toggleExpanded(commit.commit_id)}
      >
        <div className="commit-card-header-main">
          <span className="commit-card-title">{commit.ai_output.commit_title}</span>
          <div className="commit-card-meta">
            <span className="commit-card-agent">{commit.agent.name}</span>
            <span className="commit-card-separator">-</span>
            <span className="commit-card-timestamp">{formatTimestamp(commit.timestamp)}</span>
            {totalChanges > 0 && (
              <>
                <span className="commit-card-separator">-</span>
                <span className="commit-card-changes">
                  {filesWritten > 0 && <span className="commit-card-written">+{filesWritten}</span>}
                  {filesDeleted > 0 && <span className="commit-card-deleted">-{filesDeleted}</span>}
                </span>
              </>
            )}
          </div>
        </div>
        <span className={`commit-card-chevron ${isExpanded ? 'commit-card-chevron-open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="commit-card-content">
          {/* Summary */}
          <div className="commit-card-section">
            <h4 className="commit-card-section-title">Summary</h4>
            <p className="commit-card-summary">{commit.ai_output.commit_summary}</p>
          </div>

          {/* User prompt */}
          <div className="commit-card-section">
            <h4 className="commit-card-section-title">Prompt</h4>
            <p className="commit-card-prompt">{commit.prompt.user}</p>
          </div>

          {/* File changes */}
          {totalChanges > 0 && (
            <div className="commit-card-section">
              <h4 className="commit-card-section-title">Files Changed</h4>
              <div className="commit-card-files">
                {commit.filesystem_changes.files_written.map(file => (
                  <div key={file} className="commit-card-file commit-card-file-written">
                    <span className="commit-card-file-indicator">M</span>
                    <span className="commit-card-file-path">{file}</span>
                  </div>
                ))}
                {commit.filesystem_changes.files_deleted.map(file => (
                  <div key={file} className="commit-card-file commit-card-file-deleted">
                    <span className="commit-card-file-indicator">D</span>
                    <span className="commit-card-file-path">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execution info */}
          <div className="commit-card-section">
            <h4 className="commit-card-section-title">Execution</h4>
            <div className="commit-card-execution">
              <span>Exit code: {commit.execution.exit_code}</span>
              {commit.notes.errors.length > 0 && (
                <span className="commit-card-error">Errors: {commit.notes.errors.length}</span>
              )}
            </div>
          </div>

          {/* Raw response toggle */}
          <div className="commit-card-section">
            <button
              className="btn btn-ghost commit-card-raw-toggle"
              onClick={() => setShowRawResponse(!showRawResponse)}
            >
              {showRawResponse ? 'Hide' : 'Show'} Raw Response
            </button>
            {showRawResponse && (
              <pre className="commit-card-raw">{commit.ai_output.raw_response}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommitCard;
