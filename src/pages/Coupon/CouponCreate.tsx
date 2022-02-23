import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { CreateCouponSchema } from './CouponSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createCoupon } from './Coupon.thunks';
import { removeMessage } from './Coupon.actions';
import { TypeCoupon, Status } from '../../constants/enum';
import Select from '../../components/Form/Select';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.coupon.isLoading,
  message: state.coupon.message,
});

const mapDispatchToProps = {
  createCoupon,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const CouponCreate = ({
  isLoading,
  message,
  createCoupon,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.COUPON.INDEX,
        title: 'Mã Giảm Giá',
      },
      {
        link: PATH.COUPON.CREATE,
        title: 'Thêm Mã Giảm Giá',
      },
    ],
    [],
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

  const defaultValue: FormValues = {
    code: '',
    type: TypeCoupon.PERCENT,
    value: 0,
    status: Status.INACTIVE,
  };

  const handleSubmit = (data: FormValues) => {
    createCoupon({ ...data });
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

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Thêm Mã Giảm Giá'
        defaultValue={defaultValue}
        validationSchema={CreateCouponSchema}
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
              <Button title='Tạo' />
              <Button type='reset' title='Xoá' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(CouponCreate);
