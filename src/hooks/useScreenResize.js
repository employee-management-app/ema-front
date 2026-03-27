import * as React from 'react';

export const useScreenResize = (callback) => {
  React.useEffect(() => {
    const handleResize = (event) => callback(event);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [callback]);
};
