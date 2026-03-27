import React from 'react';

import { Tooltip } from '../Tooltip';

export const HelpIcon = (props) => (
  <Tooltip
    content="Text"
  >
    <props.icon />
  </Tooltip>
);
