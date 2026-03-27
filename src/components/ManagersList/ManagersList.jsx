import React from 'react';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Button } from '../Button';
import { Table } from '../Table';
import { Status } from '../Status';

import { Grid, GridEl } from '../Grid';
import { ManagerActions } from './ManagerActions';

import styles from './ManagerActions.module.scss';

export const ManagersList = ({ managers }) => {
  const columns = [
    {
      title: 'Name',
      key: ['name', 'surname'],
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Phone',
      key: 'phone',
    },
    {
      title: 'Status',
      key: 'isActive',
      render: (isActive) => (
        isActive
          ? <Status status="success">Active</Status>
          : <Status status="error">Inactive</Status>
      ),
    },
    {
      title: 'Verified',
      key: 'isVerified',
      render: (isVerified) => (
        isVerified
          ? <Status status="success">Yes</Status>
          : <Status status="error">No</Status>
      ),
    },
    {
      title: 'Admin',
      key: 'role',
      render: (role) => (
        role === 'owner'
          ? <Status status="success">Yes</Status>
          : <Status status="error">No</Status>
      ),
    },
    {
      title: 'Actions',
      key: ['phone', 'email'],
      render: ([phone, email], index) => (
        <div className={styles.actions}>
          <Button href={`tel:${phone}`} icon={PhoneIcon} />
          <Button href={`mailto:${email}`} icon={MailIcon} />
          <ManagerActions manager={managers[index]} />
        </div>
      ),
    },
  ];

  const { showModal } = useModalVisibility('AddManager');

  return (
    <Grid>
      {managers.length > 0 && (
        <GridEl size="12">
          <Table
            columns={columns}
            data={managers}
          />
        </GridEl>
      )}
      <GridEl size="12">
        <Button icon={PlusIcon} onClick={showModal}>Add manager</Button>
      </GridEl>
    </Grid>
  );
};
