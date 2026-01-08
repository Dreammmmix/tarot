export enum AppMode {
  LANDING = 'LANDING',
  DRAWING = 'DRAWING',
  LEARNING = 'LEARNING'
}

export enum GestureState {
  STACKED = 'STACKED',     // Fist
  SHUFFLING = 'SHUFFLING', // Open Hand
  SELECTED = 'SELECTED',   // One Finger
  REVEALED = 'REVEALED'    // One Finger + Shake / Flip
}

export interface TarotCard {
  id: number;
  name: string;
  image: string; // Placeholder color or texture for back
  isReversed: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}
