import axios from './axios';

export const updateCompany = (id, company) => new Promise((resolve, reject) => {
  axios.put(`${process.env.REACT_APP_API_URL}/company/${id}`, company)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
