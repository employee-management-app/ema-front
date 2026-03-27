import React from 'react';

import { Grid, GridEl } from '../Grid';
import { Button } from '../Button';
import { OrderCard } from '../OrderCard';
import { EmptyState } from '../EmptyState';
import { useFilters } from '../../hooks/useFilters';

export const OrdersList = ({ orders, disabled = false }) => {
  const { resetFilters, filtersCount } = useFilters();

  const action = filtersCount > 0
    ? <Button onClick={resetFilters}>Reset filters</Button>
    : null;

  return orders.length
    ? (
      <Grid>
        {orders.map((order) => (
          <GridEl key={order._id} size={{ xs: 12, md: 6, xl: 4 }} filled>
            <OrderCard disabled={disabled} {...order} />
          </GridEl>
        ))}
      </Grid>
    ) : (
      <EmptyState
        title={filtersCount > 0 ? 'No results' : 'There are no tasks yet'}
        action={action}
        text={filtersCount > 0
          ? 'If you have filters applied, try resetting them or changing your search criteria.'
          : 'Tasks will be displayed here. If you think this is an error, please contact the administrator.'}
      />
    );
};
