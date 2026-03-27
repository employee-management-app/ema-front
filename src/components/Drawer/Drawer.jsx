import cx from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Text } from '../Text';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as CollapseIcon } from '../../assets/icons/collapse.svg';
import { ReactComponent as ExpandIcon } from '../../assets/icons/expand.svg';
import styles from './Drawer.module.scss';
import { Grid, GridEl, SPACES } from '../Grid';

export const Drawer = ({ children, title, size, onClose, closeOnRouteChange = true, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    if (closeOnRouteChange) {
      setIsOpen(false);
      onClose?.();
    } else {
      setIsCollapsed(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
    setIsCollapsed(false);
  }, [props.isOpen]);

  const closeDrawer = React.useCallback(() => {
    setIsOpen(false);
    setIsCollapsed(false);
    onClose?.();
  }, [onClose]);

  const toggleDrawer = React.useCallback(() => {
    setIsCollapsed((collapsed) => !collapsed);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cx(styles.drawer, { [styles.collapsed]: isCollapsed, [styles[size]]: size })}
          initial={{ x: '100%' }}
          transition={{ duration: 0.5, type: 'spring' }}
          animate={{ x: 0, top: isCollapsed ? 'calc(100% - 70px)' : 0 }}
          exit={{ x: '100%' }}
        >
          <Grid>
            <GridEl size={12}>
              <Grid space={SPACES.S} alignItems="center">
                <GridEl size="fluid">
                  <Text size={{ xs: 'large', md: 'h3' }} fontWeight={700}>{title}</Text>
                </GridEl>
                <GridEl>
                  <button type="button" className={styles.closeButton} onClick={toggleDrawer}>
                    {isCollapsed
                      ? <ExpandIcon />
                      : <CollapseIcon />}
                  </button>
                </GridEl>
                <GridEl>
                  <button type="button" className={styles.closeButton} onClick={closeDrawer}>
                    <CloseIcon />
                  </button>
                </GridEl>
              </Grid>
            </GridEl>
            <GridEl size={12}>
              {children}
            </GridEl>
          </Grid>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
