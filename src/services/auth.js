import axios from 'axios';

const PREFIX = '/auth';

export const registerUser = (firstname, lastname, email, password) => {
  return axios.post(`${PREFIX}/register`, {
    firstname,
    lastname,
    email,
    password,
  });
};
