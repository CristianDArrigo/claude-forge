/**
 * Claude Forge - Settings Manager Service
 *
 * Manages application settings persistence.
 * Settings are stored in the user's app data directory.
 */

import { app } from 'electron';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { AppSettings } from '../../shared/types';

// Default settings values
const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  notifications: true,
  maxPromptHistory: 50,
  sidebarCollapsed: false
};

/**
 * SettingsManager handles loading and saving application settings.
 */
class SettingsManager {
  private settings: AppSettings;
  private settingsPath: string;

  constructor() {
    // Store settings in user data directory
    this.settingsPath = join(app.getPath('userData'), 'settings.json');
    this.settings = this.loadSettings();
  }

  /**
   * Loads settings from disk or returns defaults.
   */
  private loadSettings(): AppSettings {
    try {
      if (existsSync(this.settingsPath)) {
        const data = readFileSync(this.settingsPath, 'utf-8');
        const loaded = JSON.parse(data);
        // Merge with defaults to handle new settings
        return { ...DEFAULT_SETTINGS, ...loaded };
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
    return { ...DEFAULT_SETTINGS };
  }

  /**
   * Saves settings to disk.
   */
  private saveSettings(): void {
    try {
      // Ensure directory exists
      const dir = dirname(this.settingsPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  }

  /**
   * Returns all settings.
   */
  getSettings(): AppSettings {
    return { ...this.settings };
  }

  /**
   * Updates settings with partial values.
   */
  updateSettings(updates: Partial<AppSettings>): AppSettings {
    this.settings = { ...this.settings, ...updates };
    this.saveSettings();
    return { ...this.settings };
  }

  /**
   * Resets settings to defaults.
   */
  resetSettings(): AppSettings {
    this.settings = { ...DEFAULT_SETTINGS };
    this.saveSettings();
    return { ...this.settings };
  }

  /**
   * Gets a specific setting value.
   */
  getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.settings[key];
  }
}

// Export singleton instance
export const settingsManager = new SettingsManager();
