import { type Word } from '@/services';
import { computed, type ComputedRef } from 'vue';
import type { GameLogicState } from './state';

const MAX_SENTENCE_PER_PAGE = 10;

export type GameLogicComputed = {
  currentSentence: ComputedRef;
  currentWord: ComputedRef<Word | undefined>;
  completedCount: ComputedRef<number>;
  backgroundImageOpacity: ComputedRef<number>;
  visibleSentences: ComputedRef<
    Array<{ sentence: { word: Word; completed: boolean } | undefined; index: number }>
  >;
  allWordsInResult: ComputedRef<boolean>;
  canContinueToNextPage: ComputedRef<boolean>;
};

export function createGameComputed(state: GameLogicState) {
  const currentSentence = computed(() => {
    if (
      state.currentSentenceIndex.value < 0 ||
      state.currentSentenceIndex.value >= state.sentenceData.value.length
    ) {
      return undefined;
    }
    return state.sentenceData.value[state.currentSentenceIndex.value];
  });

  const currentWord = computed<Word | undefined>(() => currentSentence.value?.word);

  const completedCount = computed(() => {
    return Object.keys(state.sentencesCompleted.value).filter(
      (key) => state.sentencesCompleted.value[parseInt(key)],
    ).length;
  });

  const backgroundImageOpacity = computed(() => completedCount.value / 30);

  const visibleSentences = computed(() => {
    return state.sentenceData.value
      .map((sentence, index) => ({ sentence, index }))
      .filter(
        ({ index }) =>
          isSentenceCompleted(state, index) || index === state.currentSentenceIndex.value,
      );
  });

  const allWordsInResult = computed(() => {
    if (!currentWord.value || !currentWord.value.textExample) return false;
    const correctWords = currentWord.value.textExample
      .split(' ')
      .filter((word): word is string => typeof word === 'string' && word.length > 0);
    return (
      state.resultWords.value.length > 0 && state.resultWords.value.length === correctWords.length
    );
  });

  const canContinueToNextPage = computed(() => {
    if (!state.originalLevelData.value) return false;
    const totalPages = Math.ceil(
      state.originalLevelData.value.rounds.length / MAX_SENTENCE_PER_PAGE,
    );
    return state.currentPage.value < totalPages;
  });

  return {
    currentSentence,
    currentWord,
    completedCount,
    backgroundImageOpacity,
    visibleSentences,
    allWordsInResult,
    canContinueToNextPage,
  };
}

export function isSentenceCompleted(state: GameLogicState, sentenceIndex: number) {
  return state.sentencesCompleted.value[sentenceIndex] || false;
}

export function getSentenceText(state: GameLogicState, sentenceIndex: number) {
  const sentence = state.sentenceData.value[sentenceIndex];
  if (!sentence) return '';
  return sentence.word.textExample || '';
}

export function getCardWidth(word: string) {
  return `${60 + word.length * 8}px`;
}
