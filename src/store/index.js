import { createStore } from 'redux';

import { reducers } from './reducers';

const initialStore = {
  orders: [],
  completedOrders: [],
  ordersTotal: 0,
  order: null,
  orderToEdit: null,
  orderToDuplicate: null,
  notifications: [],
  company: null,
  companies: [],
  employees: [],
  managers: [],
  visibleDrawers: [],
  visibleModals: [],
  overlapOrder: null,
  overlapOrders: [],
};

const reducer = (state = initialStore, action) => {
  if (!Object.keys(reducers).includes(action.type)) {
    return state;
  }

  return reducers[action.type](state, action);
};

export const store = createStore(reducer);

export * from './actions';
export * from './selectors';
