import axios from './axios';

export const fetchSlots = (params) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/slots`, { params })
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
