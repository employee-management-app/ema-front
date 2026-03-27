import cx from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { scrollIntoView } from 'seamless-scroll-polyfill';

import { useWindowSize } from '../../hooks/useWindowSize';
import { getEmployees } from '../../store';
import { useAuth } from '../../hooks/useAuth';

import { Container } from '../Container';
import { GoogleMap } from '../GoogleMap';
import { OrderCard } from '../OrderCard';
import { DateFilter } from '../DateFilter';
import { Timeline } from './Timeline';

import styles from './OrdersMap.module.scss';

export const OrdersMap = ({ orders, showDateFilter = true }) => {
  const employees = useSelector(getEmployees);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [isTimelineVisible, setIsTimelineVisible] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const wrapperRef = React.useRef(null);
  const cardsRef = React.useRef(null);
  const windowSize = useWindowSize();
  const { isEmployee } = useAuth();

  React.useEffect(() => {
    const handleResize = () => {
      setHeight(document.body.clientHeight - wrapperRef.current.offsetTop);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, [wrapperRef]);

  const selectOrder = React.useCallback((id) => {
    const index = orders.findIndex((order) => order._id === id);
    const card = cardsRef.current.children[index];

    if (card) {
      scrollIntoView(card, { behavior: 'smooth' });
    }

    setSelectedOrderId(id);
    setIsTimelineVisible(orders[index].status !== 'inbox');
  }, [orders]);

  const offset = React.useMemo(() => {
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;
    const _offset = { top: 50, bottom: 50, left: 50, right: 50 };

    if (windowWidth <= 768) {
      if (windowHeight < 700) {
        _offset.bottom += 200;
      } else if (windowWidth < 576) {
        _offset.bottom += 250;
      } else {
        _offset.bottom += 400;
      }
    } else {
      _offset.left += Math.max(0, (windowWidth - 1250) / 2) + 250;
    }

    return _offset;
  }, [windowSize]);

  const getEmployeeColor = React.useCallback(({ assignedEmployee }) => {
    if (isEmployee) {
      return '#1352A1';
    }

    if (!assignedEmployee) {
      return undefined;
    }

    const employee = employees.find(({ _id }) => _id === assignedEmployee._id) || {};

    return employee.color || '';
  }, [isEmployee, employees]);

  const selectedOrder = React.useMemo(() => (
    orders.find((order) => order._id === selectedOrderId)
  ), [orders, selectedOrderId]);

  const hideTimeline = React.useCallback(() => {
    setIsTimelineVisible(false);
  }, []);

  const markers = React.useMemo(() => orders.map((order) => ({
    id: order._id,
    color: getEmployeeColor(order),
    showWarning: order.status === 'inbox',
    lat: order.address.lat,
    lng: order.address.lng,
  })), [orders]);

  const availableOrderIds = React.useMemo(() => orders.map((order) => order._id), [orders]);

  return (
    <div className={styles.wrapper} ref={wrapperRef} style={height ? { height } : undefined}>
      {showDateFilter && <DateFilter />}
      <GoogleMap
        markers={markers}
        selected={selectedOrderId}
        offset={offset}
        onSelect={selectOrder}
      />
      {orders.length && (
        <div className={styles.container}>
          <Container className={styles.containerInner}>
            <div ref={cardsRef} className={styles.cards}>
              {orders.map((order) => (
                <div
                  className={cx(styles.card, { [styles.selected]: order._id === selectedOrderId })}
                  key={order._id}
                >
                  <div className={styles.cardOutline} style={{ color: getEmployeeColor(order) }} />
                  <OrderCard onClick={() => selectOrder(order._id)} {...order} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
      {isTimelineVisible && selectedOrder && selectedOrder.status !== 'inbox' && (
        <div className={styles.timeline}>
          <Timeline
            order={selectedOrder}
            color={getEmployeeColor(selectedOrder)}
            availableOrderIds={availableOrderIds}
            onSelect={selectOrder}
            onClose={hideTimeline}
          />
        </div>
      )}
    </div>
  );
};
