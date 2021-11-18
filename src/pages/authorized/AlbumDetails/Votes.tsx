import React from 'react';
import { Button, Grid, Icon, Label } from 'semantic-ui-react';
import { ImageDetails } from 'types';
import useApi from 'hooks/useApi/useApi';
import { ImageService } from 'services';
import { useImageGallery } from 'components/ImageGallery/ImageGalleryContext';
import { ImageGalleryModal } from '../../../components/ImageGallery/ImageGalleryTypes';

type Props = {
  canVote: boolean;
  image: ImageDetails;
  onVoteSuccess: (image: ImageDetails) => void;
};

type VoteItemProps = Props & {
  isLike?: boolean;
};

const VoteItem: React.FC<VoteItemProps> = ({ canVote, image, isLike, onVoteSuccess }) => {
  const api = useApi(ImageService.likeOrDislike, { skipOnLoad: true });
  const imageGallery = useImageGallery();

  const likeOrDislike = () => {
    if (!canVote) return;
    api.fetch(image.id, isLike).then(response => {
      if (response.data) {
        onVoteSuccess(response.data);
      }
    });
  };

  const openModal = () => {
    imageGallery.toggle(image, isLike ? ImageGalleryModal.likes : ImageGalleryModal.dislikes);
  };

  const text = (
    <Label as="a" basic pointing={isLike ? 'left' : 'right'} onClick={openModal}>
      {isLike ? image.likes : image.dislikes}
    </Label>
  );

  const color = isLike && image.likedByYou ? 'blue' : !isLike && image.dislikedByYou ? 'red' : undefined;
  const button = (
    <Button color={color} icon loading={api.isLoading} disabled={!canVote} onClick={likeOrDislike}>
      <Icon name={isLike ? 'thumbs up' : 'thumbs down'} />
    </Button>
  );

  const items = isLike ? [button, text] : [text, button];

  return (
    <Grid.Column textAlign={isLike ? 'left' : 'right'}>
      <Button as="div" labelPosition={isLike ? 'right' : 'left'} style={{ cursor: 'inherit' }}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>{item}</React.Fragment>
        ))}
      </Button>
    </Grid.Column>
  );
};

const Votes: React.FC<Props> = props => {
  return (
    <Grid columns="equal">
      <VoteItem {...props} isLike />
      <VoteItem {...props} />
    </Grid>
  );
};

export default Votes;
