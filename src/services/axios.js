import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/getTokenFromLocalStorage';

const getAuthHeader = () => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Token ${token}`,
  };
};

const get = (url, config) => (
  axios.get(url, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const post = (url, data, config) => (
  axios.post(url, data, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const patch = (url, data, config) => (
  axios.patch(url, data, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const put = (url, data, config) => (
  axios.put(url, data, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const _delete = (url, config) => (
  axios.delete(url, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const methods = {
  get,
  post,
  patch,
  put,
  delete: _delete,
};

export default methods;
