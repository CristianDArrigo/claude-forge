/**
 * Claude Forge - Git Panel Component
 *
 * Displays git status and provides commit/push/pull controls.
 * Shows changed files with stage/unstage functionality.
 */

import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useGitStore } from '../../stores/gitStore';
import GitFileItem from './GitFileItem';
import './GitPanel.css';

/**
 * GitPanel component for git operations.
 */
function GitPanel(): React.ReactElement {
  const { getActiveProject } = useProjectStore();
  const {
    status,
    isLoading,
    isCommitting,
    isPushing,
    isPulling,
    commitMessage,
    error,
    loadStatus,
    stageFile,
    unstageFile,
    stageAll,
    commit,
    push,
    pull,
    setCommitMessage,
    clearError,
    clearStatus
  } = useGitStore();

  // Section collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeProject = getActiveProject();

  // Load git status when project changes
  useEffect(() => {
    if (activeProject) {
      loadStatus(activeProject.path);
    } else {
      clearStatus();
    }
  }, [activeProject, loadStatus, clearStatus]);

  // No project selected
  if (!activeProject) {
    return (
      <div className="git-panel">
        <div className="git-panel-empty">
          No project selected
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="git-panel">
        <div className="git-panel-loading">
          Loading git status...
        </div>
      </div>
    );
  }

  // Not a git repository
  if (!status || !status.isRepo) {
    return (
      <div className="git-panel">
        <div className="git-panel-empty">
          Not a git repository
        </div>
      </div>
    );
  }

  // Count staged and unstaged changes
  const stagedChanges = status.changes.filter(c => c.staged);
  const unstagedChanges = status.changes.filter(c => !c.staged);
  const canCommit = stagedChanges.length > 0 && commitMessage.trim();

  const handleCommit = async () => {
    await commit();
  };

  const handlePush = async () => {
    await push();
  };

  const handlePull = async () => {
    await pull();
  };

  return (
    <div className={`git-panel ${isCollapsed ? 'git-panel-collapsed' : ''}`}>
      {/* Header with section toggle and branch info */}
      <div className="git-panel-header">
        <button
          className="git-panel-section-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand section' : 'Collapse section'}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`git-panel-chevron ${isCollapsed ? '' : 'git-panel-chevron-open'}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="git-panel-title">Git</span>
        </button>
        <div className="git-branch-info">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          <span className="git-branch-name">{status.branch}</span>
          {(status.ahead > 0 || status.behind > 0) && (
            <span className="git-branch-sync">
              {status.ahead > 0 && <span className="git-ahead">+{status.ahead}</span>}
              {status.behind > 0 && <span className="git-behind">-{status.behind}</span>}
            </span>
          )}
        </div>
      </div>

      {/* Collapsible content */}
      {!isCollapsed && (
        <>
          {/* Error display */}
          {error && (
            <div className="git-panel-error">
              <span>{error}</span>
              <button onClick={clearError} className="git-error-dismiss">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* Changes list */}
          <div className="git-changes">
        {status.changes.length === 0 ? (
          <div className="git-no-changes">
            No changes
          </div>
        ) : (
          <>
            {/* Staged changes */}
            {stagedChanges.length > 0 && (
              <div className="git-changes-section">
                <div className="git-changes-header">
                  <span>Staged ({stagedChanges.length})</span>
                </div>
                <div className="git-changes-list">
                  {stagedChanges.map(change => (
                    <GitFileItem
                      key={change.path}
                      change={change}
                      onStage={stageFile}
                      onUnstage={unstageFile}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Unstaged changes */}
            {unstagedChanges.length > 0 && (
              <div className="git-changes-section">
                <div className="git-changes-header">
                  <span>Changes ({unstagedChanges.length})</span>
                  <button
                    className="git-stage-all-btn"
                    onClick={stageAll}
                    title="Stage all"
                  >
                    +
                  </button>
                </div>
                <div className="git-changes-list">
                  {unstagedChanges.map(change => (
                    <GitFileItem
                      key={change.path}
                      change={change}
                      onStage={stageFile}
                      onUnstage={unstageFile}
                    />
                  ))}
                </div>
              </div>
            )}
            </>
          )}
          </div>

          {/* Commit section */}
          <div className="git-commit-section">
            <input
              type="text"
              className="git-commit-input"
              placeholder="Commit message..."
              value={commitMessage}
              onChange={e => setCommitMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && canCommit) {
                  handleCommit();
                }
              }}
            />
            <button
              className="btn btn-sm git-commit-btn"
              onClick={handleCommit}
              disabled={!canCommit || isCommitting}
            >
              {isCommitting ? 'Committing...' : 'Commit'}
            </button>
          </div>

          {/* Push/Pull buttons */}
          <div className="git-actions">
            <button
              className="btn btn-sm git-action-btn"
              onClick={handlePull}
              disabled={isPulling}
              title="Pull from remote"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="8 17 12 21 16 17" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
              </svg>
              {isPulling ? 'Pulling...' : 'Pull'}
            </button>
            <button
              className="btn btn-sm git-action-btn"
              onClick={handlePush}
              disabled={isPushing || status.ahead === 0}
              title="Push to remote"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              {isPushing ? 'Pushing...' : 'Push'}
              {status.ahead > 0 && <span className="git-push-count">{status.ahead}</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default GitPanel;
