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
import './PromptInput.css';

/**
 * PromptInput component for entering and executing prompts.
 */
function PromptInput(): React.ReactElement {
  const { getActiveProject } = useProjectStore();
  const { selectedAgent } = useAgentStore();
  const { tasks, startTask } = useTaskStore();

  const [prompt, setPrompt] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeProject = getActiveProject();

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

    try {
      const taskId = await startTask({
        projectId: activeProject.id,
        projectPath: activeProject.path,
        projectName: activeProject.name,
        agent: selectedAgent,
        userPrompt: prompt.trim()
      });

      if (taskId) {
        // Clear prompt on successful start
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
        Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to execute
      </div>
    </div>
  );
}

export default PromptInput;
