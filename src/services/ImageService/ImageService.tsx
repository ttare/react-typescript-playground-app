import ApiClient from 'utils/apiClient';
import { ImageDetails, Response, User } from 'types';
import { ImageGalleryModal } from '../../components/ImageGallery/ImageGalleryTypes';

class ImageService {
  static list(): Promise<Response<ImageDetails[]>> {
    return ApiClient.get<ImageDetails[]>('/home/images');
  }

  static likeOrDislike(id: string, likeOrDislike: boolean): Promise<Response<ImageDetails>> {
    return ApiClient.get<ImageDetails>(`/images/${id}/toggle-${likeOrDislike ? 'like' : 'dislike'}`);
  }

  static votes(id: number, type: ImageGalleryModal, page = 1, size = 10): Promise<Response<User[]>> {
    return ApiClient.get<User[]>(`/images/${id}/${type}/${page}/${size}`);
  }
}

export default ImageService;
