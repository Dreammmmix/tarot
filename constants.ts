

export const TAROT_DECK = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World",
  "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands", "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
  "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups", "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
  "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords", "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords", "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
  "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles", "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

export const TOTAL_CARDS = TAROT_DECK.length;

export const BACK_COLOR = "#1a1a1a";
export const BACK_ACCENT = "#d4af37"; // Gold
export const CARD_RATIO = 1.71; // Standard Tarot Ratio

// ==========================================
//  自定义图片上传指南 (CUSTOM IMAGE UPLOAD GUIDE)
// ==========================================
// 如果你想使用自己的高清塔罗牌图片，请按以下步骤操作：
// 1. 准备 78 张塔罗牌图片（JPG 或 PNG）。
// 2. 将它们重命名为全小写，并用下划线连接，例如：
//    - "The Fool" -> "the_fool.jpg"
//    - "Ace of Wands" -> "ace_of_wands.jpg"
//    - "Queen of Cups" -> "queen_of_cups.jpg"
// 3. 将这些图片上传到一个支持公开访问的云存储（推荐：GitHub Pages, Vercel Blob, Amazon S3, 或 Imgur 图床）。
// 4. 获取图片所在的文件夹的基础 URL。
// 5. 将下方的 BASE_IMAGE_URL 替换为你自己的 URL。
// ==========================================

/**
 * Rider-Waite-Smith card art is bundled locally under public/cards.
 * Image files are sourced from https://github.com/michmitz/terminal-tarot (MIT License).
 * This keeps the cards consistent and avoids flaky external CDNs.
 */
const CARD_IMAGE_MAP: Record<string, string> = {
  "The Fool": "00-TheFool.jpg",
  "The Magician": "01-TheMagician.jpg",
  "The High Priestess": "02-TheHighPriestess.jpg",
  "The Empress": "03-TheEmpress.jpg",
  "The Emperor": "04-TheEmperor.jpg",
  "The Hierophant": "05-TheHierophant.jpg",
  "The Lovers": "06-TheLovers.jpg",
  "The Chariot": "07-TheChariot.jpg",
  "Strength": "08-Strength.jpg",
  "The Hermit": "09-TheHermit.jpg",
  "Wheel of Fortune": "10-WheelOfFortune.jpg",
  "Justice": "11-Justice.jpg",
  "The Hanged Man": "12-TheHangedMan.jpg",
  "Death": "13-Death.jpg",
  "Temperance": "14-Temperance.jpg",
  "The Devil": "15-TheDevil.jpg",
  "The Tower": "16-TheTower.jpg",
  "The Star": "17-TheStar.jpg",
  "The Moon": "18-TheMoon.jpg",
  "The Sun": "19-TheSun.jpg",
  "Judgement": "20-Judgement.jpg",
  "The World": "21-TheWorld.jpg",
  "Ace of Wands": "Wands01.jpg",
  "Two of Wands": "Wands02.jpg",
  "Three of Wands": "Wands03.jpg",
  "Four of Wands": "Wands04.jpg",
  "Five of Wands": "Wands05.jpg",
  "Six of Wands": "Wands06.jpg",
  "Seven of Wands": "Wands07.jpg",
  "Eight of Wands": "Wands08.jpg",
  "Nine of Wands": "Wands09.jpg",
  "Ten of Wands": "Wands10.jpg",
  "Page of Wands": "Wands11.jpg",
  "Knight of Wands": "Wands12.jpg",
  "Queen of Wands": "Wands13.jpg",
  "King of Wands": "Wands14.jpg",
  "Ace of Cups": "Cups01.jpg",
  "Two of Cups": "Cups02.jpg",
  "Three of Cups": "Cups03.jpg",
  "Four of Cups": "Cups04.jpg",
  "Five of Cups": "Cups05.jpg",
  "Six of Cups": "Cups06.jpg",
  "Seven of Cups": "Cups07.jpg",
  "Eight of Cups": "Cups08.jpg",
  "Nine of Cups": "Cups09.jpg",
  "Ten of Cups": "Cups10.jpg",
  "Page of Cups": "Cups11.jpg",
  "Knight of Cups": "Cups12.jpg",
  "Queen of Cups": "Cups13.jpg",
  "King of Cups": "Cups14.jpg",
  "Ace of Swords": "Swords01.jpg",
  "Two of Swords": "Swords02.jpg",
  "Three of Swords": "Swords03.jpg",
  "Four of Swords": "Swords04.jpg",
  "Five of Swords": "Swords05.jpg",
  "Six of Swords": "Swords06.jpg",
  "Seven of Swords": "Swords07.jpg",
  "Eight of Swords": "Swords08.jpg",
  "Nine of Swords": "Swords09.jpg",
  "Ten of Swords": "Swords10.jpg",
  "Page of Swords": "Swords11.jpg",
  "Knight of Swords": "Swords12.jpg",
  "Queen of Swords": "Swords13.jpg",
  "King of Swords": "Swords14.jpg",
  "Ace of Pentacles": "Pentacles01.jpg",
  "Two of Pentacles": "Pentacles02.jpg",
  "Three of Pentacles": "Pentacles03.jpg",
  "Four of Pentacles": "Pentacles04.jpg",
  "Five of Pentacles": "Pentacles05.jpg",
  "Six of Pentacles": "Pentacles06.jpg",
  "Seven of Pentacles": "Pentacles07.jpg",
  "Eight of Pentacles": "Pentacles08.jpg",
  "Nine of Pentacles": "Pentacles09.jpg",
  "Ten of Pentacles": "Pentacles10.jpg",
  "Page of Pentacles": "Pentacles11.jpg",
  "Knight of Pentacles": "Pentacles12.jpg",
  "Queen of Pentacles": "Pentacles13.jpg",
  "King of Pentacles": "Pentacles14.jpg",
};

export const getCardImageUrl = (cardName: string): string => {
  const fileName = CARD_IMAGE_MAP[cardName];
  if (fileName) {
    return `/cards/${fileName}`;
  }

  const fallback = cardName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return `/cards/${fallback}.jpg`;
};
