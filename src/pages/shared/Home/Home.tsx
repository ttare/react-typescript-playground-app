import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { ImageService } from 'services';
import useApi from 'hooks/useApi';
import ImageGallery from 'components/ImageGallery';

const HomepageLayout: React.FC = () => {
  const { data, isLoading, setData } = useApi(ImageService.list);

  if (isLoading) return null;
  console.log(data);

  return (
    <Segment vertical style={{ padding: '5em 0em' }}>
      <Container>
        <ImageGallery images={data} updateImages={setData} />
      </Container>
    </Segment>
  );
};

export default HomepageLayout;
