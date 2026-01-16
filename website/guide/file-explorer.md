---
title: File Explorer
description: Browse project files with the built-in file explorer
---

# File Explorer

The File Explorer in Claude Forge lets you browse your project files directly in the sidebar, providing quick access and context for your AI prompts.

## Overview

The File Explorer displays your project as a collapsible tree:

```
src/
├── components/
│   ├── Button.tsx
│   └── Modal.tsx
├── utils/
│   └── helpers.ts
└── App.tsx
```

## Basic Usage

### Expanding Folders

- **Click** on a folder to expand/collapse it
- **Click** the chevron icon for the same effect
- Expanded folders show their contents

### Selecting Files

- **Click** on a file to select it
- The selected file is highlighted
- Selection provides context for your prompts

### Collapse All

- Click the **collapse icon** in the header to collapse all folders
- Useful for resetting the view in large projects

## Section Toggle

The File Explorer can be collapsed to save space:

1. Click the **chevron** next to "Files" in the header
2. The entire explorer collapses to just the header
3. Click again to expand

## File Icons

Files are displayed with icons based on their type:

| Extension | Displayed As |
|-----------|-------------|
| `.js`, `.ts` | JavaScript/TypeScript |
| `.jsx`, `.tsx` | React components |
| `.css`, `.scss` | Stylesheets |
| `.json` | Configuration |
| `.md` | Markdown |
| Others | Generic file |

Folders have a distinctive folder icon that changes when expanded.

## Filtering

The File Explorer automatically excludes certain files and folders:

### Excluded by Default

- `node_modules/`
- `.git/`
- `dist/`, `build/`
- `.cache/`
- Various IDE folders (`.idea/`, `.vscode/`)

### Respects .gitignore

If your project has a `.gitignore` file, those patterns are also excluded from the explorer.

## File Context

When you select a file:

1. The file path is shown as selected
2. Your prompts can reference "the selected file"
3. Claude understands which file you're working with

Example workflow:

1. Navigate to `src/components/Button.tsx`
2. Click to select it
3. Type: "Add prop types to this component"
4. Claude knows to modify `Button.tsx`

## Performance

For large projects, the File Explorer uses optimizations:

- **Lazy loading** - Folder contents load on expand
- **Virtual scrolling** - Only visible items are rendered
- **Caching** - Previously loaded directories are cached

## Refreshing

If files change outside of Claude Forge:

- The explorer updates automatically on project switch
- Close and reopen the project to force a refresh
- The tree rebuilds when the project path changes

## Limitations

- **Deep nesting** - Very deep folder structures may be hard to navigate
- **Large directories** - Folders with thousands of files may be slow
- **Binary files** - Shown but not selectable for AI context

## Best Practices

### Keep Projects Focused

Open specific subdirectories rather than entire monorepos:

```
# Instead of opening the root:
/my-monorepo/

# Open specific packages:
/my-monorepo/packages/frontend/
/my-monorepo/packages/backend/
```

### Use .gitignore

Ensure your `.gitignore` excludes:

```
node_modules/
dist/
build/
.cache/
*.log
```

This keeps the explorer clean and fast.

### Navigate with Prompts

You can also ask Claude to find files:

```
Find all files that contain "TODO" comments
```

```
List all React components in this project
```

## Troubleshooting

### Explorer not loading

**Solutions:**
1. Check if the project path is valid
2. Try reopening the project
3. Check file permissions

### Missing files

**Possible causes:**
- File is in `.gitignore`
- File was created after opening project
- File is hidden (starts with `.`)

**Solutions:**
1. Check exclusion patterns
2. Refresh by closing/reopening project
3. Hidden files are intentionally excluded

### Slow performance

**Solutions:**
1. Open a smaller subdirectory
2. Ensure large folders are in `.gitignore`
3. Collapse unused directories
