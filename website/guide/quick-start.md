---
title: Quick Start
description: Get up and running with Claude Forge in minutes
---

# Quick Start

Get started with Claude Forge in just a few minutes. This guide will walk you through your first AI-assisted development session.

## Step 1: Open a Project

1. Launch Claude Forge
2. In the sidebar, you'll see the **Projects** section
3. Click **Open Project** or use the keyboard shortcut `Ctrl+O`
4. Navigate to your project directory and select it

::: tip
Choose a project that has existing code. Claude Forge works best when it can understand your codebase context.
:::

## Step 2: Write Your First Prompt

With your project open, you'll see the **Prompt Input** area at the top of the main panel.

Try one of these starter prompts:

```
Explain the structure of this codebase
```

```
What does the main entry point do?
```

```
Find all TODO comments in this project
```

Press **Enter** or click the **Send** button to execute.

## Step 3: Review the Response

Claude's response will appear in an **Execution Card** below the input. You'll see:

- **Status indicator** - Shows if the task is running or complete
- **Response content** - The AI's formatted response
- **Files written** - Any files that were created or modified
- **Duration** - How long the task took

## Step 4: Try a Code Task

Now let's have Claude modify some code:

```
Add input validation to the login function in src/auth.js
```

After execution, you'll notice:

1. The **Commit Timeline** shows the changes
2. Each commit card lists the modified files
3. Click a file to see what changed

::: warning
Always review AI-generated code changes before committing to git.
:::

## Step 5: Use Prompt History

Made a similar request before? Use the **arrow keys** to navigate your prompt history:

- **Up Arrow** - Go to previous prompt
- **Down Arrow** - Go to next prompt

This saves time when running variations of commands.

## Step 6: Explore the File Explorer

In the sidebar, expand the **Files** section to browse your project:

- **Click** a folder to expand/collapse
- **Click** a file to select it
- The selected file provides context for your prompts

## Step 7: Check Git Status

If your project is a git repository, the **Git** panel shows:

- Current branch name
- Staged and unstaged changes
- Ahead/behind status with remote

You can:
- **Stage files** by clicking the checkbox
- **Write a commit message** in the input field
- **Commit** changes with one click
- **Push/Pull** to sync with remote

## Common Workflows

### Code Review

```
Review the changes in src/components/ and suggest improvements
```

### Bug Investigation

```
Find potential bugs in the error handling code
```

### Documentation

```
Generate JSDoc comments for all exported functions in src/utils.js
```

### Refactoring

```
Refactor the UserService class to use dependency injection
```

### Testing

```
Write unit tests for the calculateTotal function in src/cart.js
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+O` | Open project |
| `Ctrl+,` | Open settings |
| `Enter` | Send prompt |
| `Up/Down` | Navigate prompt history |
| `Escape` | Cancel current task |

## Next Steps

Now that you've completed the basics, explore these features:

- [Projects](/guide/projects) - Manage multiple projects
- [Agents](/guide/agents) - Create specialized AI assistants
- [Settings](/guide/settings) - Customize your experience
