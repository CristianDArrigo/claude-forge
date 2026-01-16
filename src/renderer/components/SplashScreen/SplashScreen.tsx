/**
 * Claude Forge - Splash Screen Component
 *
 * Displays a loading splash screen on application startup.
 */

import React from 'react';
import splashImage from '../../../../assets/frontpage.png';
import './SplashScreen.css';

/**
 * SplashScreen component shown during app initialization.
 */
function SplashScreen(): React.ReactElement {
  return (
    <div className="splash-screen">
      <img
        src={splashImage}
        alt="Claude Forge"
        className="splash-screen-image"
      />
    </div>
  );
}

export default SplashScreen;
