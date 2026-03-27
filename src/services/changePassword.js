import axios from './axios';

export const changePassword = (fields) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/auth/change-password`, fields)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
