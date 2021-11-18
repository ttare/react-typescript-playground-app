import React, { useReducer } from 'react';
import { ImageDetails } from 'types';
import { ImageGallery, ImageGalleryModal, ImageGalleryState } from './ImageGalleryTypes';
import LikesOrDislikesModal from './LikesOrDislikesModal';
import imageGalleryReducer from './ImageGalleryReducer';

const initialState = {} as ImageGalleryState;

const ImageGalleryContext = React.createContext<ImageGallery>({} as ImageGallery);

const ImageGalleryProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(imageGalleryReducer, initialState);

  const toggle = (image?: ImageDetails, modal?: ImageGalleryModal) => {
    dispatch({
      type: 'SHOW_MODAL',
      data: {
        modal,
        image,
      },
    });
  };

  const value = {
    ...state,
    toggle,
  };

  return (
    <ImageGalleryContext.Provider value={value}>
      <LikesOrDislikesModal modalName={state.modal} toggle={toggle} />
      {children}
    </ImageGalleryContext.Provider>
  );
};

export default ImageGalleryProvider;

export const useImageGallery = (): ImageGallery => React.useContext(ImageGalleryContext);
