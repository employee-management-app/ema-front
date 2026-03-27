import axios from './axios';

export const resetPassword = (fields) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, fields)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
