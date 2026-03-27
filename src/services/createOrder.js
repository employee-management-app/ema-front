import axios from './axios';

export const createOrder = (order) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/order`, order)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
