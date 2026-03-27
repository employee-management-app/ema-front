import React from 'react';

import styles from './Tabs.module.scss';

export const TabsContext = React.createContext({
  active: 0,
  setActive: () => {},
});

export const Tabs = ({ children, onChange, ...props }) => {
  const [active, setActive] = React.useState(props.active);

  React.useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  const handleSetActive = React.useCallback((newActive) => {
    setActive(newActive);

    if (newActive !== active) {
      onChange(newActive);
    }
  }, [active, onChange]);

  return (
    <div className={styles.tabs}>
      <TabsContext.Provider value={{ active, setActive: handleSetActive }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};
