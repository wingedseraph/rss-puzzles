import { BASE_URL } from './data.utils';

export class AudioServiceManager {
  private readonly baseUrl = BASE_URL;
  private audioElement: HTMLAudioElement | null = null;

  async fetchAudioUrl(audioPath: string) {
    const fullUrl = `${this.baseUrl}/${audioPath}`;
    return fullUrl;
  }

  async playAudio(audioPath: string) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }

    const audioUrl = await this.fetchAudioUrl(audioPath);
    this.audioElement.src = audioUrl;
    await this.audioElement.play();
  }

  stopAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }
}
