import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand';
import { getAllListActivity } from '../services/activity.js';
import { produce } from 'immer';

const store = (set, get) => ({
  pagination: {
    currentPage: 1,
    limit: 10,
    totalItems: null,
    totalPage: null,
  },
  activityList: [],

  getActivityList: async () => {
    await getAllListActivity(get().pagination.currentPage, get().pagination.limit).then((res) => {
      const { pagination, data } = res.data;
      const { currentPage, limit, totalItems, totalPage } = pagination;
      set(
        produce((state) => {
          state.pagination = {
            currentPage,
            limit,
            totalItems,
            totalPage,
          };
          state.activityList = data;
        }),
        false,
        'activityList/success',
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
});

const useStore = create(devtools(subscribeWithSelector(store), { name: 'activityList' }));
export const useGetListActivity = () => useStore((state) => state.getActivityList);

export default useStore;
