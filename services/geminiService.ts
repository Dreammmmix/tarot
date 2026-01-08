import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getTarotReading = async (cardName: string, isReversed: boolean) => {
  try {
    const client = getAI();
    const position = isReversed ? "reversed" : "upright";
    const prompt = `I drew the Tarot card "${cardName}" in the ${position} position. 
    Provide a mystical, poetic, but concise interpretation (max 80 words). 
    Focus on the "Penderecki's Garden" vibe: mysterious, philosophical, slighty dark but hopeful.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The mists are too thick to see the future clearly right now. Meditate on the card itself.";
  }
};

export const getCardMeaning = async (cardName: string) => {
    try {
      const client = getAI();
      const prompt = `Explain the general philosophical meaning of the Tarot card "${cardName}". Keep it under 100 words, mysterious and profound style.`;
  
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Knowledge is hidden.";
    }
  };