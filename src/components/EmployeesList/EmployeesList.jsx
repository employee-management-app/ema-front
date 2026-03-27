import React from 'react';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Button } from '../Button';
import { Table } from '../Table';

import { ColorPopover } from './ColorPopover';
import styles from './EmployeesList.module.scss';
import { EmployeeActions } from './EmployeeActions';
import { Grid, GridEl } from '../Grid';
import { Status } from '../Status';

export const EmployeesList = ({ employees }) => {
  const columns = [
    {
      title: 'Name',
      key: ['name', 'surname'],
    },
    {
      title: 'Color',
      key: ['color', '_id'],
      render: ([color, _id]) => (
        <ColorPopover color={color} employeeId={_id} />
      ),
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
      title: 'Actions',
      key: ['phone', 'email', 'role'],
      render: ([phone, email, role], index) => (
        <div className={styles.actions}>
          <Button href={`tel:${phone}`} icon={PhoneIcon} />
          <Button href={`mailto:${email}`} icon={MailIcon} />
          {role === 'employee' && <EmployeeActions employee={employees[index]} />}
        </div>
      ),
    },
  ];

  const { showModal } = useModalVisibility('AddEmployee');

  return (
    <Grid>
      {employees.length > 0 && (
        <GridEl size="12">
          <Table
            columns={columns}
            data={employees}
          />
        </GridEl>
      )}
      <GridEl size="12">
        <Button icon={PlusIcon} onClick={showModal}>Add employee</Button>
      </GridEl>
    </Grid>
  );
};
