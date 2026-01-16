# Claude Forge Website

Official documentation and landing page for Claude Forge.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Connect GitHub Repository

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project" > "Connect to Git"
3. Select your repository
4. Configure build settings:
   - **Build command**: `cd website && npm install && npm run build`
   - **Build output directory**: `website/dist`
   - **Root directory**: `/` (leave empty)
5. Click "Save and Deploy"

### Option 2: Direct Upload

1. Build locally: `npm run build`
2. Go to Cloudflare Pages dashboard
3. Create new project > Direct upload
4. Upload the `dist` folder

### Custom Domain Setup

1. In your Cloudflare Pages project, go to "Custom domains"
2. Add `claude-forge.cdarrigo.com`
3. Follow the DNS configuration instructions
4. Wait for SSL certificate provisioning

## Project Structure

```
website/
├── .vitepress/
│   ├── config.ts         # VitePress configuration
│   └── theme/
│       ├── index.ts      # Custom theme entry
│       ├── style.css     # Global styles
│       └── components/   # Vue components
├── guide/                # English documentation
├── it/                   # Italian translations
│   └── guide/
├── public/               # Static assets
│   └── logo.svg
├── index.md              # Homepage
└── download.md           # Download page
```

## i18n

The site supports two languages:
- English (default): `/`
- Italian: `/it/`

To add a new language:
1. Add locale config in `.vitepress/config.ts`
2. Create corresponding folder with translated content
3. Update navigation in theme config

## License

MIT
