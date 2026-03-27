import axios from './axios';

export const updateEmployee = (id, fields) => new Promise((resolve, reject) => {
  axios.patch(`${process.env.REACT_APP_API_URL}/employee/${id}`, fields)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
