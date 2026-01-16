/**
 * Claude Forge - File Explorer Component
 *
 * Tree view for browsing project files.
 * Displays in the sidebar with expand/collapse functionality.
 */

import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useFileExplorerStore } from '../../stores/fileExplorerStore';
import { TreeNode } from '../../../shared/types';
import FileTreeItem from './FileTreeItem';
import './FileExplorer.css';

/**
 * Recursively renders tree nodes.
 */
interface TreeRendererProps {
  nodes: TreeNode[];
  depth: number;
  expandedPaths: Set<string>;
  selectedPath: string | null;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
}

function TreeRenderer({
  nodes,
  depth,
  expandedPaths,
  selectedPath,
  onToggle,
  onSelect
}: TreeRendererProps): React.ReactElement {
  return (
    <>
      {nodes.map(node => {
        const isExpanded = expandedPaths.has(node.path);
        const isSelected = selectedPath === node.path;

        return (
          <React.Fragment key={node.path}>
            <FileTreeItem
              node={node}
              depth={depth}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
            {node.type === 'directory' && isExpanded && node.children && node.children.length > 0 && (
              <TreeRenderer
                nodes={node.children}
                depth={depth + 1}
                expandedPaths={expandedPaths}
                selectedPath={selectedPath}
                onToggle={onToggle}
                onSelect={onSelect}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * FileExplorer component for browsing project files.
 */
function FileExplorer(): React.ReactElement {
  const { getActiveProject } = useProjectStore();
  const {
    tree,
    expandedPaths,
    selectedPath,
    isLoading,
    loadTree,
    toggleDirectory,
    selectFile,
    clearTree,
    collapseAll
  } = useFileExplorerStore();

  // Section collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeProject = getActiveProject();

  // Load file tree when active project changes
  useEffect(() => {
    if (activeProject) {
      loadTree(activeProject.path);
    } else {
      clearTree();
    }
  }, [activeProject, loadTree, clearTree]);

  // No project selected
  if (!activeProject) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-empty">
          No project selected
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-loading">
          Loading files...
        </div>
      </div>
    );
  }

  // No tree loaded
  if (!tree) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-empty">
          Unable to load files
        </div>
      </div>
    );
  }

  return (
    <div className={`file-explorer ${isCollapsed ? 'file-explorer-collapsed' : ''}`}>
      {/* Header with section toggle and collapse all button */}
      <div className="file-explorer-header">
        <button
          className="file-explorer-section-toggle"
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
            className={`file-explorer-chevron ${isCollapsed ? '' : 'file-explorer-chevron-open'}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="file-explorer-title">Files</span>
        </button>
        {!isCollapsed && (
          <button
            className="file-explorer-collapse-btn"
            onClick={collapseAll}
            title="Collapse all folders"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        )}
      </div>

      {/* File tree - only shown when not collapsed */}
      {!isCollapsed && (
        <div className="file-explorer-tree" role="tree">
          {tree.children && tree.children.length > 0 ? (
            <TreeRenderer
              nodes={tree.children}
              depth={0}
              expandedPaths={expandedPaths}
              selectedPath={selectedPath}
              onToggle={toggleDirectory}
              onSelect={selectFile}
            />
          ) : (
            <div className="file-explorer-empty">
              No files found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
