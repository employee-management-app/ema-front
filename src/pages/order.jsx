import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Spinner } from '../components/Spinner';
import { OrderPage } from '../components/OrderPage';
import { fetchOrder } from '../services/fetchOrder';
import { getOrder, setOrder, setOrderToDuplicate, setOrderToEdit } from '../store';

export const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useSelector(getOrder);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    fetchOrder(id)
      .then((data) => {
        dispatch(setOrder(data));
        dispatch(setOrderToEdit(data));
        dispatch(setOrderToDuplicate(data));
      })
      .catch(() => {
        navigate('/404');
      })
      .finally(() => {
        setIsLoading(false);
      }, []);
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <OrderPage order={order} />
  );
};
