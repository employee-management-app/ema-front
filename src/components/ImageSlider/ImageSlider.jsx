import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg';

import { ArrowButton } from './ArrowButton';
import styles from './ImageSlider.module.scss';

export const ImageSlider = ({ items, active = 0, onChange, onClose }) => {
  const [activeIndex, setActiveIndex] = React.useState(active);

  const handleChange = React.useCallback((event) => {
    setActiveIndex(event.activeIndex);
    onChange?.(event.activeIndex);
  }, [onChange]);

  return (
    <div className={styles.overlay}>
      <Swiper
        initialSlide={active}
        slidesPerView={1}
        onSlideChange={handleChange}
      >
        {items.map(({ url, width, height }) => (
          <SwiperSlide key={url}>
            <div className={styles.imageWrapper}>
              <img src={url} width={width} height={height} alt="" />
            </div>
          </SwiperSlide>
        ))}
        {activeIndex < items.length - 1 && <ArrowButton direction="next" />}
        {activeIndex > 0 && <ArrowButton direction="prev" />}
      </Swiper>
      <div className={styles.buttons}>
        <a
          type="button"
          href={items[activeIndex].url}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.button}
        >
          <DownloadIcon />
        </a>
        <button
          type="button"
          aria-label="Close preview"
          className={styles.button}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
