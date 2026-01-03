export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  textExample: string;
  textExampleTranslate: string;
};

export type Sentence = {
  id: string;
  group: number;
  page: number;
  sentence: string;
  audio: string;
  answer: string;
};

export type Round = {
  id: string;
  group: number;
  page: number;
  words: Word[];
  sentences: Sentence[];
};

export type Level = {
  id: string;
  name: string;
  rounds: Round[];
};

export type ArtworkMetadata = {
  id: string;
  level: number;
  round: number;
  imageUrl: string;
  title: string;
  artist: string;
  year: string;
  description: string;
};

export type AudioService = {
  playAudio: (url: string) => Promise<void>;
  pauseAudio: () => void;
  stopAudio: () => void;
  setVolume: (volume: number) => void;
  isPlaying: () => boolean;
};

export type ImageService = {
  preloadImage: (url: string) => Promise<HTMLImageElement>;
  getImageUrl: (artworkId: string) => string;
  cacheImage: (url: string) => Promise<void>;
};

export type RawDataItem = {
  word?: string;
  image?: string;
  audio?: string;
  transcription?: string;
  wordTranslate?: string;
  textMeaning?: string;
  textMeaningTranslate?: string;
  textExample?: string;
  textExampleTranslate?: string;
  sentence?: string;
  answer?: string;
  id?: string;
  group?: number;
  page?: number;
};

export type RawLevelData = {
  rounds: {
    levelData: {
      id: string;
      name: string;
      imageSrc: string;
      cutSrc: string;
      author: string;
      year: string;
    };
    words: {
      id: number;
      word: string;
      wordTranslate: string;
      transcription: string;
      textMeaning: string;
      textMeaningTranslate: string;
      textExample: string;
      textExampleTranslate: string;
      audioExample: string;
      audioMeaning: string;
      image: string;
    };
    sentences: {
      id: number;
      sentence: string;
      answer: string;
      audio: string;
    };
  }[];
};
