import instance from '../utils/axios.js';

const PREFIX = '/auth';

export const registerUser = (firstname, lastname, email, password) => {
  return instance.post(`${PREFIX}/register`, {
    firstname,
    lastname,
    email,
    password,
  });
};

export const loginUser = (email, password) => {
  return instance.post(`${PREFIX}/login`, {
    email,
    password,
  });
};
