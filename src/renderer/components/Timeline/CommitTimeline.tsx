/**
 * Claude Forge - Commit Timeline Component
 *
 * Displays a vertical, scrollable list of commits in chronological order.
 * Each commit is shown as a collapsible card.
 */

import React from 'react';
import { useCommitStore } from '../../stores/commitStore';
import CommitCard from './CommitCard';
import './CommitTimeline.css';

/**
 * CommitTimeline component displaying the commit history.
 */
function CommitTimeline(): React.ReactElement {
  const { commits, isLoading } = useCommitStore();

  // Loading state
  if (isLoading) {
    return (
      <div className="commit-timeline-loading">
        <div className="loading-spinner" />
        <span>Loading commits...</span>
      </div>
    );
  }

  // Empty state
  if (commits.length === 0) {
    return (
      <div className="commit-timeline-empty">
        <div className="commit-timeline-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h3 className="commit-timeline-empty-title">No commits yet</h3>
        <p className="commit-timeline-empty-description">
          Execute a prompt to create your first commit.
          Each execution will be recorded here.
        </p>
      </div>
    );
  }

  // Render timeline
  return (
    <div className="commit-timeline">
      <div className="commit-timeline-header">
        <span className="commit-timeline-count">
          {commits.length} commit{commits.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="commit-timeline-list">
        {commits.map(commit => (
          <CommitCard key={commit.commit_id} commit={commit} />
        ))}
      </div>
    </div>
  );
}

export default CommitTimeline;
