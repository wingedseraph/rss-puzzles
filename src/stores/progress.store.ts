import { Storage } from '@/utils/storage.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const PROGRESS_STORAGE_KEY = 'rss-puzzle-progress' as const;

export type CompletedRound = {
  level: number;
  page: number;
};

export type ProgressData = {
  completedRounds: CompletedRound[];
};

export const useProgressStore = defineStore('progress', () => {
  const completedRounds = ref<CompletedRound[]>([]);

  const loadProgress = () => {
    const progress = Storage.get<ProgressData>(PROGRESS_STORAGE_KEY, {
      completedRounds: [],
    });
    completedRounds.value = progress?.completedRounds || [];
  };

  const saveProgress = () => {
    const progress: ProgressData = {
      completedRounds: completedRounds.value,
    };
    Storage.set(PROGRESS_STORAGE_KEY, progress);
  };

  const isRoundCompleted = (level: number, page: number) => {
    return completedRounds.value.some((round) => round.level === level && round.page === page);
  };

  const markRoundCompleted = (level: number, page: number) => {
    const exists = completedRounds.value.some(
      (round) => round.level === level && round.page === page,
    );
    if (!exists) {
      completedRounds.value.push({ level, page });
      saveProgress();
    }
  };

  loadProgress();

  return {
    completedRounds,
    isRoundCompleted,
    markRoundCompleted,
  };
});
