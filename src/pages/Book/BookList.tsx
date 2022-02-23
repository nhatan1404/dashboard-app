import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { usePagiante } from '../../shared/hooks/usePagiante';
import {
  HandleQueryTable,
  IQueryTable,
  useQueryTable,
} from '../../shared/hooks/useQueryTable';
import { removeMessage } from './Book.actions';
import { deleteBook, getListBook } from './Book.thunks';

const mapStateToProps = (state: AppState) => ({
  listBook: state.book.listBook,
  pagination: state.book.pagination,
  message: state.book.message,
});

const mapDispatchToProps = {
  getListBook,
  deleteBook,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const BookList = ({
  listBook,
  pagination,
  message,
  getListBook,
  deleteBook,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.BOOK.INDEX,
        title: 'Sách',
      },
    ],
    [],
  );

  const columns: ColumnTable[] = useMemo(
    () => [
      {
        header: 'Mã',
        accessor: 'id',
      },
      {
        header: 'Tên',
        accessor: 'name',
      },
      {
        header: 'Trạng thái',
        accessor: 'status',
      },
    ],
    [],
  );

  useEffect(() => {
    getListBook();
  }, [getListBook]);

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Sách'
        columns={columns}
        linkCreate={PATH.BOOK.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listBook &&
          listBook.map((book) => (
            <tr key={book.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{book.id}</td>
              <td data-label={columns[1].header}>{book.title}</td>
              <td data-label={columns[2].header}>{book.status}</td>
              <TableActionCol
                id={book.id}
                linkEdit={PATH.BOOK.EDIT}
                onDelete={deleteBook}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(BookList);
