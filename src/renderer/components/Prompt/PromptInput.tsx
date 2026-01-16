/**
 * Claude Forge - Prompt Input Component
 *
 * Text input area for entering prompts to send to Claude.
 * Displays the selected agent and provides execution controls.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useAgentStore } from '../../stores/agentStore';
import { useTaskStore } from '../../stores/taskStore';
import { usePromptHistoryStore } from '../../stores/promptHistoryStore';
import './PromptInput.css';

/**
 * PromptInput component for entering and executing prompts.
 */
function PromptInput(): React.ReactElement {
  const { getActiveProject } = useProjectStore();
  const { selectedAgent } = useAgentStore();
  const { tasks, startTask } = useTaskStore();
  const {
    setProject,
    addPrompt: addToHistory,
    navigateUp,
    navigateDown,
    setTempPrompt,
    currentIndex
  } = usePromptHistoryStore();

  const [prompt, setPrompt] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeProject = getActiveProject();

  // Sync history store with active project
  useEffect(() => {
    if (activeProject) {
      setProject(activeProject.id);
    }
  }, [activeProject, setProject]);

  // Check if there's a running task for this project
  const hasRunningTask = activeProject
    ? tasks.some(t => t.projectId === activeProject.id && t.status === 'running')
    : false;

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [prompt]);

  // Handle execute button click
  const handleExecute = async () => {
    if (!activeProject || !selectedAgent || !prompt.trim() || isStarting) {
      return;
    }

    setIsStarting(true);
    const promptText = prompt.trim();

    try {
      const taskId = await startTask({
        projectId: activeProject.id,
        projectPath: activeProject.path,
        projectName: activeProject.name,
        agent: selectedAgent,
        userPrompt: promptText
      });

      if (taskId) {
        // Add to history and clear prompt on successful start
        addToHistory(promptText);
        setPrompt('');
      }
    } finally {
      setIsStarting(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Enter to execute
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
      return;
    }

    // Arrow Up to navigate to older prompts
    if (e.key === 'ArrowUp') {
      // Only navigate if cursor is at start of input or input is single line
      const textarea = textareaRef.current;
      if (textarea && (textarea.selectionStart === 0 || !prompt.includes('\n'))) {
        e.preventDefault();
        // Save current prompt before navigating
        if (currentIndex === -1) {
          setTempPrompt(prompt);
        }
        const historyPrompt = navigateUp();
        if (historyPrompt !== null) {
          setPrompt(historyPrompt);
        }
      }
      return;
    }

    // Arrow Down to navigate to newer prompts
    if (e.key === 'ArrowDown') {
      // Only navigate if cursor is at end of input or input is single line
      const textarea = textareaRef.current;
      if (textarea && (textarea.selectionStart === prompt.length || !prompt.includes('\n'))) {
        e.preventDefault();
        const historyPrompt = navigateDown();
        if (historyPrompt !== null) {
          setPrompt(historyPrompt);
        }
      }
    }
  };

  const isExecuting = isStarting || hasRunningTask;
  const canExecute = activeProject && selectedAgent && prompt.trim() && !isExecuting;

  return (
    <div className="prompt-input-container">
      {/* Agent indicator */}
      <div className="prompt-input-header">
        <span className="prompt-input-agent">
          {selectedAgent ? (
            <>
              <span className="prompt-input-agent-label">Agent:</span>
              <span className="prompt-input-agent-name">{selectedAgent.name}</span>
            </>
          ) : (
            <span className="prompt-input-agent-none">No agent selected</span>
          )}
        </span>
      </div>

      {/* Textarea and execute button */}
      <div className="prompt-input-main">
        <textarea
          ref={textareaRef}
          className="prompt-input-textarea"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your prompt..."
          disabled={isExecuting}
          rows={1}
        />
        <button
          className="btn btn-primary prompt-input-execute"
          onClick={handleExecute}
          disabled={!canExecute}
        >
          {isStarting ? 'Starting...' : hasRunningTask ? 'Running...' : 'Execute'}
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="prompt-input-hint">
        <span>
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to execute
        </span>
        <span className="prompt-input-hint-separator">|</span>
        <span>
          <kbd>↑</kbd> <kbd>↓</kbd> for history
        </span>
        {currentIndex >= 0 && (
          <span className="prompt-input-history-indicator">
            (browsing history)
          </span>
        )}
      </div>
    </div>
  );
}

export default PromptInput;
