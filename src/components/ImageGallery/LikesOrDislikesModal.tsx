import React, { useEffect } from 'react';
import { Button, Image, List, Modal } from 'semantic-ui-react';
import useApi from 'hooks/useApi';
import { ImageService } from 'services';
import { ImageGalleryModal } from './ImageGalleryTypes';
import { ImageDetails } from '../../types';

type Props = {
  image?: ImageDetails;
  modalName?: ImageGalleryModal;
  toggle: (image?: ImageDetails, modal?: ImageGalleryModal) => void;
};

const ImageVotes: React.FC<Props> = ({ image, modalName }) => {
  const { data, isLoading, fetch } = useApi(ImageService.votes, { skipOnLoad: true });

  useEffect(() => {
    if (modalName && image) {
      fetch(image.id, modalName);
    }
  }, [modalName]);

  if (!data || isLoading) return null;

  return (
    <List divided verticalAlign="middle">
      {data.map(user => (
        <List.Item key={user.id}>
          <Image avatar src="https://react.semantic-ui.com/images/avatar/small/rachel.png" />
          <List.Content>
            <List.Header as="a">{user.name}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

const LikesOrDislikesModal: React.FC<Props> = ({ image, modalName, toggle }) => {
  return (
    <Modal size="tiny" onClose={() => toggle()} open={!!modalName} style={{ width: 300, height: 340 }}>
      <Modal.Header style={{ textTransform: 'capitalize' }}>{modalName}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          {modalName && <ImageVotes image={image} modalName={modalName} toggle={toggle} />}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggle()} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LikesOrDislikesModal;
