import React from 'react';

import { useLatest } from './useLatest';

export const useDebouncedCallback = (callback, wait = 300, deps = []) => {
  const latestCallback = useLatest(callback);
  const timeout = React.useRef();

  const cleanup = () => {
    if (!timeout.current) {
      return;
    }

    clearTimeout(timeout.current);
    Object.assign(timeout, { current: null });
  };

  React.useEffect(() => cleanup, [wait, latestCallback]);

  return React.useCallback((...args) => {
    cleanup();

    Object.assign(timeout, {
      current: setTimeout(() => {
        latestCallback.current.apply(null, args);
      }, wait),
    });
  }, [wait, latestCallback, ...deps]);
};
