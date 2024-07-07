import useStore, { useGetListActivity } from '../../stores/useActivityList.js';
import { useEffect } from 'react';

const useGetPagination = () => useStore((state) => state.pagination);
const useGetListActivityData = () => useStore((state) => state.activityList);
const useSetCurrentPage = () => useStore((state) => state.setCurrentPage);

const ListActivity = () => {
  const getListActivity = useGetListActivity();
  const { currentPage, totalPage } = useGetPagination();
  const data = useGetListActivityData();
  const setCurrentPage = useSetCurrentPage();

  const columns = [
    {
      key: 'name',
      label: 'Nom',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'difficulty',
      label: 'Difficulté',
    },
    {
      key: 'Company',
      label: 'Entreprise',
    },
  ];

  useEffect(() => {
    getListActivity();
  }, [currentPage]);

  return (
    <div>ceci est une liste d'activités</div>
  );
};

export default ListActivity;
