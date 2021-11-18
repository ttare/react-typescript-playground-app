import React from 'react';
import { Card, Container, Icon, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AlbumService } from 'services';
import useApi from 'hooks/useApi';
import { AlbumItem } from 'types';
import AddAlbumModal from './AddAlbumModal';
import { TemplateHelper } from 'templates';
import { ALBUM_DETAILS_URL } from '../../routeNames';
import './Albums.scss';

const Albums: React.FC = () => {
  const { isLoading, data, setData } = useApi<AlbumItem[]>(AlbumService.list);
  if (isLoading) return null;

  const onAddAlbum = (album: AlbumItem) => {
    setData([...data, album]);
  };

  return (
    <Segment vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Card.Group itemsPerRow={5}>
          <AddAlbumModal onSuccess={onAddAlbum} />
          {data.map(album => (
            <Card key={album.id}>
              <Image
                src="https://s1.mzstatic.com/us/r30/Purple/v4/56/57/e8/5657e82e-f0ec-ef20-9836-a69fc0d51f14/mzl.ctxcqmuy.png"
                size="small"
                centered
              />
              <Card.Content>
                <Card.Header>{album.name}</Card.Header>
                <Card.Meta>
                  <span className="date">{album.createdAt}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Link to={TemplateHelper.route(ALBUM_DETAILS_URL, album.id)}>
                  <Icon name="image" />
                  {album.images} images
                </Link>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    </Segment>
  );
};
export default Albums;
