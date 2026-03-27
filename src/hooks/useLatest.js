import React from 'react';

export const useLatest = (current) => {
  const latestValue = React.useRef(current);

  React.useEffect(() => {
    Object.assign(latestValue, { current });
  });

  return latestValue;
};
