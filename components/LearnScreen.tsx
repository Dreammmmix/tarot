import React, { useState } from 'react';
import { AppMode } from '../types';
import { TAROT_DECK } from '../constants';
import { getCardMeaning } from '../services/geminiService';

interface LearnScreenProps {
  setMode: (mode: AppMode) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ setMode }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [meaning, setMeaning] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleCardClick = async (card: string) => {
    setSelectedCard(card);
    setLoading(true);
    setMeaning("");
    const text = await getCardMeaning(card);
    setMeaning(text);
    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-gray-900">
        <h2 className="text-2xl text-amber-600 tracking-widest uppercase">The Archive</h2>
        <button onClick={() => setMode(AppMode.LANDING)} className="text-gray-500 hover:text-white uppercase text-xs tracking-widest">
          Return
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* List */}
        <div className="w-1/3 border-r border-gray-900 overflow-y-auto p-4 space-y-2">
          {TAROT_DECK.map((card) => (
            <button
              key={card}
              onClick={() => handleCardClick(card)}
              className={`w-full text-left p-3 text-sm tracking-wide transition-colors ${selectedCard === card ? 'bg-amber-900/20 text-amber-500 border-l-2 border-amber-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {card}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="w-2/3 p-12 flex flex-col justify-center items-center relative">
          {selectedCard ? (
            <div className="max-w-2xl text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">{selectedCard}</h1>
              {loading ? (
                <div className="animate-pulse text-gray-600 tracking-widest">Consulting the oracles...</div>
              ) : (
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light font-serif">
                  {meaning}
                </p>
              )}
            </div>
          ) : (
            <div className="text-gray-700 uppercase tracking-[0.3em]">Select a card to reveal its secrets</div>
          )}
        </div>
      </div>
    </div>
  );
};