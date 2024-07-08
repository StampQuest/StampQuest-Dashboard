import instance from '../utils/axios.js';

const PREFIX = '/categories';

export const getAllCategories = (currentPage = 1, limit) => {
  return instance.get(`${PREFIX}`, {
    params: {
      currentPage,
      limit,
    },
  });
};

export const createCategory = (name, image) => {
  return instance.post(`${PREFIX}/create`, {
    name,
    image_url: image,
  });
};

export const getCategory = (hashId) => {
  return instance.get(`${PREFIX}/show/${hashId}`);
};