import React, { useState } from 'react';
import { Button, Card, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AddAlbum, Album, AlbumItem } from 'types';
import { FormItem } from 'components/shared';
import useApi from 'hooks/useApi';
import { AlbumService } from 'services';
import { TEMPLATES } from 'templates';

type Props = {
  onSuccess: (album: AlbumItem) => void;
};

const addAlbumSchema = Yup.object().shape<AddAlbum>({
  name: Yup.string().required(TEMPLATES.REQUIRED),
});

const AddAlbumModal: React.FC<Props> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { isLoading, fetch } = useApi<Album>(AlbumService.create, { skipOnLoad: true });

  const save = (album: AddAlbum) => {
    fetch(album).then(response => {
      setIsOpen(false);
      onSuccess({
        ...response.data,
        images: 0,
      });
    });
  };

  const trigger = (
    <Card as="div">
      <Segment placeholder style={{ height: '100%', border: 'none' }}>
        <Header icon>
          <Icon name="file archive outline" />
        </Header>
        <Button primary>Add Album</Button>
      </Segment>
    </Card>
  );

  return (
    <Modal onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} open={isOpen} trigger={trigger}>
      <Formik
        initialValues={{
          name: '',
        }}
        validateOnMount
        validationSchema={addAlbumSchema}
        onSubmit={save}>
        {({ isValid, handleSubmit }): JSX.Element => (
          <React.Fragment>
            <Modal.Header>Add album</Modal.Header>
            <Modal.Content>
              <div>
                <FormItem id="name" name="name" placeholder="Album name" />
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button
                loading={isLoading}
                content="Save"
                labelPosition="right"
                icon="checkmark"
                onClick={() => handleSubmit()}
                disabled={!isValid}
                positive
              />
            </Modal.Actions>
          </React.Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAlbumModal;
