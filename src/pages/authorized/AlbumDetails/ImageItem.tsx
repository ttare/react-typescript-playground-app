import React from 'react';
import { Card, Icon, Image, Label, List } from 'semantic-ui-react';
import { ImageDetails } from 'types';
import Votes from './Votes';

type Props = {
  canVote: boolean;
  image: ImageDetails;
  onVoteSuccess: (image: ImageDetails) => void;
};

function getImageSrc(image: ImageDetails): string {
  const tags = image.tags.map(tag => tag.name).join(',');
  return `https://loremflickr.com/g/320/240/${tags}/all?id=${image.id}`;
}

const ImageItem: React.FC<Props> = ({ canVote, image, onVoteSuccess }) => {
  const src = getImageSrc(image);
  return (
    <Card>
      <Image src={src} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{image.name}</Card.Header>
        <Card.Meta>
          <span className="date">{image.createdAt}</span>
        </Card.Meta>
        <Card.Description>
          <List bulleted horizontal link>
            {image.tags.map(tag => (
              <Label key={tag.id}>
                <Icon name="hashtag" /> {tag.name}
              </Label>
            ))}
            {image.watchers.map(watcher => (
              <Label image key={watcher.id}>
                <Icon name="at" /> {watcher.name}
              </Label>
            ))}
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Votes canVote={canVote} image={image} onVoteSuccess={onVoteSuccess} />
      </Card.Content>
    </Card>
  );
};

export default ImageItem;
