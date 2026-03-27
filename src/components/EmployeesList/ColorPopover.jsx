import React from 'react';
import { HexColorPicker } from 'react-colorful';

import { updateEmployee } from '../../services/updateEmployee';
import { useNotification } from '../../hooks/useNotification';
import { Popover } from '../Popover';

import styles from './EmployeesList.module.scss';

export const ColorPopover = ({ employeeId, ...rest }) => {
  const [color, setColor] = React.useState(rest.color);
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const { pushNotification } = useNotification();

  const handleClose = React.useCallback(() => {
    setIsPopoverVisible(false);

    if (rest.color === color) {
      return;
    }

    updateEmployee(employeeId, { color })
      .then((data) => {
        setColor(data.color);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      });
  }, [color, employeeId, pushNotification, rest.color]);

  return (
    <Popover
      visible={isPopoverVisible}
      content={<HexColorPicker color={color} className={styles.colorPicker} onChange={setColor} />}
      onVisibleChange={handleClose}
    >
      <button
        type="button"
        aria-label="Choose color"
        className={styles.colorBox}
        style={{ color }}
        onClick={() => setIsPopoverVisible(true)}
      />
    </Popover>
  );
};
