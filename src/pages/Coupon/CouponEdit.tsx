import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { EditCouponSchema } from './CouponSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { updateCoupon, getItemCoupon } from './Coupon.thunks';
import { removeMessage, removeCurrentCoupon } from './Coupon.actions';
import { TypeCoupon, Status } from '../../constants/enum';
import Select from '../../components/Form/Select';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.coupon.isLoading,
  message: state.coupon.message,
  coupon: state.coupon.coupon,
});

const mapDispatchToProps = {
  updateCoupon,
  getItemCoupon,
  removeMessage,
  removeCurrentCoupon,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const CouponEdit = ({
  isLoading,
  message,
  coupon,
  updateCoupon,
  getItemCoupon,
  removeMessage,
  removeCurrentCoupon,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.COUPON.INDEX,
        title: 'Mã Giảm Giá',
      },
      {
        link: `${PATH.COUPON.EDIT}/${id}`,
        title: 'Sửa Mã Giảm Giá',
      },
    ],
    [id],
  );

  const optionsType: IOption[] = useMemo(
    () => [
      { label: 'Cố định', value: TypeCoupon.FIXED },
      { label: 'Phần trăm', value: TypeCoupon.PERCENT },
    ],
    [],
  );

  const optionsStatus: IOption[] = useMemo(
    () => [
      { label: 'Còn hiệu lực', value: Status.ACTIVE },
      { label: 'Hết hiệu lực', value: Status.INACTIVE },
    ],
    [],
  );

  type FormValues = {
    code: string;
    type: TypeCoupon;
    value: number;
    status: Status;
  };

  const handleSubmit = (data: FormValues) => {
    updateCoupon(parseInt(id), { ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.COUPON.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  useEffect(() => {
    getItemCoupon({ id: parseInt(id) });
  }, [getItemCoupon, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentCoupon();
    });
  }, [history, removeCurrentCoupon]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Sửa Mã Giảm Giá'
        defaultValue={
          !coupon
            ? coupon
            : {
                ...coupon,
                status: coupon.status.toUpperCase() as Status,
                type: coupon.type.toUpperCase() as TypeCoupon,
              }
        }
        validationSchema={EditCouponSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Mã'
              error={errors.code && errors.code.message}
              {...register('code')}
            />

            <Select
              label='Loại'
              error={errors.type && errors.type.message}
              {...register('type')}
              options={optionsType}
            />

            <InputField
              label='Giá trị'
              error={errors.value && errors.value.message}
              {...register('value', { valueAsNumber: true })}
            />

            <Select
              label='Trạng thái'
              error={errors.status && errors.status.message}
              {...register('status')}
              options={optionsStatus}
            />

            <FormFooter>
              <Button title='Cập nhật' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(CouponEdit);
