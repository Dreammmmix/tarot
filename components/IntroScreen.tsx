import React from 'react';
import { AppMode } from '../types';

interface IntroScreenProps {
  setMode: (mode: AppMode) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ setMode }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] opacity-20 bg-cover bg-center animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      
      <div className="z-10 text-center space-y-8 p-4">
        <h1 className="text-5xl md:text-7xl text-amber-500 tracking-[0.2em] uppercase font-bold drop-shadow-2xl mb-4">
          Arcana
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto italic font-light tracking-wider">
          "Fate is a garden of forking paths. Use your hands to part the mist."
        </p>

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <button
            onClick={() => setMode(AppMode.DRAWING)}
            className="group relative px-8 py-4 bg-transparent border border-amber-600 text-amber-500 overflow-hidden transition-all duration-500 hover:text-black hover:bg-amber-600"
          >
            <span className="relative z-10 tracking-widest text-sm uppercase">Begin Ritual</span>
          </button>

          <button
            onClick={() => setMode(AppMode.LEARNING)}
            className="group relative px-8 py-4 bg-transparent border border-gray-600 text-gray-400 overflow-hidden transition-all duration-500 hover:text-white hover:border-white"
          >
             <span className="relative z-10 tracking-widest text-sm uppercase">Study the Glyphs</span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-gray-600 text-xs tracking-widest uppercase">
        Use camera to interact · Turn up sound
      </div>
    </div>
  );
};