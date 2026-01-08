import React, { useState } from 'react';
import { AppMode } from './types';
import { IntroScreen } from './components/IntroScreen';
import { LearnScreen } from './components/LearnScreen';
import { TarotCanvas } from './components/TarotCanvas';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.LANDING);

  return (
    <div className="w-full h-screen bg-black text-white selection:bg-amber-900 selection:text-white">
      {mode === AppMode.LANDING && (
        <IntroScreen setMode={setMode} />
      )}
      
      {mode === AppMode.DRAWING && (
        <TarotCanvas onExit={() => setMode(AppMode.LANDING)} />
      )}
      
      {mode === AppMode.LEARNING && (
        <LearnScreen setMode={setMode} />
      )}
    </div>
  );
};

export default App;