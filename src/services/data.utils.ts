import type { Round, Word, Sentence } from './data.types';
import type { RawLevelData } from './data.types';

export const BASE_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/refs/heads/main' as const;

export function transformLevelDataToRounds(data: unknown, level: number) {
  const rawData = data as RawLevelData;

  if (!rawData || !Array.isArray(rawData.rounds)) {
    throw new Error(`${data} is invalid structure received from API`);
  }

  const rounds: Round[] = [];

  rawData.rounds.forEach((apiRound, index) => {
    const words: Word[] = [];

    if (Array.isArray(apiRound.words)) {
      apiRound.words.forEach((apiWord) => {
        words.push({
          id: `${level}_${index + 1}_${apiWord.id}`,
          group: level,
          page: index,
          word: apiWord.word,
          image: apiWord.image || apiRound.levelData.imageSrc || '',
          audio: apiWord.audioExample || '',
          transcription: apiWord.transcription || '',
          wordTranslate: apiWord.wordTranslate || '',
          textMeaning: apiWord.textMeaning || '',
          textMeaningTranslate: apiWord.textMeaningTranslate || '',
          textExample: apiWord.textExample || '',
          textExampleTranslate: apiWord.textExampleTranslate || '',
        });
      });
    }

    const sentences: Sentence[] = [];
    if (apiRound.sentences && Array.isArray(apiRound.sentences)) {
      apiRound.sentences.forEach((apiSentence) => {
        sentences.push({
          id: `${level}_${index + 1}_${apiSentence.id}`,
          group: level,
          page: index,
          sentence: apiSentence.sentence,
          audio: apiSentence.audio || '',
          answer: apiSentence.answer || '',
        });
      });
    }

    rounds.push({
      id: `round_${level}_${index + 1}`,
      group: level,
      page: index,
      words,
      sentences,
    });
  });

  return rounds;
}
