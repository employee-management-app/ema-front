import axios from './axios';

export const deleteOrder = (id) => new Promise((resolve, reject) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/order/${id}`)
    .then(({ data }) => { resolve(data); })
    .catch((err) => { reject(err); });
});
