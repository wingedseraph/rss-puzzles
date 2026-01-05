import { type Level, type Round, type Word } from '@/services';
import { ref, type Ref } from 'vue';

export type GameLogicState = {
  levelData: Ref<Level | undefined>;
  currentSentenceIndex: Ref<number>;
  sourceWords: Ref<string[]>;
  resultWords: Ref<string[]>;
  loading: Ref<boolean>;
  isChecking: Ref<boolean>;
  isCorrect: Ref<boolean>;
  wordStatuses: Ref<{ [key: string]: boolean }>;
  sentencesCompleted: Ref<{ [key: number]: boolean }>;
  showArtwork: Ref<boolean>;
  currentArtwork: Ref<{
    imageSrc: string;
    title: string;
    artist: string;
    year: string;
  } | null>;
  originalLevelData: Ref<Level | undefined>;
  filteredRounds: Ref<Round[]>;
  sentenceData: Ref<
    Array<{ roundIndex: number; wordIndex: number; word: Word; completed: boolean }>
  >;
  currentLevel: Ref<number>;
  currentPage: Ref<number>;
};

export function createGameState() {
  return {
    levelData: ref<Level | undefined>(undefined),
    currentSentenceIndex: ref<number>(0),
    sourceWords: ref<string[]>([]),
    resultWords: ref<string[]>([]),
    loading: ref<boolean>(true),
    isChecking: ref<boolean>(false),
    isCorrect: ref<boolean>(false),
    wordStatuses: ref<{ [key: string]: boolean }>({}),
    sentencesCompleted: ref<{ [key: number]: boolean }>({}),
    showArtwork: ref<boolean>(false),
    currentArtwork: ref<{
      imageSrc: string;
      title: string;
      artist: string;
      year: string;
    } | null>(null),
    originalLevelData: ref<Level | undefined>(undefined),
    filteredRounds: ref<Round[]>([]),
    sentenceData: ref<
      Array<{ roundIndex: number; wordIndex: number; word: Word; completed: boolean }>
    >([]),
    currentLevel: ref<number>(1),
    currentPage: ref<number>(1),
  };
}
