import axios from './axios';

export const fetchEmployees = (params = { isVerified: true }) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/employees`, { params })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
