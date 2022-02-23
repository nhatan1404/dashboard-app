import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import TableActionCol from '../../components/Table/TableActionCol';
import Table from '../../components/Table/Table';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { removeMessage } from './Category.actions';
import { deleteCategory, getListAllCategory } from './Category.thunks';
import { HandleQueryTable, IQueryTable, useQueryTable } from '../../shared/hooks/useQueryTable';

const mapStateToProps = (state: AppState) => ({
  listCategory: state.category.listCategory,
  pagination: state.category.pagination,
  message: state.category.message,
});

const mapDispatchToProps = {
  getListAllCategory,
  deleteCategory,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const CategoryList = ({
  listCategory,
  pagination,
  message,
  getListAllCategory,
  deleteCategory,
  removeMessage,
}: Props) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.CATEGORY.INDEX,
        title: 'Danh Mục',
      },
    ],
    [],
  );

  const columns: ColumnTable[] = useMemo(
    () => [
      { header: 'Mã', accessor: 'id' },
      { header: 'Tên', accessor: 'title' },
      { header: 'Ghi chú', accessor: 'note' },
      { header: 'Danh mục cha', accessor: 'parent' },
      { header: '', accessor: 'action' },
    ],
    [],
  );

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListAllCategory();
  }, [getListAllCategory]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        columns={columns}
        name='Danh Mục'
        linkCreate={PATH.CATEGORY.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listCategory &&
          listCategory.map((category) => (
            <tr key={category.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{category.id}</td>
              <td data-label={columns[1].header}>{category.title}</td>
              <td data-label={columns[2].header}>
                {category.note ? category.note : '...'}
              </td>
              <td data-label={columns[3].header}>
                {category.parent ? category.parent.title : '...'}
              </td>
              <TableActionCol
                id={category.id}
                linkEdit={PATH.CATEGORY.EDIT}
                onDelete={deleteCategory}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(CategoryList);
