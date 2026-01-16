/**
 * Custom VitePress Theme
 * Matches Claude Forge's dark aesthetic
 */

import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './style.css';

// Custom components
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import DownloadSection from './components/DownloadSection.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('Hero', Hero);
    app.component('Features', Features);
    app.component('DownloadSection', DownloadSection);
  }
} satisfies Theme;
