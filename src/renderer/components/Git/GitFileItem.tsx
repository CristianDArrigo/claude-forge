/**
 * Claude Forge - Git File Item Component
 *
 * Renders a single file in the git changes list.
 * Shows status indicator and stage/unstage toggle.
 */

import React from 'react';
import { GitChange, GitChangeStatus } from '../../../shared/types';

interface GitFileItemProps {
  change: GitChange;
  onStage: (path: string) => void;
  onUnstage: (path: string) => void;
}

/**
 * Returns status indicator character.
 */
function getStatusChar(status: GitChangeStatus): string {
  switch (status) {
    case 'added': return 'A';
    case 'modified': return 'M';
    case 'deleted': return 'D';
    case 'renamed': return 'R';
    case 'untracked': return '?';
    default: return '?';
  }
}

/**
 * Returns status color class.
 */
function getStatusClass(status: GitChangeStatus): string {
  switch (status) {
    case 'added': return 'git-status-added';
    case 'modified': return 'git-status-modified';
    case 'deleted': return 'git-status-deleted';
    case 'renamed': return 'git-status-renamed';
    case 'untracked': return 'git-status-untracked';
    default: return '';
  }
}

/**
 * GitFileItem component.
 */
function GitFileItem({ change, onStage, onUnstage }: GitFileItemProps): React.ReactElement {
  const handleToggle = () => {
    if (change.staged) {
      onUnstage(change.path);
    } else {
      onStage(change.path);
    }
  };

  // Get filename from path
  const fileName = change.path.split(/[/\\]/).pop() || change.path;

  return (
    <div className={`git-file-item ${change.staged ? 'git-file-item-staged' : ''}`}>
      {/* Stage/unstage checkbox */}
      <button
        className="git-file-checkbox"
        onClick={handleToggle}
        title={change.staged ? 'Unstage file' : 'Stage file'}
      >
        {change.staged ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <polyline points="9 11 12 14 22 4" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        )}
      </button>

      {/* Status indicator */}
      <span className={`git-file-status ${getStatusClass(change.status)}`}>
        {getStatusChar(change.status)}
      </span>

      {/* File name */}
      <span className="git-file-name" title={change.path}>
        {fileName}
      </span>
    </div>
  );
}

export default GitFileItem;
