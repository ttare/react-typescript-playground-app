import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';
import { AlbumService } from 'services';
import useApi from 'hooks/useApi';
import { AlbumInfo, ImageDetails } from 'types';
import ImageGallery from 'components/ImageGallery';

const AlbumDetails: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { isLoading, data, setData } = useApi<AlbumInfo>(AlbumService.details, {
    params: match.params.id,
  });

  if (isLoading) return null;

  const updateImages = (images: ImageDetails[]): void => {
    setData({
      ...data,
      images,
    });
  };

  return (
    <Segment vertical style={{ padding: '5em 0em' }}>
      <Container>
        <ImageGallery album={data} images={data.images} updateImages={updateImages} />
      </Container>
    </Segment>
  );
};
export default AlbumDetails;
