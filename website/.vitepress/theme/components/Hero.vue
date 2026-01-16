<script setup lang="ts">
/**
 * Hero Component
 * Animated landing section with dynamic effects
 */
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  // Trigger animations after mount
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section class="hero-section">
    <!-- Background gradient effect -->
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
    </div>

    <div class="hero-content" :class="{ visible: isVisible }">
      <!-- Logo with animation -->
      <div class="hero-logo">
        <img src="/logo.png" alt="Claude Forge" />
      </div>

      <!-- Title with gradient -->
      <h1 class="hero-title">
        <span class="title-gradient">Claude Forge</span>
      </h1>

      <!-- Tagline -->
      <p class="hero-tagline">
        A powerful desktop GUI for Claude Code CLI.<br/>
        Manage projects, execute AI-powered tasks, and track your development workflow.
      </p>

      <!-- CTA Buttons -->
      <div class="hero-actions">
        <a href="/download" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </a>
        <a href="/guide/" class="btn btn-secondary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          Documentation
        </a>
      </div>

      <!-- Version badge -->
      <div class="hero-version">
        <span class="version-badge">v1.0.0</span>
        <span class="version-text">Windows 10/11</span>
      </div>
    </div>

    <!-- App screenshot -->
    <div class="hero-preview" :class="{ visible: isVisible }">
      <div class="preview-window">
        <img src="/frontpage.png" alt="Claude Forge Screenshot" class="preview-screenshot" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  overflow: hidden;
}

/* Background effects */
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: var(--vp-home-hero-image-background-image);
  animation: pulse 6s ease-in-out infinite;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%);
}

/* Content */
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 720px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Logo */
.hero-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  animation: float 4s ease-in-out infinite;
}

.hero-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px var(--cf-shadow, rgba(0, 0, 0, 0.3)));
  border-radius: 24px;
}

/* Title */
.hero-title {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -3px;
  margin-bottom: 24px;
  line-height: 1;
}

.title-gradient {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tagline */
.hero-tagline {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.btn-primary:hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--cf-shadow, rgba(0, 0, 0, 0.2));
}

.btn-secondary {
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border: 1px solid var(--vp-button-alt-border);
}

.btn-secondary:hover {
  background: var(--vp-button-alt-hover-bg);
  border-color: var(--vp-button-alt-hover-border);
  transform: translateY(-2px);
}

/* Version */
.hero-version {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.version-badge {
  background: var(--vp-c-bg-soft);
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

/* Preview window */
.hero-preview {
  position: relative;
  z-index: 1;
  margin-top: 64px;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.hero-preview.visible {
  opacity: 1;
  transform: translateY(0);
}

.preview-window {
  width: 900px;
  max-width: 90vw;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px var(--cf-shadow, rgba(0, 0, 0, 0.3));
}

.preview-screenshot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 100px 20px 60px;
  }

  .hero-logo {
    width: 80px;
    height: 80px;
  }

  .hero-title {
    font-size: 48px;
    letter-spacing: -2px;
  }

  .hero-tagline {
    font-size: 17px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
