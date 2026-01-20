import { getReading, getGeneralMeaning } from '../tarotMeanings';

export const getTarotReading = async (cardName: string, isReversed: boolean): Promise<string> => {
  return Promise.resolve(getReading(cardName, isReversed));
};

export const getCardMeaning = async (cardName: string): Promise<string> => {
  return Promise.resolve(getGeneralMeaning(cardName));
};