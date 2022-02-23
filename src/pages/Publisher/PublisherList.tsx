import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { useQueryTable, HandleQueryTable, IQueryTable } from '../../shared/hooks/useQueryTable';
import { removeMessage } from './Publisher.actions';
import { deletePublisher, getListPublisher } from './Publisher.thunks';

const mapStateToProps = (state: AppState) => ({
  listPublisher: state.publisher.listPublisher,
  pagination: state.publisher.pagination,
  message: state.publisher.message,
});

const mapDispatchToProps = {
  getListPublisher,
  deletePublisher,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const PublisherList = ({
  listPublisher,
  pagination,
  message,
  getListPublisher,
  deletePublisher,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.PUBLISHER.INDEX,
        title: 'Nhà Xuất Bản',
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
        header: 'Mô tả',
        accessor: 'description',
      },
    ],
    [],
  );
  
  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListPublisher();
  }, [getListPublisher]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Nhà Xuất Bản'
        columns={columns}
        linkCreate={PATH.PUBLISHER.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listPublisher &&
          listPublisher.map((publisher) => (
            <tr key={publisher.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{publisher.id}</td>
              <td data-label={columns[1].header}>{publisher.name}</td>
              <td data-label={columns[2].header}>
                {publisher.description ? publisher.description : '...'}
              </td>
              <TableActionCol
                id={publisher.id}
                linkEdit={PATH.PUBLISHER.EDIT}
                onDelete={deletePublisher}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(PublisherList);
