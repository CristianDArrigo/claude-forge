---
title: Git Integration
description: Manage git operations directly in Claude Forge
---

# Git Integration

Claude Forge includes built-in Git integration, allowing you to manage version control without leaving the application.

## Overview

The Git panel in the sidebar shows:

- Current branch name
- Number of commits ahead/behind remote
- Changed files (staged and unstaged)
- Commit and push/pull controls

## Git Status

### Branch Information

At the top of the Git panel, you'll see:

- **Branch icon** - Indicates git status
- **Branch name** - Current checked-out branch
- **Sync status** - Shows `+N` for ahead, `-N` for behind

Example:
```
🔀 main  +2 -1
```
This means you're on `main`, 2 commits ahead, 1 behind.

### Changed Files

Files are grouped into two sections:

**Staged Changes**
- Files ready to be committed
- Shown with a checkmark
- Click to unstage

**Unstaged Changes**
- Modified files not yet staged
- Click to stage individually
- Use the `+` button to stage all

### File Status Indicators

| Icon | Meaning |
|------|---------|
| **M** | Modified |
| **A** | Added (new file) |
| **D** | Deleted |
| **R** | Renamed |
| **?** | Untracked |

## Staging Files

### Stage Individual Files

1. Find the file in "Changes" section
2. Click the **checkbox** next to it
3. The file moves to "Staged"

### Stage All Files

1. In the "Changes" header, click the **+** button
2. All unstaged files are staged at once

### Unstage Files

1. Find the file in "Staged" section
2. Click the **checkbox** to unstage
3. The file returns to "Changes"

## Committing

### Write a Commit Message

1. Click the **commit message input** at the bottom
2. Type a descriptive message
3. Follow conventional commit style:
   ```
   feat: add user authentication
   fix: resolve login redirect bug
   docs: update API documentation
   ```

### Create the Commit

1. Ensure you have staged changes
2. Enter your commit message
3. Click **Commit** or press **Enter**
4. The commit is created locally

::: tip
The Commit button is disabled if:
- No files are staged
- No commit message is entered
:::

## Push and Pull

### Pushing Changes

1. After committing, click **Push**
2. Your commits are sent to the remote
3. The "ahead" count resets to 0

### Pulling Changes

1. Click **Pull** to fetch and merge remote changes
2. Your local branch is updated
3. The "behind" count resets to 0

### Button States

| Button | Enabled When |
|--------|-------------|
| Push | You have commits ahead of remote |
| Pull | Always (checks for updates) |

## Error Handling

Common git operations may fail for various reasons:

### Merge Conflicts

If pull results in conflicts:
1. The error is displayed in the Git panel
2. Resolve conflicts manually in your editor
3. Stage the resolved files
4. Commit the merge resolution

### Push Rejected

If push is rejected:
1. Usually means remote has new commits
2. Pull first to merge remote changes
3. Resolve any conflicts
4. Push again

### Authentication Errors

If authentication fails:
1. Check your git credentials are configured
2. Ensure SSH keys are set up (if using SSH)
3. Try authenticating via terminal first

## Section Toggle

Like other sidebar sections, Git can be collapsed:

1. Click the **chevron** next to "Git" in the header
2. The panel collapses to just the header
3. Branch info remains visible
4. Click again to expand

## Not a Git Repository

If you open a project that isn't a git repo:

- The Git panel shows "Not a git repository"
- No git operations are available
- Initialize git via terminal: `git init`

## Best Practices

### Commit Often

Make small, focused commits:
- One logical change per commit
- Clear, descriptive messages
- Easier to review and revert

### Review Before Commit

Always check what's being staged:
1. Look at the file list
2. Understand each change
3. Don't commit unintended changes

### Pull Before Push

Reduce conflicts by:
1. Pulling latest changes
2. Resolving any issues locally
3. Then pushing your commits

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` in commit input | Create commit |

## Limitations

- **Basic operations only** - No rebase, cherry-pick, etc.
- **No diff view** - Use external tools for detailed diffs
- **No branch management** - Switch branches via terminal
- **No stash** - Stash changes via terminal

For advanced git operations, use:
- Command line
- Your IDE's git features
- Dedicated git GUI tools

## Troubleshooting

### Git panel not showing

**Possible causes:**
- Not a git repository
- Git not installed
- Invalid git configuration

**Solutions:**
1. Run `git status` in terminal to verify
2. Initialize with `git init` if needed
3. Check git is in your PATH

### Status not updating

**Solutions:**
1. Make a change to trigger refresh
2. Switch projects and back
3. Restart Claude Forge

### Operations failing silently

**Solutions:**
1. Check the error message in the panel
2. Try the operation in terminal for details
3. Check git configuration
