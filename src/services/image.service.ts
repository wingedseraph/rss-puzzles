import { BASE_URL } from './data.utils';

export class ImageServiceManager {
  private readonly baseUrl = BASE_URL;

  async fetchImageUrl(imagePath: string) {
    const fullUrl = `${this.baseUrl}/${imagePath}`;
    return fullUrl;
  }

  fetchImageUrlSync(imagePath: string) {
    const fullUrl = `${this.baseUrl}/images/${imagePath}`;
    return fullUrl;
  }
}
