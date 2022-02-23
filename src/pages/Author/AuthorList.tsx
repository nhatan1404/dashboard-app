import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { usePagiante } from '../../shared/hooks/usePagiante';
import { usePrevious } from '../../shared/hooks/usePrevious';
import {
  HandleQueryTable,
  IQueryTable,
  useQueryTable,
} from '../../shared/hooks/useQueryTable';
import { IQueryAuthor } from '../../shared/interfaces/author.interface';
import { removeMessage } from './Author.actions';
import { deleteAuthor, getListAuthor } from './Author.thunks';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.author.isLoading,
  listAuthor: state.author.listAuthor,
  pagination: state.author.pagination,
  message: state.author.message,
});

const mapDispatchToProps = {
  getListAuthor,
  deleteAuthor,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const AuthorList = ({
  isLoading,
  listAuthor,
  pagination,
  message,
  getListAuthor,
  deleteAuthor,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.AUTHOR.INDEX,
        title: 'Tác giả',
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
        header: 'Họ tên',
        accessor: 'fullname',
      },
      {
        header: 'Tiểu sử',
        accessor: 'biography',
      },
    ],
    [],
  );

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListAuthor(queryTable);
  }, [getListAuthor, queryTable]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Tác Giả'
        columns={columns}
        linkCreate={PATH.AUTHOR.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
        isLoading={isLoading}
      >
        {listAuthor &&
          listAuthor.map((author) => (
            <tr key={author.id}>
              <td data-label={columns[0].header}>{author.id}</td>
              <td data-label={columns[1].header}>
                {author.lastname + ' ' + author.firstname}
              </td>
              <td data-label={columns[2].header}>
                {author.biography ? author.biography : '...'}
              </td>
              <TableActionCol
                id={author.id}
                linkEdit={PATH.AUTHOR.EDIT}
                onDelete={deleteAuthor}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(AuthorList);
