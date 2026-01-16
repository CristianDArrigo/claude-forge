/**
 * Claude Forge - Diff Viewer Component
 *
 * Displays file diffs with syntax highlighting for added/removed lines.
 * Uses unified diff format.
 */

import React, { useState, useEffect } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import './DiffViewer.css';

interface DiffViewerProps {
  filePath: string;
  staged?: boolean;
}

interface DiffLine {
  type: 'add' | 'remove' | 'context' | 'header' | 'meta';
  content: string;
  lineNumber?: number;
}

/**
 * Parses a unified diff string into structured lines.
 */
function parseDiff(diff: string): DiffLine[] {
  const lines = diff.split('\n');
  const result: DiffLine[] = [];

  for (const line of lines) {
    if (line.startsWith('+++') || line.startsWith('---')) {
      result.push({ type: 'meta', content: line });
    } else if (line.startsWith('@@')) {
      result.push({ type: 'header', content: line });
    } else if (line.startsWith('+')) {
      result.push({ type: 'add', content: line.substring(1) });
    } else if (line.startsWith('-')) {
      result.push({ type: 'remove', content: line.substring(1) });
    } else if (line.startsWith(' ') || line === '') {
      result.push({ type: 'context', content: line.substring(1) || '' });
    }
  }

  return result;
}

/**
 * DiffViewer component for displaying file diffs.
 */
function DiffViewer({ filePath, staged = false }: DiffViewerProps): React.ReactElement {
  const { getActiveProject } = useProjectStore();
  const [diff, setDiff] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeProject = getActiveProject();

  // Load diff when component mounts or file path changes
  useEffect(() => {
    if (!activeProject) return;

    const loadDiff = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const diffText = await window.claudeForge.git.getDiff(
          activeProject.path,
          filePath,
          staged
        );
        setDiff(diffText);
      } catch (err) {
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadDiff();
  }, [activeProject, filePath, staged]);

  // Loading state
  if (isLoading) {
    return (
      <div className="diff-viewer diff-viewer-loading">
        Loading diff...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="diff-viewer diff-viewer-error">
        Failed to load diff: {error}
      </div>
    );
  }

  // No diff available
  if (!diff || diff.trim() === '') {
    return (
      <div className="diff-viewer diff-viewer-empty">
        No changes to display
      </div>
    );
  }

  // Parse and render diff
  const lines = parseDiff(diff);

  return (
    <div className="diff-viewer">
      <pre className="diff-content">
        {lines.map((line, index) => (
          <div key={index} className={`diff-line diff-line-${line.type}`}>
            <span className="diff-line-prefix">
              {line.type === 'add' && '+'}
              {line.type === 'remove' && '-'}
              {line.type === 'context' && ' '}
            </span>
            <span className="diff-line-content">{line.content}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

/**
 * Inline diff viewer component for file lists.
 * Shows a button to toggle diff visibility.
 */
interface InlineDiffViewerProps {
  filePath: string;
  staged?: boolean;
}

export function InlineDiffViewer({ filePath, staged = false }: InlineDiffViewerProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="inline-diff-viewer">
      <button
        className="inline-diff-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Hide diff
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            View diff
          </>
        )}
      </button>
      {isExpanded && <DiffViewer filePath={filePath} staged={staged} />}
    </div>
  );
}

export default DiffViewer;
