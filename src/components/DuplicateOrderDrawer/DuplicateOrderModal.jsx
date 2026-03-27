import React from 'react';
import { useSelector } from 'react-redux';

import { getOrderToDuplicate } from '../../store';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { Drawer } from '../Drawer';
import { DuplicateOrderForm } from '../OrderForm';

export const DuplicateOrderDrawer = () => {
  const { isVisible, hideDrawer } = useDrawerVisibility('DuplicateOrder');
  const order = useSelector(getOrderToDuplicate);

  return (
    <Drawer
      isOpen={isVisible}
      title="Duplicate task"
      onClose={hideDrawer}
    >
      <DuplicateOrderForm values={order} onSuccess={hideDrawer} />
    </Drawer>
  );
};
