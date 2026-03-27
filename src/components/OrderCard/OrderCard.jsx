import cx from 'classnames';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';

import { useAuth } from '../../hooks/useAuth';
import { OrderButtons } from '../OrderButtons';
import { Card } from '../Card';
import { Text } from '../Text';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';
import { RouteLink } from '../RouteLink';
import { OrderActions } from '../OrderActions';
import { OrderPriority } from '../OrderPriority';

import styles from './OrderCard.module.scss';

export const OrderCard = (props) => {
  const {
    _id,
    address,
    creationDate,
    disabled,
    email,
    message,
    employeeMessage,
    managerMessage,
    name,
    onClick,
    phone,
    priority,
    surname,
    stage,
    type,
  } = props;

  const { isEmployee } = useAuth();

  const handleClick = React.useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  const { code, city, street, house, flat, lat, lng } = address;

  const shortDescription = React.useMemo(() => (
    !isEmployee
      ? managerMessage || message || employeeMessage
      : employeeMessage
  ), [employeeMessage, isEmployee, managerMessage, message]);

  return (
    <Card className={cx(styles.card, { [styles.disabled]: disabled })}>
      <div className={styles.header}>
        <OrderPriority id={_id} priority={priority} disabled={disabled} />
        <OrderActions order={props} className={styles.actions} />
        <div className={styles.date}>{formatDistanceToNow(new Date(creationDate))} ago</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <div className={styles.body} role="link" onClick={handleClick}>
        <Link to={`/orders/${_id}`} className={styles.stage}>
          {stage}
        </Link>
        <Text>{type}</Text>
        <hr className={cx(styles.hr, styles.small)} />
        <Text className={styles.address}>
          {street || <Text italic inline>No street</Text>} {house}{flat ? `, lokal ${flat}` : ''}<br />
          {code} {city}
        </Text>
        <Grid space={SPACES.S}>
          <GridEl size="fluid">
            <RouteLink href={`https://maps.google.com/?q=${lat},${lng}`} />
          </GridEl>
          {isEmployee && phone && (
            <>
              <GridEl size={{ xs: 'auto', md: 0 }}>
                <RouteLink href={`sms:${phone}`} label="Message" icon={CommentIcon} />
              </GridEl>
              <GridEl size={{ xs: 'auto', md: 0 }}>
                <RouteLink href={`tel:${phone}`} label="Phone" icon={PhoneIcon} />
              </GridEl>
            </>
          )}
        </Grid>
        <hr className={styles.hr} />
        <div className={styles.footer}>
          {(name || surname || phone || email || shortDescription) && (
            <Grid space={SPACES.S}>
              {(name || surname || shortDescription) && (
                <GridEl size="12">
                  {(name || surname) && <Text>{name} {surname}</Text>}
                  {shortDescription && <Text nowrap>{shortDescription}</Text>}
                </GridEl>
              )}
              {phone && (
                <>
                  <GridEl size={{ md: 12, xl: email ? 8 : 10 }}>
                    <Button href={`tel:${phone}`} icon={PhoneIcon} width="full">{phone}</Button>
                  </GridEl>
                  <GridEl size={{ md: email ? 6 : 12, xl: 2 }}>
                    <Button href={`sms:${phone}`} icon={CommentIcon} width="full" />
                  </GridEl>
                </>
              )}
              {email && (
                <GridEl size={{ md: phone ? 6 : 12, xl: phone ? 2 : 12 }}>
                  <Button href={`mailto:${email}`} icon={MailIcon} width="full" />
                </GridEl>
              )}
            </Grid>
          )}
          <OrderButtons order={props} />
        </div>
      </div>
    </Card>
  );
};
