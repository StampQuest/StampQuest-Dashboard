import instance from '../utils/axios.js';

const PREFIX = '/activity';

export const getAllListActivity = (currentPage = 2, limit) => {
  return instance.get(`${PREFIX}/all`, {
    params: {
      currentPage,
      limit,
    },
  });
};
