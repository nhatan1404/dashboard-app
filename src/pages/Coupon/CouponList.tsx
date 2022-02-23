import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { useQueryTable, HandleQueryTable, IQueryTable } from '../../shared/hooks/useQueryTable';
import { removeMessage } from './Coupon.actions';
import { deleteCoupon, getListCoupon } from './Coupon.thunks';

const mapStateToProps = (state: AppState) => ({
  listCoupon: state.coupon.listCoupon,
  pagination: state.coupon.pagination,
  message: state.coupon.message,
});

const mapDispatchToProps = {
  getListCoupon,
  deleteCoupon,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const CouponList = ({
  listCoupon,
  pagination,
  message,
  getListCoupon,
  deleteCoupon,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.COUPON.INDEX,
        title: 'Mã Giảm Giá',
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
        header: 'Code',
        accessor: 'code',
      },
      {
        header: 'Loại',
        accessor: 'type',
      },
      {
        header: 'Giá trị',
        accessor: 'value',
      },
      {
        header: 'Trạng thái',
        accessor: 'status',
      },
    ],
    [],
  );

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListCoupon();
  }, [getListCoupon]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Mã Giảm Giá'
        columns={columns}
        linkCreate={PATH.COUPON.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listCoupon &&
          listCoupon.map((coupon) => (
            <tr key={coupon.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{coupon.id}</td>
              <td data-label={columns[1].header}>{coupon.code}</td>
              <td data-label={columns[2].header}>{coupon.type}</td>
              <td data-label={columns[3].header}>{coupon.value}</td>
              <td data-label={columns[4].header}>{coupon.status}</td>
              <TableActionCol
                id={coupon.id}
                linkEdit={PATH.COUPON.EDIT}
                onDelete={deleteCoupon}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(CouponList);
