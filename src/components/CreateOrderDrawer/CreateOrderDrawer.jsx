import React from 'react';

import { Drawer } from '../Drawer';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { CreateOrderForm } from '../OrderForm';

export const CreateOrderDrawer = () => {
  const { isVisible, hideDrawer } = useDrawerVisibility('CreateOrder');

  return (
    <Drawer
      isOpen={isVisible}
      title="Create new task"
      closeOnRouteChange={false}
      onClose={hideDrawer}
    >
      <CreateOrderForm onSuccess={hideDrawer} />
    </Drawer>
  );
};
