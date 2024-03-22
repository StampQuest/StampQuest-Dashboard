import {
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
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
    <div className="flex w-full flex-col">
      <Table aria-label="Example table with dynamic content" removeWrapper>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data} emptyContent={'Aucune activités créer'}>
          {(item) => (
            <TableRow key={data.hashId}>
              {(columnKey) => {
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center mt-2">
        <Pagination total={totalPage} page={currentPage ? currentPage : 1} onChange={setCurrentPage} showControls />
      </div>
    </div>
  );
};

export default ListActivity;
