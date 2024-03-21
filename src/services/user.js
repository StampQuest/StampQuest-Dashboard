import instance from '../utils/axios.js';

const PREFIX = '/users';

export const getUserDetails = (hashId) => {
  return instance.get(`${PREFIX}/show/${hashId}`);
};
