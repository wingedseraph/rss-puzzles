import { dataService } from '@/services';
import { useProgressStore } from '@/stores/progress.store';
import { useRoute } from 'vue-router';
import type { GameLogicComputed } from './computed';
import { type GameLogicState } from './state';

const MAX_SENTENCE_PER_PAGE = 10;

export type GameDataLoader = {
  loadLevelData: () => Promise<void>;
};

export function createGameDataLoader(state: GameLogicState, computedProps?: GameLogicComputed) {
  const progressStore = useProgressStore();
  const route = useRoute();

  const loadLevelData = async () => {
    try {
      state.loading.value = true;
      const level = parseInt(route.params.level as string);
      const page = parseInt(route.params.round as string);

      if (isNaN(level) || isNaN(page) || level < 1 || page < 1) {
        throw new Error(
          `Invalid route parameters: level=${route.params.level}, page=${route.params.round}`,
        );
      }

      state.currentLevel.value = level;
      state.currentPage.value = page;

      state.originalLevelData.value = await dataService.fetchLevelData(level);

      if (state.originalLevelData.value?.rounds.length) {
        const startIndex = (page - 1) * MAX_SENTENCE_PER_PAGE;
        const endIndex = Math.min(
          startIndex + MAX_SENTENCE_PER_PAGE,
          state.originalLevelData.value.rounds.length,
        );
        state.filteredRounds.value = state.originalLevelData.value.rounds.slice(
          startIndex,
          endIndex,
        );

        state.levelData.value = {
          ...state.originalLevelData.value,
          rounds: state.filteredRounds.value,
        };

        const firstRound = state.filteredRounds.value[0];
        if (firstRound?.artwork) {
          state.currentArtwork.value = {
            imageSrc: firstRound.artwork.imageSrc,
            title: firstRound.artwork.title,
            artist: firstRound.artwork.artist,
            year: firstRound.artwork.year,
          };
        }

        const isPageCompleted = progressStore.isRoundCompleted(level, page);
        if (isPageCompleted) {
          state.showArtwork.value = true;
          state.sentencesCompleted.value = {};
          for (let i = 0; i < MAX_SENTENCE_PER_PAGE; i++) {
            state.sentencesCompleted.value[i] = true;
          }
        } else {
          state.currentSentenceIndex.value = 0;
          state.sentencesCompleted.value = {};
          state.showArtwork.value = false;
        }

        state.sentenceData.value = [];
        state.filteredRounds.value.forEach((round, roundIndex) => {
          if (round.words.length > 0) {
            const firstWord = round.words[0];
            if (firstWord) {
              state.sentenceData.value.push({
                roundIndex,
                wordIndex: 0,
                word: firstWord,
                completed: false,
              });
            }
          }
        });

        if (!isPageCompleted && state.sentenceData.value.length > 0) {
          const initializeSentence = () => {
            const currentWord = computedProps
              ? computedProps.currentWord.value
              : state.sentenceData.value[state.currentSentenceIndex.value]?.word;

            if (!currentWord || !currentWord.textExample) return;

            const answerWords = currentWord.textExample
              .split(' ')
              .map((word) => word.trim())
              .filter((word): word is string => typeof word === 'string' && word.length > 0);

            state.sourceWords.value = [...answerWords].sort(() => Math.random() - 0.5);
            state.resultWords.value = [];
            state.isChecking.value = false;
            state.isCorrect.value = false;
            state.wordStatuses.value = {};
          };
          initializeSentence();
        }
      }
    } catch (error) {
      console.error('Error fetching level data:', error);
    } finally {
      state.loading.value = false;
    }
  };

  return { loadLevelData };
}
