import axios from './axios';

export const fetchManagers = (params = { isVerified: true }) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/managers`, { params })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
