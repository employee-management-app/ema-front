import * as actions from './actions';

// Orders

const setOrders = (state, { payload }) => ({
  ...state,
  orders: payload.orders,
  ordersTotal: payload.total,
});

const setCompletedOrders = (state, { payload }) => ({
  ...state,
  completedOrders: payload.orders,
  ordersTotal: payload.total,
});

const addOrder = (state, action) => ({
  ...state,
  orders: [action.payload, ...state.orders],
});

const updateOrder = (state, action) => {
  const index = state.orders.findIndex(({ _id }) => _id === action.payload._id);

  return {
    ...state,
    orders: Object.assign([], state.orders, { [index]: action.payload }),
  };
};

const deleteOrderById = (state, action) => ({
  ...state,
  orders: state.orders.filter(({ _id }) => _id !== action.payload),
  completedOrders: state.completedOrders.filter(({ _id }) => _id !== action.payload),
});

// Order

const setOrder = (state, action) => ({
  ...state,
  order: action.payload,
});

const setOrderToEdit = (state, action) => ({
  ...state,
  orderToEdit: action.payload,
});

const setOrderToDuplicate = (state, action) => ({
  ...state,
  orderToDuplicate: action.payload,
});

// Company

const setCompany = (state, action) => ({
  ...state,
  company: action.payload,
});

// Employees

const setEmployees = (state, action) => ({
  ...state,
  employees: action.payload,
});

const updateEmployee = (state, action) => {
  const index = state.employees.findIndex(({ _id }) => _id === action.payload._id);

  return {
    ...state,
    employees: Object.assign([], state.employees, { [index]: action.payload }),
  };
};

// Employee

const setEmployee = (state, action) => ({
  ...state,
  employee: action.payload,
});

// Managers

const setManagers = (state, action) => ({
  ...state,
  managers: action.payload,
});

// Manager

const setManager = (state, action) => ({
  ...state,
  manager: action.payload,
});

const updateManager = (state, action) => {
  const index = state.managers.findIndex(({ _id }) => _id === action.payload._id);

  return {
    ...state,
    managers: Object.assign([], state.managers, { [index]: action.payload }),
  };
};

// Companies

const setCompanies = (state, action) => ({
  ...state,
  companies: action.payload,
});

// Overlapped order

const setOverlapOrders = (state, action) => ({
  ...state,
  overlapOrders: action.payload.orders,
  overlapOrder: action.payload.order,
});

// UI

const pushNotification = (state, action) => ({
  ...state,
  notifications: [...state.notifications, action.payload],
});

const removeFirstNotification = (state, action) => {
  const notifications = state.notifications.filter(({ id }) => id !== action.payload);

  return {
    ...state,
    notifications,
  };
};

const showModal = (state, action) => ({
  ...state,
  visibleModals: [...state.visibleModals, action.payload],
});

const hideModal = (state, action) => ({
  ...state,
  visibleModals: state.visibleModals.filter((modal) => modal !== action.payload),
});

const hideAllModals = (state) => ({
  ...state,
  visibleModals: [],
});

const showDrawer = (state, action) => ({
  ...state,
  visibleDrawers: [...state.visibleDrawers, action.payload],
});

const hideDrawer = (state, action) => ({
  ...state,
  visibleDrawers: state.visibleDrawers.filter((drawer) => drawer !== action.payload),
});

const hideAllDrawers = (state) => ({
  ...state,
  visibleDrawers: [],
});

export const reducers = {
  [actions.SET_ORDERS]: setOrders,
  [actions.SET_COMPLETED_ORDERS]: setCompletedOrders,
  [actions.ADD_ORDER]: addOrder,
  [actions.UPDATE_ORDER]: updateOrder,
  [actions.DELETE_ORDER_BY_ID]: deleteOrderById,
  [actions.SET_ORDER]: setOrder,
  [actions.SET_COMPANY]: setCompany,
  [actions.SET_ORDER_TO_EDIT]: setOrderToEdit,
  [actions.SET_ORDER_TO_DUPLICATE]: setOrderToDuplicate,
  [actions.SET_EMPLOYEE]: setEmployee,
  [actions.SET_EMPLOYEES]: setEmployees,
  [actions.SET_MANAGERS]: setManagers,
  [actions.SET_MANAGER]: setManager,
  [actions.SET_COMPANIES]: setCompanies,
  [actions.SET_OVERLAP_ORDERS]: setOverlapOrders,
  [actions.UPDATE_EMPLOYEE]: updateEmployee,
  [actions.UPDATE_MANAGER]: updateManager,
  [actions.PUSH_NOTIFICATION]: pushNotification,
  [actions.REMOVE_NOTIFICATION_BY_ID]: removeFirstNotification,
  [actions.SHOW_MODAL]: showModal,
  [actions.HIDE_MODAL]: hideModal,
  [actions.HIDE_ALL_MODALS]: hideAllModals,
  [actions.SHOW_DRAWER]: showDrawer,
  [actions.HIDE_DRAWER]: hideDrawer,
  [actions.HIDE_ALL_DRAWERS]: hideAllDrawers,
};
