---
title: Prompt History
description: Navigate and reuse previous prompts in Claude Forge
---

# Prompt History

Claude Forge remembers your previous prompts, allowing you to quickly navigate and reuse them.

## How It Works

Every prompt you send is automatically saved to your history. The history is:

- **Per-project** - Each project has its own history
- **Persistent** - Saved between sessions
- **Limited** - Stores the most recent 50 prompts

## Navigating History

### Keyboard Navigation

While focused on the prompt input:

| Key | Action |
|-----|--------|
| **Up Arrow** | Previous prompt |
| **Down Arrow** | Next prompt |
| **Escape** | Return to current/empty prompt |

### How Navigation Works

1. Start typing or leave the input empty
2. Press **Up Arrow** to see your last prompt
3. Keep pressing **Up** to go further back
4. Press **Down** to move forward in history
5. Press **Escape** to return to your current typing

::: tip
Your current input is preserved when navigating. Press Escape to return to what you were typing.
:::

## Visual Indicator

When viewing a historical prompt, you'll see:

- A subtle indicator showing you're viewing history
- The prompt text populated in the input field
- Press Enter to execute the historical prompt

## Editing Historical Prompts

You can modify a historical prompt before sending:

1. Navigate to the desired prompt (Up/Down arrows)
2. Edit the text as needed
3. Press Enter to send the modified version

The modified version becomes a new entry in your history.

## History Behavior

### New Project

When you open a new project for the first time:
- History starts empty
- Build up history as you work

### Returning to a Project

When you reopen a project:
- Your previous history is restored
- New prompts are added to the existing history

### Project Independence

Each project maintains separate history:

```
Project A:
  - "Fix the login bug"
  - "Add tests for auth"

Project B:
  - "Update README"
  - "Refactor database queries"
```

## Prompt History Best Practices

### Descriptive Prompts

Write prompts that will be useful to revisit:

**Good:**
```
Add input validation to the registration form:
- Validate email format
- Check password strength
- Show inline error messages
```

**Less useful:**
```
fix it
```

### Common Patterns

Keep templates for frequently used prompts:

```
Review changes in [file] and suggest improvements
```

```
Write unit tests for [function] in [file]
```

```
Explain what [file] does and document it
```

## Storage

Prompt history is stored locally in:
```
%APPDATA%\claude-forge\prompt-history.json
```

The file is automatically managed by Claude Forge.

## Clearing History

To clear your prompt history:

1. Open **Settings** (gear icon)
2. Find the **History** section
3. Click **Clear Prompt History**
4. Confirm the action

::: warning
This action cannot be undone. All prompt history for all projects will be deleted.
:::

## Limitations

- Maximum 50 prompts per project
- Very long prompts may be truncated in storage
- History is local only (not synced across devices)

## Troubleshooting

### History not saving

**Possible causes:**
- Disk write permissions
- Storage quota exceeded
- Corrupted storage file

**Solutions:**
1. Check disk space
2. Delete `%APPDATA%\claude-forge\prompt-history.json`
3. Restart Claude Forge

### Arrow keys not working

**Solutions:**
1. Ensure the prompt input is focused
2. Check if another element has focus
3. Try clicking inside the input first
