import axios from './axios';

export const addManager = (manager) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/manager`, manager)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
