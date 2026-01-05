import { useProgressStore } from '@/stores/progress.store';
import type { GameLogicComputed } from './computed';
import { type GameLogicState } from './state';

export type GameLogicFunctions = {
  initializeSentence: () => void;
  initializeNextSentence: () => void;
  moveWordToResult: (word: string) => void;
  moveWordToSource: (word: string) => void;
  checkSentence: () => boolean;
  continueToNext: () => void;
  autoComplete: () => void;
};

export function createGameFunctions(state: GameLogicState, computedProps: GameLogicComputed) {
  const progressStore = useProgressStore();

  const initializeSentence = () => {
    if (!computedProps.currentWord.value || !computedProps.currentWord.value.textExample) return;

    const answerWords = computedProps.currentWord.value.textExample
      .split(' ')
      .map((word) => word.trim())
      .filter((word): word is string => typeof word === 'string' && word.length > 0);

    state.sourceWords.value = [...answerWords].sort(() => Math.random() - 0.5);
    state.resultWords.value = [];
    state.isChecking.value = false;
    state.isCorrect.value = false;
    state.wordStatuses.value = {};
  };

  const initializeNextSentence = () => {
    if (computedProps.currentSentence.value) {
      state.sentencesCompleted.value[state.currentSentenceIndex.value] = true;
    }

    if (computedProps.completedCount.value >= 10) {
      progressStore.markRoundCompleted(state.currentLevel.value, state.currentPage.value);
      const firstRound = state.filteredRounds.value[0];
      if (firstRound?.artwork) {
        state.currentArtwork.value = {
          imageSrc: firstRound.artwork.imageSrc,
          title: firstRound.artwork.title,
          artist: firstRound.artwork.artist,
          year: firstRound.artwork.year,
        };
      }
      state.showArtwork.value = true;
      return;
    }

    if (state.currentSentenceIndex.value < state.sentenceData.value.length - 1) {
      state.currentSentenceIndex.value++;
      initializeSentence();
    }
  };

  const moveWordToResult = (word: string) => {
    const index = state.sourceWords.value.indexOf(word);
    if (index !== -1) {
      state.sourceWords.value.splice(index, 1);
      state.resultWords.value.push(word);
    }
  };

  const moveWordToSource = (word: string) => {
    const index = state.resultWords.value.indexOf(word);
    if (index !== -1) {
      state.resultWords.value.splice(index, 1);
      state.sourceWords.value.push(word);
    }
  };

  const checkSentence = () => {
    if (!computedProps.currentWord.value || !computedProps.currentWord.value.textExample)
      return false;

    const correctWords = computedProps.currentWord.value.textExample
      .split(' ')
      .filter((word): word is string => typeof word === 'string' && word.length > 0);

    state.isCorrect.value =
      state.resultWords.value.length === correctWords.length &&
      state.resultWords.value.every((word, index) => word === correctWords[index]);

    correctWords.forEach((word: string, index: number) => {
      if (word) {
        state.wordStatuses.value[word] = state.resultWords.value[index] === word;
      }
    });

    state.isChecking.value = true;

    return state.isCorrect.value;
  };

  const continueToNext = () => {
    if (computedProps.completedCount.value >= 10) {
    } else {
      initializeNextSentence();
    }
  };

  const autoComplete = () => {
    if (!computedProps.currentWord.value || !computedProps.currentWord.value.textExample) return;

    const correctWords = computedProps.currentWord.value.textExample
      .split(' ')
      .filter((word): word is string => typeof word === 'string' && word.length > 0);

    state.resultWords.value = [...correctWords];
    state.sourceWords.value = [];

    correctWords.forEach((word: string) => {
      if (word) {
        state.wordStatuses.value[word] = true;
      }
    });

    state.isCorrect.value = true;
    state.isChecking.value = true;
  };

  return {
    initializeSentence,
    initializeNextSentence,
    moveWordToResult,
    moveWordToSource,
    checkSentence,
    continueToNext,
    autoComplete,
  };
}
