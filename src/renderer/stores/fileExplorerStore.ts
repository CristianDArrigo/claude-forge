/**
 * Claude Forge - File Explorer Store
 *
 * Zustand store for managing the file explorer state.
 * Handles loading directory trees and tracking expanded folders.
 */

import { create } from 'zustand';
import { TreeNode } from '../../shared/types';

interface FileExplorerState {
  // Root tree for current project
  tree: TreeNode | null;

  // Set of expanded directory paths
  expandedPaths: Set<string>;

  // Currently selected file path
  selectedPath: string | null;

  // Loading state
  isLoading: boolean;

  // Actions
  loadTree: (projectPath: string) => Promise<void>;
  toggleDirectory: (path: string) => Promise<void>;
  selectFile: (path: string) => void;
  clearTree: () => void;
  collapseAll: () => void;
}

export const useFileExplorerStore = create<FileExplorerState>((set, get) => ({
  // Initial state
  tree: null,
  expandedPaths: new Set(),
  selectedPath: null,
  isLoading: false,

  // Load the directory tree for a project
  loadTree: async (projectPath: string) => {
    set({ isLoading: true });

    try {
      const tree = await window.claudeForge.files.getTree(projectPath);
      set({
        tree,
        expandedPaths: new Set([projectPath]), // Expand root by default
        selectedPath: null,
        isLoading: false
      });
    } catch (err) {
      console.error('Failed to load file tree:', err);
      set({ tree: null, isLoading: false });
    }
  },

  // Toggle directory expand/collapse
  toggleDirectory: async (path: string) => {
    const { expandedPaths, tree } = get();
    const newExpanded = new Set(expandedPaths);

    if (newExpanded.has(path)) {
      // Collapse
      newExpanded.delete(path);
      set({ expandedPaths: newExpanded });
    } else {
      // Expand - load children if needed
      newExpanded.add(path);

      // Find the node and load children if not loaded
      const loadChildren = async (node: TreeNode): Promise<TreeNode> => {
        if (node.path === path && node.type === 'directory' && !node.isLoaded) {
          const children = await window.claudeForge.files.listChildren(path);
          return { ...node, children, isLoaded: true };
        }

        if (node.children) {
          const updatedChildren = await Promise.all(
            node.children.map(child => loadChildren(child))
          );
          return { ...node, children: updatedChildren };
        }

        return node;
      };

      if (tree) {
        const updatedTree = await loadChildren(tree);
        set({ tree: updatedTree, expandedPaths: newExpanded });
      } else {
        set({ expandedPaths: newExpanded });
      }
    }
  },

  // Select a file
  selectFile: (path: string) => {
    set({ selectedPath: path });
  },

  // Clear the tree (when switching projects)
  clearTree: () => {
    set({
      tree: null,
      expandedPaths: new Set(),
      selectedPath: null
    });
  },

  // Collapse all directories
  collapseAll: () => {
    const { tree } = get();
    if (tree) {
      set({ expandedPaths: new Set([tree.path]) }); // Keep only root expanded
    }
  }
}));
