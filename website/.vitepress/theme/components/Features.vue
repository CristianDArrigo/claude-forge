<script setup lang="ts">
/**
 * Features Component
 * Animated feature cards grid
 */
import { ref, onMounted } from 'vue';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

defineProps<{
  features?: Feature[];
}>();

const isVisible = ref(false);

// Default features if not provided via props
const defaultFeatures: Feature[] = [
  {
    icon: 'projects',
    title: 'Multi-Project Management',
    description: 'Organize and switch between multiple projects with separate chat histories and configurations.'
  },
  {
    icon: 'agents',
    title: 'Custom AI Agents',
    description: 'Create and configure specialized agents with specific roles, permissions, and system prompts.'
  },
  {
    icon: 'history',
    title: 'Prompt History',
    description: 'Navigate through previous prompts with keyboard shortcuts. Never lose your commands again.'
  },
  {
    icon: 'files',
    title: 'File Explorer',
    description: 'Browse project files directly in the sidebar with an intuitive tree view interface.'
  },
  {
    icon: 'git',
    title: 'Git Integration',
    description: 'View status, stage files, commit changes, and push/pull - all without leaving the app.'
  },
  {
    icon: 'settings',
    title: 'Customizable Settings',
    description: 'Configure theme, notifications, Claude CLI path, and other preferences to suit your workflow.'
  }
];

onMounted(() => {
  // Use Intersection Observer for scroll-triggered animations
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

  const section = document.querySelector('.features-section');
  if (section) {
    observer.observe(section);
  }
});
</script>

<template>
  <section class="features-section">
    <div class="features-container">
      <!-- Section header -->
      <div class="features-header" :class="{ visible: isVisible }">
        <span class="features-label">Features</span>
        <h2 class="features-title">Everything you need</h2>
        <p class="features-subtitle">
          Claude Forge brings the power of Claude Code CLI to a beautiful desktop interface,
          with additional features that boost your productivity.
        </p>
      </div>

      <!-- Features grid -->
      <div class="features-grid">
        <div
          v-for="(feature, index) in (features || defaultFeatures)"
          :key="index"
          class="feature-card"
          :class="{ visible: isVisible }"
          :style="{ '--delay': `${index * 100}ms` }"
        >
          <!-- Icon -->
          <div class="feature-icon">
            <!-- Projects icon -->
            <svg v-if="feature.icon === 'projects'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <!-- Agents icon -->
            <svg v-else-if="feature.icon === 'agents'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
            <!-- History icon -->
            <svg v-else-if="feature.icon === 'history'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <!-- Files icon -->
            <svg v-else-if="feature.icon === 'files'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <!-- Git icon -->
            <svg v-else-if="feature.icon === 'git'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="6" y1="3" x2="6" y2="15"/>
              <circle cx="18" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/>
              <path d="M18 9a9 9 0 0 1-9 9"/>
            </svg>
            <!-- Settings icon -->
            <svg v-else-if="feature.icon === 'settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <!-- Default icon -->
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>

          <!-- Content -->
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 120px 24px;
  background: linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-alt) 100%);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.features-header {
  text-align: center;
  margin-bottom: 64px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.features-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.features-label {
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

.features-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.features-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  max-width: 600px;
  margin: 0 auto;
}

/* Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Card */
.feature-card {
  padding: 32px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay, 0ms);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  border-color: var(--vp-c-border);
  transform: translateY(-4px);
  box-shadow: 0 16px 32px var(--cf-shadow, rgba(0, 0, 0, 0.15));
}

/* Icon */
.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  margin-bottom: 24px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.feature-card:hover .feature-icon {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
}

.feature-icon svg {
  width: 24px;
  height: 24px;
}

/* Content */
.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.feature-description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

/* Responsive */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features-section {
    padding: 80px 20px;
  }

  .features-title {
    font-size: 36px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 24px;
  }
}
</style>
