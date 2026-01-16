---
layout: home
title: Claude Forge - Desktop GUI for Claude Code
titleTemplate: false

hero:
  name: Claude Forge
  text: AI-Powered Development Companion
  tagline: A powerful desktop GUI for Claude Code CLI. Manage projects, execute AI-powered tasks, and track your development workflow.
  image:
    src: /logo.svg
    alt: Claude Forge
  actions:
    - theme: brand
      text: Download
      link: /download
    - theme: alt
      text: Documentation
      link: /guide/

features:
  - icon:
      src: /icons/projects.svg
    title: Multi-Project Management
    details: Organize and switch between multiple projects with separate chat histories and configurations.
  - icon:
      src: /icons/agents.svg
    title: Custom AI Agents
    details: Create and configure specialized agents with specific roles, permissions, and system prompts.
  - icon:
      src: /icons/history.svg
    title: Prompt History
    details: Navigate through previous prompts with keyboard shortcuts. Never lose your commands again.
  - icon:
      src: /icons/files.svg
    title: File Explorer
    details: Browse project files directly in the sidebar with an intuitive tree view interface.
  - icon:
      src: /icons/git.svg
    title: Git Integration
    details: View status, stage files, commit changes, and push/pull - all without leaving the app.
  - icon:
      src: /icons/settings.svg
    title: Customizable Settings
    details: Configure theme, notifications, Claude CLI path, and other preferences to suit your workflow.
---

<script setup>
import Hero from './.vitepress/theme/components/Hero.vue'
import Features from './.vitepress/theme/components/Features.vue'
import DownloadSection from './.vitepress/theme/components/DownloadSection.vue'
</script>

<Hero />

<Features />

<DownloadSection />

<style>
/* Hide default VitePress home content since we use custom components */
.VPHome .VPHero,
.VPHome .VPFeatures {
  display: none;
}
</style>
