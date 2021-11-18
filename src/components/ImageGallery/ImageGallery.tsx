import React from 'react';
import { Card } from 'semantic-ui-react';
import AddImageModal from 'pages/authorized/AlbumDetails/AddImageModal';
import ImageItem from 'pages/authorized/AlbumDetails/ImageItem';
import { Album, ImageDetails } from 'types';
import { useAuthState } from 'context/AuthProvider';
import { updateItemInArray } from 'utils';
import ImageGalleryProvider from './ImageGalleryContext';

type Props = {
  album?: Album;
  images: ImageDetails[];
  updateImages: (images: ImageDetails[]) => void;
};

const ImageGallery: React.FC<Props> = ({ album, images, updateImages }) => {
  const authState = useAuthState();

  const updateImage = (image: ImageDetails) => {
    const data = updateItemInArray(images, image);
    updateImages(data);
  };

  return (
    <ImageGalleryProvider>
      <Card.Group itemsPerRow={4}>
        {album && <AddImageModal albumId={album.id} onImageAdd={updateImage} />}
        {images?.map(image => (
          <ImageItem canVote={!!authState.user} image={image} onVoteSuccess={updateImage} key={image.id} />
        ))}
      </Card.Group>
    </ImageGalleryProvider>
  );
};

export default ImageGallery;
