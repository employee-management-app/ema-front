import axios from './axios';

export const fetchOrder = (id) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/order/${id}`)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});
