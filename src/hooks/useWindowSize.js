import React from 'react';

export const useWindowSize = () => {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};
