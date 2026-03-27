import cx from 'classnames';
import React from 'react';
import { useNotification } from '../../hooks/useNotification';

import styles from './UploadInput.module.scss';

export const UploadInput = ({ accept = 'image/*', placeholder = 'Upload file', invalid = false, onChange }) => {
  const [file, setFile] = React.useState(null);
  const { pushNotification } = useNotification();

  const handleChange = (e) => {
    const uploadFile = e.target.files[0];

    if (uploadFile.size >= 10485760) {
      pushNotification({
        theme: 'warning',
        content: 'File size is too large. Please upload a file smaller than 10MB.',
      });

      return;
    }

    setFile(uploadFile);
    onChange(uploadFile);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFile(null);
    onChange(null);
  };

  const previewUrl = React.useMemo(() => (
    file
      ? URL.createObjectURL(file)
      : null
  ), [file]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cx(styles.label, { [styles.invalid]: invalid })}>
        <input
          type="file"
          accept={accept}
          className={styles.input}
          onChange={handleChange}
        />
        {file
          ? <span className={styles.value}>{file.name}</span>
          : <span className={styles.placeholder}>{placeholder}</span>}
        {file && (
          <button
            type="button"
            aria-label="Clear"
            className={styles.clear}
            onClick={handleClear}
          />
        )}
      </label>
      {previewUrl && (
        <img src={previewUrl} className={styles.preview} width={100} height={50} alt="Logo preview" />
      )}
    </>
  );
};
