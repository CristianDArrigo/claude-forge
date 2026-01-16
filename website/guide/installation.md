---
title: Installation
description: How to install Claude Forge on your system
---

# Installation

This guide walks you through installing Claude Forge on your Windows system.

## Prerequisites

Before installing Claude Forge, ensure you have:

### 1. Claude Code CLI

Claude Forge requires the Claude Code CLI to be installed. Visit the [Claude Code documentation](https://docs.anthropic.com/claude-code) for installation instructions.

Verify your installation:

```bash
claude --version
```

### 2. System Requirements

| Requirement | Minimum |
|-------------|---------|
| **OS** | Windows 10 (64-bit) or later |
| **RAM** | 4 GB |
| **Storage** | 200 MB available space |

## Download

1. Go to the [Download page](/download)
2. Click "Download Installer"
3. Save the `.exe` file to your computer

Alternatively, visit the [GitHub Releases](https://github.com/CristianDArrigo/claude-forge/releases) page for all available versions.

## Install

1. **Run the installer**
   - Double-click `Claude Forge Setup x.x.x.exe`
   - If Windows SmartScreen appears, click "More info" then "Run anyway"

2. **Follow the wizard**
   - Choose your installation directory (default is recommended)
   - Select whether to create a desktop shortcut
   - Click "Install"

3. **Launch**
   - The app will launch automatically after installation
   - Or find it in your Start menu under "Claude Forge"

## First Launch Configuration

When you first launch Claude Forge, you may need to configure the Claude CLI path:

1. Click the **Settings** icon (gear) in the top-right corner
2. Under "General", locate "Claude CLI Path"
3. If the path is incorrect, click "Browse" and select your Claude CLI executable

::: tip
On most systems, the CLI is located at:
- `C:\Users\<username>\AppData\Local\Claude\claude.exe`
:::

## Verifying Installation

To verify Claude Forge is working correctly:

1. Launch the application
2. Click "Open Project" in the sidebar
3. Select any directory with code
4. Type a prompt in the input field
5. Press Enter and verify you receive a response

If you see an error, check the [Troubleshooting](#troubleshooting) section below.

## Updating

Claude Forge checks for updates automatically. When an update is available:

1. A notification will appear in the app
2. Click "Download Update" to get the latest version
3. The app will restart with the new version

You can also manually update by downloading the latest installer from the [Releases page](https://github.com/CristianDArrigo/claude-forge/releases).

## Uninstalling

To remove Claude Forge:

1. Open **Windows Settings** > **Apps** > **Installed apps**
2. Find "Claude Forge" in the list
3. Click the three dots menu and select "Uninstall"
4. Follow the prompts

Your settings and project configurations are stored in:
- `%APPDATA%\claude-forge\`

Delete this folder to completely remove all data.

## Troubleshooting

### "Claude CLI not found" error

**Solution:** Configure the CLI path in Settings:
1. Open Settings (gear icon)
2. Set the correct path to your Claude CLI
3. Restart the application

### Installation blocked by antivirus

**Solution:** Add an exception for Claude Forge:
1. Open your antivirus settings
2. Add `C:\Program Files\Claude Forge\` to the exclusion list
3. Re-run the installer

### App won't start

**Solution:** Try these steps:
1. Delete `%APPDATA%\claude-forge\` folder
2. Reinstall the application
3. If the problem persists, check the [GitHub Issues](https://github.com/CristianDArrigo/claude-forge/issues)

### Permission denied errors

**Solution:** Run as Administrator:
1. Right-click the installer
2. Select "Run as administrator"
3. Complete the installation
