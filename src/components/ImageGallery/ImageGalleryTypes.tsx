import { ImageDetails } from 'types';

export enum ImageGalleryModal {
  likes = 'likes',
  dislikes = 'dislikes',
}

export type ImageGalleryState = {
  modal?: ImageGalleryModal;
  image?: ImageDetails;
};

export type ImageGalleryActions = { type: 'SHOW_MODAL'; data: { image?: ImageDetails; modal?: ImageGalleryModal } };

export type ImageGallery = ImageGalleryState & {
  toggle: (image?: ImageDetails, modal?: ImageGalleryModal) => void;
};
