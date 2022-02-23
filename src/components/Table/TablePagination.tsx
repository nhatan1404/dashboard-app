import { IPagination } from '../../shared/interfaces/pagination.interface';

interface Props {
  pagination: IPagination;
  onPaginate: (page: number) => void;
}

const TablePaginate: React.FC<Props> = ({ pagination, onPaginate }) => {
  const { totalPages, currentPage } = pagination;
  const listPage = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='table-pagination'>
      <div className='flex items-center justify-between'>
        <div className='buttons'>
          {listPage.map((page) => (
            <button
              key={page}
              onClick={() => onPaginate(page)}
              type='button'
              className={`button ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        <small>
          Trang {currentPage} trong tổng số {totalPages}
        </small>
      </div>
    </div>
  );
};

export default TablePaginate;
