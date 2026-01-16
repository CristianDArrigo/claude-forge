---
title: Settings
description: Configure Claude Forge preferences
---

# Settings

Claude Forge offers various settings to customize your experience. Access them via the gear icon in the top-right corner.

## Opening Settings

1. Click the **gear icon** in the top-right corner of the app
2. Or use the keyboard shortcut `Ctrl+,`
3. The Settings panel opens as a modal overlay

## General Settings

### Claude CLI Path

Configure the path to your Claude Code CLI installation:

- **Default**: Auto-detected from PATH
- **Custom**: Browse to select the executable
- Click **Browse** to open the file picker

::: tip
Common locations:
- `C:\Users\<username>\AppData\Local\Claude\claude.exe`
- `C:\Program Files\Claude\claude.exe`
:::

### Sidebar Width

Adjust the default width of the sidebar:

- **Range**: 200px - 400px
- **Default**: 280px
- Drag the slider to adjust

## Appearance

### Theme

Choose your preferred color scheme:

| Option | Description |
|--------|-------------|
| **Dark** | Dark background (default) |
| **Light** | Light background |
| **System** | Follow OS preference |

::: info
Currently, only Dark mode is fully implemented. Light and System modes are planned for future releases.
:::

## Notifications

### Desktop Notifications

Enable or disable desktop notifications:

- **ON**: Receive notifications when background tasks complete
- **OFF**: No notifications (default)

Notifications appear when:
- A long-running task completes
- An error occurs in a background task
- The app is minimized or not focused

### Notification Sound

Toggle notification sounds:
- **ON**: Play a sound with notifications
- **OFF**: Silent notifications

## History

### Maximum Prompt History

Set how many prompts to remember:

- **Range**: 10 - 100
- **Default**: 50
- Older prompts are automatically removed

### Clear History

Remove all saved prompt history:

1. Click **Clear Prompt History**
2. Confirm the action
3. All projects' history is deleted

::: warning
This action cannot be undone.
:::

## Data Storage

### Storage Location

Claude Forge stores its data in:

```
%APPDATA%\claude-forge\
```

This includes:
- `settings.json` - Your preferences
- `prompt-history.json` - Prompt history
- `projects.json` - Open projects list

### Export Settings

To backup or transfer settings:

1. Navigate to the storage location
2. Copy the files you want to backup
3. Restore by copying them back

### Reset to Defaults

To reset all settings:

1. Close Claude Forge
2. Delete `%APPDATA%\claude-forge\settings.json`
3. Restart the application
4. Default settings are restored

## Settings Reference

| Setting | Default | Range/Options |
|---------|---------|---------------|
| Theme | Dark | Dark, Light, System |
| Notifications | Off | On, Off |
| Max History | 50 | 10-100 |
| Sidebar Width | 280px | 200-400px |
| CLI Path | Auto | File path |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+,` | Open Settings |
| `Escape` | Close Settings |

## Planned Features

Future settings releases may include:

- **Font size** - Adjust UI text size
- **Editor integration** - Open files in external editor
- **Keybinding customization** - Remap shortcuts
- **Plugin settings** - Configure extensions
- **Sync** - Cloud settings sync

## Troubleshooting

### Settings not saving

**Possible causes:**
- Disk permissions issue
- Storage quota exceeded
- Corrupted settings file

**Solutions:**
1. Check write permissions for `%APPDATA%\claude-forge\`
2. Delete `settings.json` and let it regenerate
3. Run Claude Forge as Administrator

### Settings reset after update

**Solutions:**
1. This may happen with major version updates
2. Reconfigure your preferences
3. Consider backing up settings before updates

### CLI not found after update

**Solutions:**
1. The CLI path may have changed
2. Open Settings and re-select the CLI path
3. Verify the CLI is still installed
