/**
 * Claude Forge - Prompt Composer Utility
 *
 * Composes the full prompt including system instructions from the agent
 * and the user's prompt. Ensures consistent prompt structure for
 * all Claude Code CLI invocations.
 */

import { Agent } from '../../shared/types';

/**
 * Formats agent permissions into a human-readable string.
 */
function formatPermissions(agent: Agent): string {
  const perms: string[] = [];

  if (agent.permissions.read) {
    perms.push('read files');
  }
  if (agent.permissions.write) {
    perms.push('create and modify files');
  }
  if (agent.permissions.delete) {
    perms.push('delete files');
  }

  if (perms.length === 0) {
    return 'You have no file permissions.';
  }

  return `You may ${perms.join(', ')}.`;
}

/**
 * Formats permission restrictions into clear instructions.
 */
function formatRestrictions(agent: Agent): string {
  const restrictions: string[] = [];

  if (!agent.permissions.read) {
    restrictions.push('DO NOT attempt to read any files.');
  }
  if (!agent.permissions.write) {
    restrictions.push('DO NOT create or modify any files.');
  }
  if (!agent.permissions.delete) {
    restrictions.push('DO NOT delete any files.');
  }

  if (restrictions.length === 0) {
    return '';
  }

  return '\n' + restrictions.join('\n');
}

/**
 * Composes the full prompt to be sent to Claude Code CLI.
 *
 * The prompt structure:
 * 1. System instructions (agent role, permissions)
 * 2. Metadata request (for commit title/summary)
 * 3. User prompt
 */
export function composePrompt(agent: Agent, userPrompt: string): string {
  const permissionsText = formatPermissions(agent);
  const restrictionsText = formatRestrictions(agent);

  const composed = `SYSTEM:
You are acting as ${agent.name}.
Role: ${agent.role}
Permissions: ${permissionsText}${restrictionsText}
You must strictly respect these permissions.

IMPORTANT: At the end of your response, you MUST provide metadata in this exact format:
---COMMIT_METADATA---
TITLE: <one-line summary of what was done, max 80 characters>
SUMMARY: <2-3 sentence description of the changes and reasoning>

USER:
${userPrompt}`;

  return composed;
}

/**
 * Parses the commit metadata from Claude's response.
 * Returns default values if metadata cannot be parsed.
 */
export function parseCommitMetadata(response: string): { title: string; summary: string } {
  const defaultResult = {
    title: 'Executed Claude command',
    summary: 'Claude execution completed.'
  };

  // Look for the metadata marker
  const markerIndex = response.indexOf('---COMMIT_METADATA---');
  if (markerIndex === -1) {
    return defaultResult;
  }

  const metadataSection = response.substring(markerIndex);

  // Parse TITLE
  const titleMatch = metadataSection.match(/TITLE:\s*(.+?)(?:\n|$)/);
  const title = titleMatch ? titleMatch[1].trim() : defaultResult.title;

  // Parse SUMMARY
  const summaryMatch = metadataSection.match(/SUMMARY:\s*(.+?)(?:\n---|\n\n|$)/s);
  const summary = summaryMatch ? summaryMatch[1].trim() : defaultResult.summary;

  return { title, summary };
}

/**
 * Extracts the main response content (without metadata) from Claude's response.
 */
export function extractMainResponse(response: string): string {
  const markerIndex = response.indexOf('---COMMIT_METADATA---');
  if (markerIndex === -1) {
    return response;
  }
  return response.substring(0, markerIndex).trim();
}
