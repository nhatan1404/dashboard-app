import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import {
  useQueryTable,
  HandleQueryTable,
  IQueryTable,
} from '../../shared/hooks/useQueryTable';
import { removeMessage } from './User.actions';
import { deleteUser, getListUser } from './User.thunks';

const mapStateToProps = (state: AppState) => ({
  listUser: state.user.listUser,
  isLoading: state.user.isLoading,
  pagination: state.user.pagination,
  message: state.user.message,
});

const mapDispatchToProps = {
  getListUser,
  deleteUser,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const UserList = ({
  listUser,
  isLoading,
  pagination,
  message,
  getListUser,
  deleteUser,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.USER.INDEX,
        title: 'Tài Khoản',
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
    ],
    [],
  );

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Tài Khoản'
        columns={columns}
        linkCreate={PATH.USER.CREATE}
        pagination={pagination}
        isLoading={isLoading}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listUser &&
          listUser.map((user) => (
            <tr key={user.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{user.id}</td>
              <td data-label={columns[1].header}>{user.firstname}</td>
              <TableActionCol
                id={user.id}
                linkEdit={PATH.USER.EDIT}
                onDelete={deleteUser}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(UserList);
