---
title: Agents
description: Creating and managing custom AI agents in Claude Forge
---

# Agents

Agents are customized AI assistants with specific roles, permissions, and behaviors. Create specialized agents for different tasks like code review, documentation, or testing.

## Understanding Agents

An agent in Claude Forge consists of:

| Property | Description |
|----------|-------------|
| **Name** | A friendly identifier for the agent |
| **Role** | System prompt that defines the agent's behavior |
| **Permissions** | What actions the agent can perform |

## Default Agent

Claude Forge comes with a **Default** agent that:

- Has standard Claude Code CLI capabilities
- Can read and write files
- Can execute shell commands
- Has no specialized behavior

## Creating an Agent

1. In the sidebar, scroll to the **Agents** section
2. Click **+ New Agent**
3. Fill in the agent details:

### Name

Choose a descriptive name like:
- "Code Reviewer"
- "Documentation Writer"
- "Test Generator"
- "Bug Hunter"

### Role (System Prompt)

The role defines how the agent behaves. Write it as instructions:

```
You are a code review specialist. Your job is to:
- Find potential bugs and security issues
- Suggest performance improvements
- Ensure code follows best practices
- Be constructive and educational in feedback

Always explain WHY something should be changed, not just what.
```

### Permissions

Set what the agent can do:

| Permission | Description |
|------------|-------------|
| **Read** | Can read files in the project |
| **Write** | Can create and modify files |
| **Execute** | Can run shell commands |

::: warning
Be cautious with Execute permissions. Only enable for trusted agents.
:::

## Example Agents

### Code Reviewer

```
Name: Code Reviewer
Role: You are a senior developer performing code reviews. Focus on:
- Code quality and readability
- Potential bugs and edge cases
- Security vulnerabilities
- Performance considerations
Always be constructive and explain your reasoning.
Permissions: Read only
```

### Documentation Writer

```
Name: Doc Writer
Role: You are a technical documentation specialist. Your tasks:
- Write clear, concise documentation
- Add JSDoc/TSDoc comments to functions
- Create README files
- Document APIs and interfaces
Use consistent formatting and include examples.
Permissions: Read, Write
```

### Test Generator

```
Name: Test Generator
Role: You are a QA engineer specializing in automated testing. You:
- Write unit tests for functions
- Create integration tests
- Ensure good test coverage
- Use appropriate testing patterns
Follow the existing test structure in the project.
Permissions: Read, Write
```

### Bug Hunter

```
Name: Bug Hunter
Role: You are a security researcher and bug hunter. Focus on:
- Finding security vulnerabilities
- Identifying race conditions
- Detecting memory leaks
- Spotting logic errors
Report findings with severity levels and remediation steps.
Permissions: Read only
```

## Using Agents

### Selecting an Agent

1. Click on an agent in the **Agents** sidebar section
2. The selected agent becomes active
3. All subsequent prompts use this agent

### Switching Agents

Simply click a different agent to switch. Each agent:

- Maintains its own behavior
- Shares the same project context
- Has independent conversation history

## Editing Agents

1. Click on the agent you want to edit
2. Modify the name, role, or permissions
3. Changes are saved automatically

## Deleting Agents

1. Select the agent
2. Click the **Delete** button (or right-click and select Delete)
3. Confirm the deletion

::: info
The Default agent cannot be deleted.
:::

## Agent Best Practices

### Be Specific in Roles

Instead of:
```
You help with code.
```

Write:
```
You are a TypeScript expert who helps refactor JavaScript code to TypeScript.
Focus on:
- Adding proper type annotations
- Using interfaces for complex objects
- Leveraging TypeScript features like generics
- Maintaining backward compatibility
```

### Match Permissions to Purpose

| Agent Type | Recommended Permissions |
|------------|------------------------|
| Reviewer/Analyzer | Read only |
| Writer/Generator | Read, Write |
| Automation scripts | Read, Write, Execute |

### Create Task-Specific Agents

Rather than one generic agent, create several focused ones:

- **Frontend Agent** - Specializes in React, CSS, accessibility
- **Backend Agent** - Focuses on APIs, databases, security
- **DevOps Agent** - Handles CI/CD, Docker, deployment

## Troubleshooting

### Agent not following instructions

**Solutions:**
1. Make the role more explicit
2. Add examples of desired output
3. Use bullet points for clarity
4. Specify what NOT to do

### Unexpected behavior

**Solutions:**
1. Check permissions are correctly set
2. Verify the role doesn't conflict with base capabilities
3. Try rephrasing the role instructions
