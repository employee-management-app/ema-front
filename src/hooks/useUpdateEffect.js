import React from 'react';

export const useUpdateEffect = (effect, deps) => {
  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return undefined;
    }

    return effect();
  }, deps);
};
