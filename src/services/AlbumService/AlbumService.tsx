import ApiClient from 'utils/apiClient';
import { AddAlbum, AddImage, Album, AlbumInfo, AlbumItem, ImageDetails, Response } from 'types';

class AlbumService {
  static list(): Promise<Response<AlbumItem[]>> {
    return ApiClient.get<AlbumItem[]>('/albums/list');
  }

  static create(album: AddAlbum): Promise<Response<Album>> {
    return ApiClient.post<Album>('/albums/create', album);
  }

  static addImage(id: number, image: AddImage): Promise<Response<ImageDetails>> {
    return ApiClient.post<ImageDetails>(`/albums/${id}/add-image`, image);
  }

  static details(id: string): Promise<Response<AlbumInfo>> {
    return ApiClient.get<AlbumInfo>(`/albums/${id}`);
  }
}

export default AlbumService;
