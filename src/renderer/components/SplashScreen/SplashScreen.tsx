/**
 * Claude Forge - Splash Screen Component
 *
 * Displays a loading splash screen on application startup.
 */

import React from 'react';
import './SplashScreen.css';

// Splash image is served from public folder
const splashImage = '/frontpage.png';

interface SplashScreenProps {
  fadeOut?: boolean;
}

/**
 * SplashScreen component shown during app initialization.
 */
function SplashScreen({ fadeOut = false }: SplashScreenProps): React.ReactElement {
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img
        src={splashImage}
        alt="Claude Forge"
        className="splash-screen-image"
      />
    </div>
  );
}

export default SplashScreen;
