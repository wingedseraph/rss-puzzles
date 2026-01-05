import {
  createGameComputed,
  type GameLogicComputed,
  getCardWidth,
  getSentenceText,
  isSentenceCompleted,
} from './game-logic/computed';
import { createGameDataLoader, type GameDataLoader } from './game-logic/data-loader';
import { createGameFunctions, type GameLogicFunctions } from './game-logic/functions';
import { createGameState, type GameLogicState } from './game-logic/state';

export type GameLogic = GameLogicState &
  GameLogicComputed &
  GameLogicFunctions &
  GameDataLoader & {
    isSentenceCompleted: (sentenceIndex: number) => boolean;
    getSentenceText: (sentenceIndex: number) => string;
    getCardWidth: (word: string) => string;
  };

export function createGameLogic() {
  const state = createGameState();
  const computedProps = createGameComputed(state);
  const functions = createGameFunctions(state, computedProps);
  const dataLoader = createGameDataLoader(state, computedProps);

  return {
    ...state,
    ...computedProps,
    ...functions,
    ...dataLoader,
    isSentenceCompleted: (sentenceIndex: number) => isSentenceCompleted(state, sentenceIndex),
    getSentenceText: (sentenceIndex: number) => getSentenceText(state, sentenceIndex),
    getCardWidth,
  };
}
