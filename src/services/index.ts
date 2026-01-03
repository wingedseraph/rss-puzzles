import { DataService } from '@/services/data.service';

export const dataService = new DataService();

export function useAudioService() {
  return {
    playAudio: (url: string) => dataService.playAudio(url),
    stopAudio: () => dataService.stopAudio(),
  };
}

export function useImageService() {
  return {
    getImageUrl: (artworkId: string) => {
      return dataService.fetchImageUrlSync(artworkId);
    },
  };
}

export type {
  ArtworkMetadata,
  AudioService,
  ImageService,
  Level,
  Round,
  Sentence,
  Word,
} from './data.types';
