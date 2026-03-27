import axios from './axios';

export const updateManager = (id, fields) => new Promise((resolve, reject) => {
  axios.patch(`${process.env.REACT_APP_API_URL}/manager/${id}`, fields)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
