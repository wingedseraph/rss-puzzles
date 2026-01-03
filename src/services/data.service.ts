import { AudioServiceManager } from './audio.service';
import { ImageServiceManager } from './image.service';
import { LevelService } from './level.service';

export class DataService {
  public readonly levelService: LevelService;
  public readonly audioService: AudioServiceManager;
  public readonly imageService: ImageServiceManager;

  constructor() {
    this.levelService = new LevelService();
    this.audioService = new AudioServiceManager();
    this.imageService = new ImageServiceManager();
  }

  async fetchLevels() {
    return this.levelService.fetchLevels();
  }

  async fetchLevelData(level: number) {
    return this.levelService.fetchSingleLevel(level);
  }

  async fetchRound(level: number, round: number) {
    return this.levelService.fetchRound(level, round);
  }

  async playAudio(audioPath: string) {
    return this.audioService.playAudio(audioPath);
  }

  stopAudio() {
    return this.audioService.stopAudio();
  }

  async fetchImageUrl(imagePath: string) {
    return this.imageService.fetchImageUrl(imagePath);
  }

  fetchImageUrlSync(imagePath: string) {
    return this.imageService.fetchImageUrlSync(imagePath);
  }
}
