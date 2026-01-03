import type { Level } from './data.types';
import { BASE_URL, transformLevelDataToRounds } from './data.utils';

const MAX_LEVEL_AMOUNT = 6 as const;

export class LevelService {
  private readonly baseUrl = BASE_URL;

  async fetchLevels() {
    const levels: Level[] = [];

    for (let level = 1; level <= MAX_LEVEL_AMOUNT; level++) {
      try {
        const levelData = await this.fetchSingleLevel(level);
        levels.push(levelData);
      } catch (error) {
        console.error(`Error fetching level ${level}:`, error);
        throw new Error(
          `Failed to fetch all levels: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    return levels;
  }

  async fetchSingleLevel(level: number) {
    if (level < 1 || level > MAX_LEVEL_AMOUNT) {
      throw new Error(
        `Invalid level number: ${level}. Level must be between 1 and ${MAX_LEVEL_AMOUNT}.`,
      );
    }

    const response = await fetch(`${this.baseUrl}/data/wordCollectionLevel${level}.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch level ${level} data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    const levelData: Level = {
      id: `level_${level}`,
      name: `Level ${level}`,
      rounds: transformLevelDataToRounds(data, level),
    };

    return levelData;
  }

  async fetchRound(level: number, round: number) {
    if (level < 1 || level > MAX_LEVEL_AMOUNT) {
      throw new Error(
        `Invalid level number: ${level}. Level must be between 1 and ${MAX_LEVEL_AMOUNT}.`,
      );
    }

    const levelData = await this.fetchSingleLevel(level);

    if (round < 1 || round > levelData.rounds.length) {
      throw new Error(
        `Round ${round} does not exist in level ${level}. Available rounds: 1-${levelData.rounds.length}`,
      );
    }

    return levelData.rounds[round - 1]!;
  }
}
