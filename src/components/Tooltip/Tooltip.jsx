import React from 'react';
import { Arrow, useHover, useLayer } from 'react-laag';

import styles from './Tooltip.module.scss';

export const Tooltip = ({
  children,
  content,
  visible,
  placement = 'top-center',
}) => {
  const [isOver, hoverProps] = useHover();

  const isOpen = visible ?? isOver;

  const { arrowProps, triggerProps, layerProps, renderLayer } = useLayer({
    auto: true,
    isOpen,
    overflowContainer: true,
    placement,
    triggerOffset: 10,
  });

  const trigger = React.useMemo(() => (
    React.cloneElement(children, {
      ...triggerProps,
      ...hoverProps,
    })
  ), [children, hoverProps, triggerProps]);

  return (
    <>
      {trigger}
      {isOpen && renderLayer(
        <div
          {...layerProps}
          className={styles.tooltip}
        >
          {content}
          <Arrow {...arrowProps} {...hoverProps} backgroundColor="rgba(0, 0, 0, 0.8)" />
        </div>
      )}
    </>
  );
};
