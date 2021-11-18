import React, { useState } from 'react';
import { Button, Card, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AddImage, AddImageValues, ImageDetails } from 'types';
import { FormItem } from 'components/shared';
import useApi from 'hooks/useApi';
import { AlbumService } from 'services';
import { TEMPLATES } from 'templates';
import SuggestionField from './SuggestionField';

type Props = {
  albumId: number;
  onImageAdd: (image: ImageDetails) => void;
};

const addAlbumSchema = Yup.object().shape<AddImageValues>({
  name: Yup.string().required(TEMPLATES.REQUIRED),
  tags: Yup.array()
    .required(TEMPLATES.REQUIRED)
    .min(1)
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.mixed().required(),
        user: Yup.mixed().notRequired(),
      })
    ),
});

const AddImageModal: React.FC<Props> = ({ albumId, onImageAdd }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { isLoading, fetch } = useApi<ImageDetails>(AlbumService.addImage, { skipOnLoad: true });

  const save = (values: AddImageValues) => {
    let image = { name: values.name, tags: [], watchers: [] } as AddImage;
    image = values.tags.reduce((addImage, tag) => {
      if (tag.user) {
        addImage.watchers.push(tag.value);
      } else {
        addImage.tags.push(tag.label);
      }
      return addImage;
    }, image);

    fetch(albumId, image).then(response => {
      setIsOpen(false);
      onImageAdd(response.data);
    });
  };

  const initialValues = {
    name: '',
    tags: [],
  } as AddImageValues;

  return (
    <>
      <Card as="div" onClick={() => setIsOpen(true)}>
        <Segment placeholder style={{ height: '100%', border: 'none' }}>
          <Header icon>
            <Icon name="file image outline" />
          </Header>
          <Button primary>Add Image</Button>
        </Segment>
      </Card>
      <Modal onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} open={isOpen}>
        <Formik initialValues={initialValues} isInitialValid={false} validationSchema={addAlbumSchema} onSubmit={save}>
          {({ isValid, handleSubmit }): JSX.Element => (
            <React.Fragment>
              <Modal.Header>Add Image</Modal.Header>
              <Modal.Content>
                <div>
                  <FormItem id="name" name="name" placeholder="Album name" />
                  <SuggestionField name="tags" />
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
    </>
  );
};

export default AddImageModal;
