import React from 'react';
import { Grid, GridEl, SPACES } from '../Grid';
import { Text } from '../Text';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { useNotification } from '../../hooks/useNotification';

import styles from './GeneralInformation.module.scss';
import { Button } from '../Button';
import { GeneralInformationForm } from './GeneralInformationForm';
import { updateCompany } from '../../services/updateCompany';
import { FIELD_LABELS } from '../../consts/company';

export const GeneralInformation = ({ company, onSuccess }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const { pushNotification } = useNotification();

  const handleSubmit = (fields) => {
    setIsSaving(true);

    updateCompany(company._id, fields)
      .then(() => {
        onSuccess?.();
        setIsEditMode(false);
        pushNotification({ theme: 'success', content: 'The company was updated.' });
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        pushNotification({ theme: 'error', content });
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <Grid space={SPACES.S}>
      <GridEl size="12">
        <Grid alignItems="center">
          <GridEl size="fluid">
            <Text fontWeight="600" size="medium" inline>General information</Text>
          </GridEl>
          <GridEl>
            <Grid space={SPACES.S}>
              {isEditMode ? (
                <>
                  <GridEl>
                    <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
                  </GridEl>
                  <GridEl>
                    <Button type="submit" form="general-information-form" loading={isSaving}>Save changes</Button>
                  </GridEl>
                </>
              ) : (
                <GridEl>
                  <Button icon={EditIcon} onClick={() => setIsEditMode(true)}>Edit</Button>
                </GridEl>
              )}
            </Grid>
          </GridEl>
        </Grid>
      </GridEl>
      {isEditMode ? (
        <GeneralInformationForm company={company} onSubmit={handleSubmit} />
      ) : (
        <>
          <GridEl size="12">
            <Text>
              <Text fontWeight="600" inline>Company name:</Text>
              {' '}{company.name}
            </Text>
          </GridEl>
          <GridEl size="12">
            <Grid alignItems="center" space={SPACES.S}>
              <GridEl>
                <Text fontWeight="600" inline>Logo:</Text>
              </GridEl>
              <GridEl>
                {company.logo
                  ? <img src={company.logo} width={100} height={50} className={styles.logo} alt="" />
                  : <div className={styles.placeholder}> -</div>}
              </GridEl>
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Text>
              <Text fontWeight="600" inline>Required fields:</Text>
              {' '}
              {company.requiredFields.map((field) => FIELD_LABELS[field]).join(', ')}
            </Text>
          </GridEl>
          <GridEl size="12">
            <Text>
              <Text fontWeight="600" inline>Can add images:</Text>
              {' '}{company.canAddImages ? 'Yes' : 'No'}
            </Text>
          </GridEl>
          <GridEl size="12">
            <Text>
              <Text fontWeight="600" inline>Allow overlapping orders:</Text>
              {' '}{company.allowOverlappingOrders ? 'Yes' : 'No'}
            </Text>
          </GridEl>
        </>
      )}
    </Grid>
  );
};
