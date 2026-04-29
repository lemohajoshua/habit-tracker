import React from 'react';

const SplashScreen = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-white"
      data-testid="splash-screen"
    >
      <h1 className="text-4xl font-bold text-blue-600">Habit Tracker</h1>
    </div>
  );
};

export default SplashScreen;