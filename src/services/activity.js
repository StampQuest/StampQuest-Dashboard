import instance from '../utils/axios.js';

const PREFIX = '/activity';

export const getAllListActivity = (currentPage = 1, limit) => {
  return instance.get(`${PREFIX}/all`, {
    params: {
      currentPage,
      limit,
    },
  });
};

export const createActivity = (name, description, category) => {
  return instance.post(`${PREFIX}/create`, { params: { name: name, description, category: `${category}` } });
};
