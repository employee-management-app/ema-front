import cx from 'classnames';
import React from 'react';
import { useSwiper } from 'swiper/react';

import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';

import styles from './ImageSlider.module.scss';

export const ArrowButton = ({ direction }) => {
  const swiper = useSwiper();

  const handleClick = React.useCallback(() => {
    if (direction === 'next') {
      swiper.slideNext();
    }

    if (direction === 'prev') {
      swiper.slidePrev();
    }
  }, [direction, swiper]);

  return (
    <button
      type="button"
      aria-label={`${direction} slide`}
      className={cx(styles.arrow, styles[direction])}
      onClick={handleClick}
    >
      <ArrowRight />
    </button>
  );
};
