<script setup lang="ts">
/**
 * DownloadSection Component
 * Download buttons with GitHub releases integration
 */
import { ref, onMounted } from 'vue';

// GitHub repo info
const GITHUB_REPO = 'CristianDArrigo/claude-forge';
const RELEASES_URL = `https://github.com/${GITHUB_REPO}/releases`;

interface Release {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

const latestRelease = ref<Release | null>(null);
const isLoading = ref(true);
const isVisible = ref(false);

// Format file size
function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

// Format date
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Get Windows installer asset
function getWindowsAsset() {
  if (!latestRelease.value) return null;
  return latestRelease.value.assets.find(
    (a) => a.name.endsWith('.exe') || a.name.includes('Setup')
  );
}

onMounted(async () => {
  // Intersection observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  const section = document.querySelector('.download-section');
  if (section) {
    observer.observe(section);
  }

  // Fetch latest release from GitHub
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
    );
    if (response.ok) {
      latestRelease.value = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch release info:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="download-section">
    <div class="download-container" :class="{ visible: isVisible }">
      <!-- Background decoration -->
      <div class="download-bg">
        <div class="download-gradient"></div>
      </div>

      <!-- Content -->
      <div class="download-content">
        <span class="download-label">Download</span>
        <h2 class="download-title">Get Claude Forge</h2>
        <p class="download-subtitle">
          Download the latest version and start building with AI-powered assistance.
        </p>

        <!-- Download card -->
        <div class="download-card">
          <!-- Platform info -->
          <div class="platform-info">
            <div class="platform-icon">
              <!-- Windows icon -->
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
            </div>
            <div class="platform-text">
              <span class="platform-name">Windows</span>
              <span class="platform-version">Windows 10/11 (64-bit)</span>
            </div>
          </div>

          <!-- Download button -->
          <div class="download-actions">
            <a
              v-if="!isLoading && getWindowsAsset()"
              :href="getWindowsAsset()?.browser_download_url"
              class="download-btn primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Installer
            </a>
            <a
              v-else
              :href="RELEASES_URL"
              target="_blank"
              rel="noopener"
              class="download-btn primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {{ isLoading ? 'Loading...' : 'View Releases' }}
            </a>
          </div>

          <!-- Release info -->
          <div v-if="latestRelease" class="release-info">
            <span class="release-version">{{ latestRelease.tag_name }}</span>
            <span class="release-date">{{ formatDate(latestRelease.published_at) }}</span>
            <span v-if="getWindowsAsset()" class="release-size">
              {{ formatSize(getWindowsAsset()!.size) }}
            </span>
          </div>
        </div>

        <!-- Alternative downloads -->
        <div class="alt-downloads">
          <a :href="RELEASES_URL" target="_blank" rel="noopener" class="alt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            View all releases on GitHub
          </a>
          <a href="/guide/installation" class="alt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Installation guide
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download-section {
  padding: 120px 24px;
  position: relative;
}

.download-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.download-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Background */
.download-bg {
  position: absolute;
  inset: -100px;
  overflow: hidden;
  z-index: 0;
}

.download-gradient {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: var(--vp-home-hero-image-background-image);
}

/* Content */
.download-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.download-label {
  display: inline-block;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 9999px;
  margin-bottom: 24px;
}

.download-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.download-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  margin-bottom: 48px;
}

/* Download card */
.download-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.platform-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  color: #60a5fa;
}

.platform-icon svg {
  width: 28px;
  height: 28px;
}

.platform-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.platform-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.platform-version {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

/* Download button */
.download-actions {
  margin-bottom: 20px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.download-btn.primary {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.download-btn.primary:hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--cf-shadow, rgba(0, 0, 0, 0.15));
}

/* Release info */
.release-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.release-version {
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 9999px;
  color: var(--vp-c-text-2);
}

/* Alt downloads */
.alt-downloads {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.alt-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.2s;
}

.alt-link:hover {
  color: var(--vp-c-text-1);
}

/* Responsive */
@media (max-width: 640px) {
  .download-section {
    padding: 80px 20px;
  }

  .download-title {
    font-size: 36px;
  }

  .download-card {
    padding: 24px;
  }

  .platform-info {
    flex-direction: column;
    text-align: center;
  }

  .platform-text {
    align-items: center;
  }

  .alt-downloads {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
