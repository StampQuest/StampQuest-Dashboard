import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand';
import { produce } from 'immer';
import { createCategory, getAllCategories, getCategory } from '../services/categories.js';

const store = (set, get) => ({
  pagination: {
    currentPage: 1,
    limit: 10,
    totalItems: null,
    totalPage: null,
  },
  categoriesList: [],

  getCategoriesList: async () => {
    await getAllCategories(get().pagination.currentPage, get().pagination.limit).then((res) => {
      const { pagination, data } = res.data;
      const { currentPage, limit, totalItems, totalPage } = pagination;
      console.log(res);
      set(
        produce((state) => {
          state.pagination = {
            currentPage,
            limit,
            totalItems,
            totalPage,
          };
          state.categoriesList = data;
        }),
        false,
        'categoriesList/success',
      );
    });
  },

  setCurrentPage: (page) => {
    set(
      produce((state) => {
        state.pagination.currentPage = page;
      }),
      false,
      'activityList/paginationChanged',
    );
  },

  createCategory: async (name, image) => {
    await createCategory(name, image).then((res) => {
      get().getCategoriesList();
    });
  },

  getOneCategory: async (hashId) => {
    await getCategory(hashId).then((res) => {
      console.log(res);
    });
  },

  
});

const useStore = create(devtools(subscribeWithSelector(store), { name: 'categories' }));
export const useGetCategoriesList = () => useStore((state) => state.getCategoriesList);
export const useCategories = () => useStore((state) => state.categoriesList);
export const useCreateCategory = () => useStore((state) => state.createCategory);

export default useStore;