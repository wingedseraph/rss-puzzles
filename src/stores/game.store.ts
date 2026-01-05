import { defineStore } from 'pinia';
import { createGameLogic } from '@/composables/useSharedGameLogic';

export const useGameStore = defineStore('game', () => {
  const gameLogic = createGameLogic();

  return {
    ...gameLogic,
  };
});
