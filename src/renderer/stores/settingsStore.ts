/**
 * Claude Forge - Settings Store
 *
 * Zustand store for managing application settings.
 * Persists settings via IPC to the main process.
 */

import { create } from 'zustand';
import { AppSettings } from '../../shared/types';

interface SettingsState {
  // Settings data
  settings: AppSettings;
  isLoading: boolean;
  isOpen: boolean;  // Settings panel visibility

  // Actions
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  openSettings: () => void;
  closeSettings: () => void;
}

// Default settings for initial state
const defaultSettings: AppSettings = {
  theme: 'dark',
  notifications: true,
  maxPromptHistory: 50,
  sidebarCollapsed: false
};

export const useSettingsStore = create<SettingsState>((set) => ({
  // Initial state
  settings: defaultSettings,
  isLoading: false,
  isOpen: false,

  // Load settings from main process
  loadSettings: async () => {
    set({ isLoading: true });
    try {
      const settings = await window.claudeForge.settings.load();
      set({ settings, isLoading: false });
    } catch (err) {
      console.error('Failed to load settings:', err);
      set({ isLoading: false });
    }
  },

  // Update settings (partial)
  updateSettings: async (updates: Partial<AppSettings>) => {
    try {
      const newSettings = await window.claudeForge.settings.save(updates);
      set({ settings: newSettings });
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  },

  // Open settings panel
  openSettings: () => {
    set({ isOpen: true });
  },

  // Close settings panel
  closeSettings: () => {
    set({ isOpen: false });
  }
}));
