/**
 * Claude Forge - Prompt Input Component
 *
 * Text input area for entering prompts to send to Claude.
 * Displays the selected agent and provides execution controls.
 */

import React, { useRef, useEffect } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useAgentStore } from '../../stores/agentStore';
import { useExecutionStore } from '../../stores/executionStore';
import { useCommitStore } from '../../stores/commitStore';
import './PromptInput.css';

/**
 * PromptInput component for entering and executing prompts.
 */
function PromptInput(): React.ReactElement {
  const { project } = useProjectStore();
  const { selectedAgent } = useAgentStore();
  const { status, currentPrompt, setPrompt, execute } = useExecutionStore();
  const { addCommit } = useCommitStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [currentPrompt]);

  // Handle execute button click
  const handleExecute = async () => {
    if (!project || !selectedAgent || !currentPrompt.trim()) {
      return;
    }

    const commit = await execute(project.path, selectedAgent, currentPrompt.trim());

    if (commit) {
      addCommit(commit);
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

  const isExecuting = status === 'preparing' || status === 'executing';
  const canExecute = project && selectedAgent && currentPrompt.trim() && !isExecuting;

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
          value={currentPrompt}
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
          {isExecuting ? 'Running...' : 'Execute'}
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
