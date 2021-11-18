import { ImageGalleryActions, ImageGalleryState } from './ImageGalleryTypes';
import { updateObject } from '../../utils';

function imageGalleryReducer(state: ImageGalleryState, action: ImageGalleryActions) {
  switch (action.type) {
    case 'SHOW_MODAL': {
      const { image, modal } = action.data;
      return updateObject(state, { image, modal });
    }
    default:
      throw new Error();
  }
}

export default imageGalleryReducer;
