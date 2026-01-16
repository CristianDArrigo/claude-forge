/**
 * Claude Forge - Settings Panel Component
 *
 * Modal overlay for configuring application settings.
 * Provides controls for theme, notifications, and other preferences.
 */

import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import './SettingsPanel.css';

/**
 * SettingsPanel component for app configuration.
 */
function SettingsPanel(): React.ReactElement | null {
  const { settings, isOpen, updateSettings, closeSettings } = useSettingsStore();

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSettings();
    }
  };

  // Toggle handlers
  const toggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };

  const toggleSidebarCollapsed = () => {
    updateSettings({ sidebarCollapsed: !settings.sidebarCollapsed });
  };

  // History limit change
  const handleHistoryLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ maxPromptHistory: parseInt(e.target.value, 10) });
  };

  return (
    <div className="settings-backdrop" onClick={handleBackdropClick}>
      <div className="settings-panel">
        {/* Header */}
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button className="settings-close" onClick={closeSettings}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Notifications Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">Notifications</h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <span className="settings-item-label">Desktop Notifications</span>
                <span className="settings-item-description">
                  Show notifications when background tasks complete
                </span>
              </div>
              <button
                className={`settings-toggle ${settings.notifications ? 'settings-toggle-on' : ''}`}
                onClick={toggleNotifications}
              >
                <span className="settings-toggle-slider" />
              </button>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">Appearance</h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <span className="settings-item-label">Collapse Sidebar</span>
                <span className="settings-item-description">
                  Start with sidebar collapsed
                </span>
              </div>
              <button
                className={`settings-toggle ${settings.sidebarCollapsed ? 'settings-toggle-on' : ''}`}
                onClick={toggleSidebarCollapsed}
              >
                <span className="settings-toggle-slider" />
              </button>
            </div>
          </div>

          {/* History Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">History</h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <span className="settings-item-label">Prompt History Limit</span>
                <span className="settings-item-description">
                  Maximum number of prompts to remember
                </span>
              </div>
              <select
                className="settings-select"
                value={settings.maxPromptHistory}
                onChange={handleHistoryLimitChange}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="settings-version">Claude Forge v1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
