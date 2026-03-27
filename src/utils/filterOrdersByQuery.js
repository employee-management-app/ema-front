// Temporary solution for filtering orders
// TODO: GET /orders?s=search
const getObjectValues = (obj) => {
  const values = Object.values(obj);

  return values.map((value) => ((value && typeof value === 'object') ? getObjectValues(value) : value));
};

export const filterOrdersByQuery = (orders, query) => orders.filter((order) => {
  const flattenOrder = JSON.stringify(getObjectValues(order)).toLowerCase();
  const [a, b] = query.toLowerCase().split(' ');

  if (!a && !b) {
    return true;
  }

  return (!a || (a && flattenOrder.includes(a))) && (!b || (b && flattenOrder.includes(b)));
});
