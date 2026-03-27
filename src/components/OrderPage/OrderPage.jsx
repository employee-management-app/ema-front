import React from 'react';
import { format } from 'date-fns';

import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';

import { useAuth } from '../../hooks/useAuth';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { OrderButtons } from '../OrderButtons';
import { GoogleMap } from '../GoogleMap';
import { Grid, GridEl, SPACES } from '../Grid';
import { Text } from '../Text';
import { Button } from '../Button';
import { FilePicker } from '../FilePicker';
import { RouteLink } from '../RouteLink';
import { OrderActions } from '../OrderActions';
import { OrderPriority } from '../OrderPriority';
import { Container } from '../Container';

import { ManagerMessageModal } from './ManagerMessageModal';
import { EmployeeMessageModal } from './EmployeeMessageModal';
import styles from './OrderPage.module.scss';
import { EmployeeNotesModal } from './EmployeeNotesModal';

export const OrderPage = ({ order }) => {
  const {
    _id: id,
    type,
    name,
    surname,
    priority,
    phone,
    email,
    stage,
    message,
    employeeMessage,
    managerMessage,
    employeeNotes,
    files = [],
    address: { street, city, code, house, flat, lat, lng },
  } = order;

  const { isEmployee, company } = useAuth();
  const { showDrawer: showEditDrawer } = useDrawerVisibility('EditOrder');
  const { showModal: showDeleteModal } = useModalVisibility('DeleteOrder');
  const { showDrawer: showDuplicateDrawer } = useDrawerVisibility('DuplicateOrder');
  const { showModal: showCompleteModal } = useModalVisibility('CompleteOrder');
  const { showModal: showManagerMessageModal } = useModalVisibility('ManagerMessageModal');
  const { showModal: showEmployeeMessageModal } = useModalVisibility('EmployeeMessageModal');
  const { showModal: showEmployeeNotesModal } = useModalVisibility('EmployeeNotesModal');

  const isCompleted = order.status === 'completed';

  return (
    <>
      <Container className={styles.page}>
        <Grid space={SPACES.L}>
          <GridEl size="12">
            <Grid space={SPACES.S} alignItems="flex-start">
              <GridEl size="fluid">
                <OrderPriority id={id} priority={priority} disabled={isCompleted} />
              </GridEl>
              <GridEl size="auto">
                <Grid space={SPACES.S} alignItems="center">
                  <GridEl size="auto">
                    <div className={styles.date}>
                      {format(new Date(order.creationDate), 'dd.MM.yyyy HH:mm')}
                    </div>
                  </GridEl>
                  <GridEl size={{ xs: 'auto', lg: 0 }}>
                    <OrderActions order={order} />
                  </GridEl>
                </Grid>
              </GridEl>
            </Grid>
            <Grid space={SPACES.S} alignItems="center">
              <GridEl size={{ xs: 12, lg: 'fluid' }}>
                <Text size={{ xs: 'large', md: 'h1' }} fontWeight="700">{stage}</Text>
              </GridEl>
              <GridEl size={{ xs: 0, lg: 'auto' }}>
                <Grid space={SPACES.S} justifyContent="flex-end" alignItems="center">
                  {!isCompleted && (
                    <GridEl size={{ xs: 0, lg: 'auto' }}>
                      <Button
                        icon={DoneIcon}
                        theme="success"
                        onClick={showCompleteModal}
                      >
                        Complete
                      </Button>
                    </GridEl>
                  )}
                  {!isEmployee && (
                    <>
                      <GridEl size={{ xs: 0, lg: 'auto' }}>
                        <Button
                          icon={TrashIcon}
                          theme="danger"
                          onClick={showDeleteModal}
                        >
                          Remove
                        </Button>
                      </GridEl>
                      <GridEl size={{ xs: 0, lg: 'auto' }}>
                        <Button
                          icon={CopyIcon}
                          onClick={showDuplicateDrawer}
                        >
                          Duplicate
                        </Button>
                      </GridEl>
                    </>
                  )}
                  {(!isCompleted && !isEmployee) && (
                    <GridEl size={{ xs: 0, lg: 'auto' }}>
                      <Button
                        icon={EditIcon}
                        onClick={showEditDrawer}
                      >
                        Edit
                      </Button>
                    </GridEl>
                  )}
                </Grid>
              </GridEl>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }}>{type}</Text>
              </GridEl>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }}>
                  {street || <Text italic inline>No street</Text>} {house}{flat && `, lokal ${flat}`}<br />
                  {code} {city}
                </Text>
                <RouteLink href={`https://maps.google.com/?q=${lat},${lng}`} />
              </GridEl>
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Grid space={SPACES.S}>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                  {(name || surname) ? `${name} ${surname}` : 'Client'}
                </Text>
              </GridEl>
              <GridEl size={{ xs: 'fluid', sm: 'auto' }}>
                <Button href={`tel:${phone}`} disabled={!phone} icon={PhoneIcon} width="full">{phone}</Button>
              </GridEl>
              <GridEl size="auto">
                <Button href={`sms:${phone}`} disabled={!phone} icon={CommentIcon} width="full" />
              </GridEl>
              <GridEl size="auto">
                <Button href={`mailto:${email}`} disabled={!email} icon={MailIcon} width="full" />
              </GridEl>
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Grid space={SPACES.S}>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">Assignee</Text>
              </GridEl>
              <GridEl size="12">
                <OrderButtons size="auto" order={{ ...order, disabled: isCompleted }} />
              </GridEl>
            </Grid>
          </GridEl>
          {!isEmployee && message && (
            <GridEl size="12">
              <Grid space={SPACES.S}>
                <GridEl size="12">
                  <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                    Customer message
                  </Text>
                </GridEl>
                <GridEl size="12">
                  <Text size={{ xs: 'base', md: 'medium' }} italic={!message}>
                    {message || 'Empty'}
                  </Text>
                </GridEl>
              </Grid>
            </GridEl>
          )}
          <GridEl size="12">
            <Grid space={SPACES.S}>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                  {!isEmployee
                    ? (
                      <>
                        Description for employees
                        {!isCompleted && (
                          <button type="button" className={styles.editButton} onClick={showEmployeeMessageModal}>
                            <EditIcon />
                          </button>
                        )}
                      </>
                    )
                    : 'Description'}
                </Text>
              </GridEl>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} italic={!employeeMessage}>
                  {employeeMessage || 'Empty'}
                </Text>
              </GridEl>
            </Grid>
          </GridEl>
          {!isEmployee && (
            <GridEl size="12">
              <Grid space={SPACES.S}>
                <GridEl size="12">
                  <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                    Description for managers
                    {!isCompleted && (
                      <button type="button" className={styles.editButton} onClick={showManagerMessageModal}>
                        <EditIcon />
                      </button>
                    )}
                  </Text>
                </GridEl>
                <GridEl size="12">
                  <Text size={{ xs: 'base', md: 'medium' }} italic={!managerMessage}>
                    {managerMessage || 'Empty'}
                  </Text>
                </GridEl>
              </Grid>
            </GridEl>
          )}
          <GridEl size="12">
            <Grid space={SPACES.S}>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                  {isEmployee
                    ? (
                      <>
                        Notes
                        {!isCompleted && (
                          <button type="button" className={styles.editButton} onClick={showEmployeeNotesModal}>
                            <EditIcon />
                          </button>
                        )}
                      </>
                    )
                    : 'Notes'}
                </Text>
              </GridEl>
              <GridEl size="12">
                <Text size={{ xs: 'base', md: 'medium' }} italic={!employeeNotes}>
                  {employeeNotes || 'Empty'}
                </Text>
              </GridEl>
            </Grid>
          </GridEl>
          {company.canAddImages && (
            <GridEl size="12">
              <Grid space={SPACES.S}>
                <GridEl size="12">
                  <Text size={{ xs: 'base', md: 'medium' }} fontWeight="600">
                    Photos
                  </Text>
                </GridEl>
                <GridEl size="12">
                  <FilePicker
                    value={files}
                    uploadUrl={`order/${id}/file`}
                  />
                </GridEl>
              </Grid>
            </GridEl>
          )}
        </Grid>
      </Container>
      <div className={styles.map}>
        <GoogleMap
          markers={[{
            id,
            color: '#1352A1',
            lat,
            lng,
          }]}
        />
      </div>
      <ManagerMessageModal orderId={id} message={managerMessage} />
      <EmployeeMessageModal orderId={id} message={employeeMessage} />
      <EmployeeNotesModal orderId={id} notes={employeeNotes} />
    </>
  );
};
