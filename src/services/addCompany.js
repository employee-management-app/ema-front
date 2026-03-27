import axios from './axios';

export const addCompany = (company) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/company`, company)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
