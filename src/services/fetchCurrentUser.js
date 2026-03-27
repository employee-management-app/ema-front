import axios from './axios';

export const fetchCurrentUser = () => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/auth/user`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
