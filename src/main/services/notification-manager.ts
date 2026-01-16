/**
 * Claude Forge - Notification Manager Service
 *
 * Handles desktop notifications using Electron's Notification API.
 * Respects user settings for enabling/disabling notifications.
 */

import { Notification, BrowserWindow } from 'electron';
import { settingsManager } from './settings-manager';
import { Commit } from '../../shared/types';

/**
 * NotificationManager handles desktop notifications.
 */
class NotificationManager {
  /**
   * Shows a notification if notifications are enabled.
   */
  private show(title: string, body: string): void {
    // Check if notifications are enabled
    if (!settingsManager.getSetting('notifications')) {
      return;
    }

    // Create and show notification
    const notification = new Notification({
      title,
      body,
      silent: false
    });

    // Focus app window when notification is clicked
    notification.on('click', () => {
      const windows = BrowserWindow.getAllWindows();
      if (windows.length > 0) {
        const win = windows[0];
        if (win.isMinimized()) {
          win.restore();
        }
        win.focus();
      }
    });

    notification.show();
  }

  /**
   * Notifies when a task completes successfully.
   */
  notifyTaskComplete(projectName: string, commit: Commit): void {
    this.show(
      'Task Completed',
      `${projectName}: ${commit.ai_output.commit_title}`
    );
  }

  /**
   * Notifies when a task fails.
   */
  notifyTaskFailed(projectName: string, error: string): void {
    this.show(
      'Task Failed',
      `${projectName}: ${error.substring(0, 100)}`
    );
  }

  /**
   * Shows a generic info notification.
   */
  notifyInfo(title: string, body: string): void {
    this.show(title, body);
  }
}

// Export singleton instance
export const notificationManager = new NotificationManager();
