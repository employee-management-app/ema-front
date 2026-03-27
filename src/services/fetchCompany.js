import axios from './axios';

export const fetchCompany = () => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/company`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
