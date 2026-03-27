import cx from 'classnames';
import React from 'react';

import axios from '../../services/axios';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

import styles from './FilePicker.module.scss';
import { ImageSlider } from '../ImageSlider';
import { useNotification } from '../../hooks/useNotification';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/da0teanjx/image/upload',
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
};

export const FilePicker = ({ value = [], uploadUrl }) => {
  const [files, setFiles] = React.useState(value);
  const [previewIndex, setPreviewIndex] = React.useState(null);

  const { pushNotification } = useNotification();

  const handleChange = React.useCallback((e) => {
    const uploadedFiles = JSON.parse(JSON.stringify(files));

    const eventFiles = [...e.target.files];
    const filteredFiles = eventFiles.filter((file) => file.size < 10485760);
    const tooLargeFiles = eventFiles.filter((file) => file.size >= 10485760);

    tooLargeFiles.forEach((file) => {
      pushNotification({
        theme: 'warning',
        content: `File ${file.name} is too large. Please upload a file smaller than 10MB.`,
      });
    });

    filteredFiles.forEach((file) => {
      const url = URL.createObjectURL(file);

      uploadedFiles.push({
        id: url,
        url,
        isLoading: true,
      });

      setFiles(uploadedFiles);

      uploadToCloudinary(file).then((uploadedFile) => {
        const fileData = {
          id: uploadedFile.public_id,
          format: uploadedFile.format,
          width: uploadedFile.width,
          height: uploadedFile.height,
          url: uploadedFile.secure_url,
          creationDate: uploadedFile.created_at,
        };

        axios.post(`${process.env.REACT_APP_API_URL}/${uploadUrl}`, fileData)
          .then(({ data }) => {
            const index = uploadedFiles.findIndex((uploaded) => uploaded.id === url);

            setFiles(
              Object.assign([], uploadedFiles, {
                [index]: {
                  ...data,
                  isLoading: false,
                },
              })
            );

            uploadedFiles[index] = {
              ...data,
              isLoading: false,
            };
          })
          .catch(() => {
            const index = uploadedFiles.findIndex((uploaded) => uploaded.id === url);
            setFiles(uploadedFiles.filter((uploaded) => uploaded.id !== url));
            uploadedFiles.splice(index, 1);
            // todo: push notification
          });
      }).catch(() => {
        const index = uploadedFiles.findIndex((uploaded) => uploaded.id === url);
        setFiles(uploadedFiles.filter((uploaded) => uploaded.id !== url));
        uploadedFiles.splice(index, 1);
        // todo: push notification
      });
    });
  }, [files, uploadUrl, pushNotification]);

  const removeFile = React.useCallback((id) => () => {
    const index = files.findIndex((uploaded) => uploaded.id === id);

    setFiles(
      Object.assign([], files, {
        [index]: {
          ...files[index],
          isLoading: true,
        },
      })
    );

    axios.delete(`${process.env.REACT_APP_API_URL}/${uploadUrl}/${id}`)
      .then(() => {
        setFiles(files.filter((uploaded) => uploaded.id !== id));
      })
      .catch(() => {
        // todo: push notification
      });
  }, [uploadUrl, files]);

  const handleClick = React.useCallback((index) => () => {
    setPreviewIndex(index);
  }, []);

  const handlePreviewClose = React.useCallback(() => {
    setPreviewIndex(null);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {files.map(({ url, isLoading, id }, index) => (
          <div key={url} className={cx(styles.photo, { [styles.loading]: isLoading })}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <img src={url} alt="" onClick={handleClick(index)} />
            {isLoading && <SpinnerIcon />}
            {!isLoading && (
              <button
                type="button"
                aria-label="Remove file"
                className={styles.actionButton}
                onClick={removeFile(id)}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        ))}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.input}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          <UploadIcon />
          Add photo
        </label>
      </div>
      {(previewIndex !== null) && (
        <ImageSlider
          active={previewIndex}
          items={files}
          onClose={handlePreviewClose}
        />
      )}
    </>
  );
};
