import axios from './axios';

export const fetchEmployeeOrders = (id, params) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/employee/${id}/orders`, { params })
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
