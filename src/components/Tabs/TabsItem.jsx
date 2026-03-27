import React from 'react';

import { TabsItemsContext } from './TabsItems';

export const TabsItem = ({ children, ...props }) => (
  <TabsItemsContext.Consumer>
    {({ active }) => ((active === props.for) ? children : null)}
  </TabsItemsContext.Consumer>
);
