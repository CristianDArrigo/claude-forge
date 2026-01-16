/**
 * VitePress Configuration
 * Claude Forge Documentation Website
 */

import { defineConfig } from 'vitepress';

export default defineConfig({
  // Site metadata
  title: 'Claude Forge',
  description: 'Desktop GUI for Claude Code CLI - AI-powered development companion',

  // Build output
  outDir: 'dist',

  // Clean URLs without .html extension
  cleanUrls: true,

  // Head tags
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0a0a0b' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Claude Forge' }],
  ],

  // i18n configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Download', link: '/download' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/guide/' },
                { text: 'Installation', link: '/guide/installation' },
                { text: 'Quick Start', link: '/guide/quick-start' },
              ]
            },
            {
              text: 'Features',
              items: [
                { text: 'Projects', link: '/guide/projects' },
                { text: 'Agents', link: '/guide/agents' },
                { text: 'Prompt History', link: '/guide/prompt-history' },
                { text: 'File Explorer', link: '/guide/file-explorer' },
                { text: 'Git Integration', link: '/guide/git-integration' },
                { text: 'Settings', link: '/guide/settings' },
              ]
            }
          ]
        }
      }
    },
    it: {
      label: 'Italiano',
      lang: 'it',
      link: '/it/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/it/' },
          { text: 'Guida', link: '/it/guide/' },
          { text: 'Download', link: '/it/download' },
        ],
        sidebar: {
          '/it/guide/': [
            {
              text: 'Iniziare',
              items: [
                { text: 'Introduzione', link: '/it/guide/' },
                { text: 'Installazione', link: '/it/guide/installation' },
                { text: 'Avvio Rapido', link: '/it/guide/quick-start' },
              ]
            },
            {
              text: 'Funzionalità',
              items: [
                { text: 'Progetti', link: '/it/guide/projects' },
                { text: 'Agenti', link: '/it/guide/agents' },
                { text: 'Cronologia Prompt', link: '/it/guide/prompt-history' },
                { text: 'Esplora File', link: '/it/guide/file-explorer' },
                { text: 'Integrazione Git', link: '/it/guide/git-integration' },
                { text: 'Impostazioni', link: '/it/guide/settings' },
              ]
            }
          ]
        },
        outlineTitle: 'In questa pagina',
        docFooter: {
          prev: 'Precedente',
          next: 'Successivo'
        }
      }
    }
  },

  // Theme configuration
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Claude Forge',

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CristianDArrigo/claude-forge' }
    ],

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Cristian D\'Arrigo'
    },

    // Search
    search: {
      provider: 'local'
    }
  }
});
