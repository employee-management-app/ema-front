import axios from './axios';

export const addEmployee = (employee) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/employee`, employee)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
