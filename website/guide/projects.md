---
title: Projects
description: Managing projects in Claude Forge
---

# Projects

Claude Forge allows you to work with multiple projects simultaneously, each with its own context and history.

## Opening a Project

### Using the Sidebar

1. In the **Projects** section of the sidebar, click **Open Project**
2. Navigate to your project directory
3. Click **Select Folder**

### Using Keyboard Shortcut

Press `Ctrl+O` to open the folder picker directly.

### Drag and Drop

Drag a folder from Windows Explorer onto the Claude Forge window to open it.

## Switching Between Projects

When you have multiple projects open, they appear as a list in the **Projects** sidebar section.

- **Click** a project name to switch to it
- The active project is highlighted
- Each project maintains its own:
  - Conversation history
  - File explorer state
  - Git status

## Project Information

Below the project list, you'll see information about the currently selected project:

- **Full path** to the project directory
- **Number of conversations** (if any)

## Closing a Project

To close a project:

1. Hover over the project name in the sidebar
2. Click the **X** button that appears
3. The project is removed from the list

::: info
Closing a project doesn't delete any files or conversation history. You can reopen it at any time.
:::

## Project Context

When you send a prompt, Claude Forge provides the following context to the AI:

1. **Project directory** - The root path of your project
2. **Selected file** - If you've selected a file in the explorer
3. **Git status** - Current branch and changed files
4. **Previous context** - Recent conversation history

This context helps Claude understand your codebase and provide relevant responses.

## Best Practices

### Organize by Feature

When working on a large codebase, consider opening specific subdirectories as separate "projects" to focus the AI's attention:

```
myapp/
├── frontend/    <- Open as separate project
├── backend/     <- Open as separate project
└── shared/
```

### Use .gitignore

Claude Forge respects your `.gitignore` file when indexing project files. This means:

- `node_modules/` won't clutter the file explorer
- Build artifacts are excluded
- Sensitive files remain private

### One Task Per Session

For complex tasks, it's often better to:

1. Open a fresh conversation
2. Focus on one specific goal
3. Review and commit changes
4. Start a new conversation for the next task

This keeps context focused and changes organized.

## Limitations

- **Maximum projects**: No hard limit, but having many projects open may affect performance
- **Large codebases**: Projects with 10,000+ files may take longer to index
- **Binary files**: Binary files are excluded from AI context

## Troubleshooting

### Project won't open

**Possible causes:**
- Directory doesn't exist
- Insufficient permissions
- Path contains special characters

**Solutions:**
1. Verify the directory exists
2. Check folder permissions
3. Try opening a parent directory

### Slow performance with large projects

**Solutions:**
1. Open a specific subdirectory instead
2. Ensure `.gitignore` excludes `node_modules/` and build folders
3. Close unused projects
