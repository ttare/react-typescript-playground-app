import { ImageDetails } from './image';

export type Album = {
  id: number;
  name: string;
  createdAt: Date;
};
export type AlbumItem = Album & {
  images: number;
};

export type AddAlbum = {
  name: string;
};

export type AlbumInfo = Album & {
  images: ImageDetails[];
};
