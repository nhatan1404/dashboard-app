import { ReactNode, useState } from 'react';
import {
  HandleQueryTable,
  IQueryTable,
} from '../../shared/hooks/useQueryTable';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import TableBar from './TableBar';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TablePaginate from './TablePagination';

interface Props {
  children: ReactNode;
  name: string;
  linkCreate: string;
  isLoading?: boolean;
  pagination: IPagination;
  query: IQueryTable;
  columns: ColumnTable[];
  handleQuery: HandleQueryTable;
}

const Table: React.FC<Props> = ({
  children,
  name,
  isLoading,
  columns,
  linkCreate,
  pagination,
  query,
  handleQuery,
}) => {
  const [timer, setTimer] = useState<number>();

  const handlePaginate = (page: number): void => {
    handleQuery({ ...query, page });
  };

  const handleChangeLimit = (limit: number): void => {
    handleQuery({
      ...query,
      limit: limit,
      page: 1,
    });
  };

  const handleSearch = (keyword: string): void => {
    clearTimeout(timer);

    const debouncer = window.setTimeout(
      () => handleQuery({ ...query, keyword, page: 1 }),
      1000,
    );

    setTimer(debouncer)
  };

  return (
    <section className='section main-section'>
      <div className='card has-table'>
        <TableHeader tableName={name} linkCreate={linkCreate} />
        <div className='card-content'>
          <TableBar onChangeLimit={handleChangeLimit} onSearch={handleSearch} />
          {isLoading ? (
            <div className='flex items-center justify-center space-x-2 animate-pulse p-9'>
              <div className='mr-1'>Đang tải dữ liệu</div>
              <div className='w-4 h-4 bg-blue-400 rounded-full'></div>
              <div className='w-4 h-4 bg-blue-400 rounded-full'></div>
              <div className='w-4 h-4 bg-blue-400 rounded-full'></div>
            </div>
          ) : (
            <>
              <table>
                <TableHead columns={columns} />
                <tbody>{children}</tbody>
              </table>
              <TablePaginate
                pagination={pagination}
                onPaginate={handlePaginate}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Table;
