import React from 'react';

import { useScreenResize } from './useScreenResize';

const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

export const useBreakpointValue = (values, defaultValue) => {
  const [clientWidth, setClientWidth] = React.useState(0);

  const handleResize = React.useCallback(() => {
    setClientWidth(document.documentElement.clientWidth);
  }, []);

  useScreenResize(handleResize);

  React.useEffect(handleResize, [handleResize]);

  return React.useMemo(() => {
    const breakpoints = Object.keys(values);

    const breakpoint = [...breakpoints]
      .sort((a, b) => BREAKPOINTS[a] - BREAKPOINTS[b])
      .find((bp, index, arr) => (
        BREAKPOINTS[bp] <= clientWidth && (index + 1 === arr.length || BREAKPOINTS[arr[index + 1]] > clientWidth)
      ));

    return breakpoint
      ? values[breakpoint]
      : defaultValue;
  }, [values, defaultValue, clientWidth]);
};
