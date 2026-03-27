import cx from 'classnames';
import * as React from 'react';
import { useHover, useLayer } from 'react-laag';

import styles from './Popover.module.scss';

const HOVER_DELAY = 100;
const DEFAULT_TRIGGER_OFFSET = 4;
const DEFAULT_POSSIBLE_PLACEMENTS = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
];

export const Popover = ({
  children,
  className,
  content,
  overflowContainer,
  placement = DEFAULT_POSSIBLE_PLACEMENTS[0],
  possiblePlacements = DEFAULT_POSSIBLE_PLACEMENTS,
  snap = false,
  triggerOffset = DEFAULT_TRIGGER_OFFSET,
  visible,
  onVisibleChange,
}) => {
  const [isOver, hoverProps] = useHover({
    delayEnter: HOVER_DELAY,
    delayLeave: HOVER_DELAY,
    hideOnScroll: false,
  });
  const isOpen = visible ?? isOver;

  const handleClose = React.useCallback(() => {
    onVisibleChange?.(false);
  }, [onVisibleChange]);

  const handleDisappear = React.useCallback((type) => {
    if (type === 'full') {
      handleClose();
    }
  }, [handleClose]);

  const { layerProps, triggerProps, layerSide, renderLayer } = useLayer({
    auto: true,
    isOpen,
    onDisappear: handleDisappear,
    onOutsideClick: handleClose,
    onParentClose: handleClose,
    overflowContainer,
    placement,
    possiblePlacements,
    snap,
    triggerOffset,
  });

  const classNames = cx(
    styles.wrapper,
    className,
    {
      [styles.closed]: !isOpen,
      [styles.top]: layerSide === 'top',
      [styles.bottom]: layerSide === 'bottom',
    },
  );

  return (
    <>
      <span className={cx(styles.trigger, 'popoverTrigger')} {...triggerProps} {...hoverProps}>
        {children}
      </span>
      {isOpen && renderLayer(
        <div
          {...layerProps}
          {...hoverProps}
          className={classNames}
        >
          {content}
        </div>
      )}
    </>
  );
};
