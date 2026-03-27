import axios from './axios';

export const fetchCompanyEmployees = (id) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/company/${id}/employees`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});
