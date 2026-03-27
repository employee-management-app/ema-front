import axios from './axios';

export const fetchCompanyManagers = (id) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/company/${id}/managers`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
