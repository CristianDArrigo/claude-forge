/**
 * Claude Forge - File Tree Item Component
 *
 * Renders a single item in the file tree (file or directory).
 * Supports expand/collapse for directories.
 */

import React from 'react';
import { TreeNode } from '../../../shared/types';

interface FileTreeItemProps {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
}

/**
 * Returns an icon based on file type.
 */
function getFileIcon(node: TreeNode, isExpanded: boolean): React.ReactElement {
  if (node.type === 'directory') {
    // Folder icon - open or closed
    return isExpanded ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  // File icon based on extension
  const ext = node.extension?.toLowerCase() || '';

  // TypeScript/JavaScript
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 12l-2 4 2 4" />
        <path d="M14 12l2 4-2 4" />
      </svg>
    );
  }

  // JSON/Config
  if (['.json', '.yaml', '.yml', '.toml'].includes(ext)) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    );
  }

  // CSS/Styles
  if (['.css', '.scss', '.sass', '.less'].includes(ext)) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="10" cy="14" r="2" />
        <circle cx="14" cy="14" r="2" />
      </svg>
    );
  }

  // Default file icon
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

/**
 * FileTreeItem component.
 */
function FileTreeItem({
  node,
  depth,
  isExpanded,
  isSelected,
  onToggle,
  onSelect
}: FileTreeItemProps): React.ReactElement {
  const handleClick = () => {
    if (node.type === 'directory') {
      onToggle(node.path);
    } else {
      onSelect(node.path);
    }
  };

  const handleDoubleClick = () => {
    // Future: open file in editor
  };

  return (
    <div
      className={`file-tree-item ${isSelected ? 'file-tree-item-selected' : ''}`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="treeitem"
      aria-expanded={node.type === 'directory' ? isExpanded : undefined}
      aria-selected={isSelected}
    >
      {/* Expand/collapse chevron for directories */}
      {node.type === 'directory' && (
        <span className={`file-tree-chevron ${isExpanded ? 'file-tree-chevron-expanded' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}

      {/* File/folder icon */}
      <span className={`file-tree-icon ${node.type === 'directory' ? 'file-tree-icon-folder' : 'file-tree-icon-file'}`}>
        {getFileIcon(node, isExpanded)}
      </span>

      {/* Name */}
      <span className="file-tree-name">{node.name}</span>
    </div>
  );
}

export default FileTreeItem;
