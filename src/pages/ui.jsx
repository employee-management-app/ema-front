import React from 'react';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { DateTimePicker } from '../components/DateTimePicker';
import { Modal } from '../components/Modal';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';
import { useNotification } from '../hooks/useNotification';

export const UI = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { pushNotification } = useNotification();

  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onModalClose = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h1">Title H1</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Title H2</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="h3">Title H3</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="big">Text big</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="large">Text large</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="medium">Text medium</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="base">Text base</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="small">Text small</Text>
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Buttons</Text>
        </GridEl>
        <GridEl size="12">
          <Grid>
            <GridEl>
              <Button icon={CommentIcon} />
            </GridEl>
            <GridEl>
              <Button>
                Default button
              </Button>
            </GridEl>
            <GridEl>
              <Button icon={CommentIcon}>
                Button with icon
              </Button>
            </GridEl>
            <GridEl size="fluid">
              <Button width="full">
                Button full width
              </Button>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Grid>
            <GridEl>
              <Button size="medium">
                Button size medium
              </Button>
            </GridEl>
            <GridEl size="fluid">
              <Button width="full" size="medium">
                Button full width size medium
              </Button>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl>
          <Button theme="success">
            Success button
          </Button>
        </GridEl>
        <GridEl>
          <Button theme="danger">
            Danger button
          </Button>
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Inputs</Text>
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Default input" />
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Invalid input" invalid />
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Input with icon" icon={CommentIcon} />
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Input size medium" size="medium" />
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Invalid input size medium" size="medium" invalid />
        </GridEl>
        <GridEl size="4">
          <Input placeholder="Input size medium with icon" size="medium" icon={CommentIcon} />
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Checkbox</Text>
        </GridEl>
        <GridEl>
          <Checkbox>
            Default checkbox
          </Checkbox>
        </GridEl>
        <GridEl>
          <Checkbox invalid>
            Invalid checkbox
          </Checkbox>
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Date-time picker</Text>
        </GridEl>
        <GridEl size="4">
          <DateTimePicker
            size="medium"
            placeholder="Select date"
          />
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Modal</Text>
        </GridEl>
        <GridEl>
          <Button onClick={openModal}>
            Open modal
          </Button>
        </GridEl>
        <GridEl size="12">
          <Text size="h2">Notifications</Text>
        </GridEl>
        <GridEl>
          <Button onClick={() => pushNotification({ theme: 'info', content: 'Info notification' })}>
            Push info notification
          </Button>
        </GridEl>
        <GridEl>
          <Button onClick={() => pushNotification({ theme: 'success', content: 'Success notification' })}>
            Push success notification
          </Button>
        </GridEl>
        <GridEl>
          <Button onClick={() => pushNotification({ theme: 'error', content: 'Error notification' })}>
            Push error notification
          </Button>
        </GridEl>
        <GridEl>
          <Button onClick={() => pushNotification({ theme: 'warning', content: 'Warning notification' })}>
            Push warning notification
          </Button>
        </GridEl>
      </Grid>
      <Modal
        title="Modal title"
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        {/* eslint-disable-next-line max-len */}
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
      </Modal>
    </Container>
  );
};
