import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { EditUserSchema } from './UserSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { updateUser, getItemUser } from './User.thunks';
import { removeMessage, removeCurrentUser } from './User.actions';
import { Role, Status } from '../../constants/enum';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.user.isLoading,
  message: state.user.message,
  user: state.user.user,
});

const mapDispatchToProps = {
  updateUser,
  getItemUser,
  removeMessage,
  removeCurrentUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const UserEdit = ({
  isLoading,
  message,
  user,
  updateUser,
  getItemUser,
  removeMessage,
  removeCurrentUser,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.USER.INDEX,
        title: 'Tài Khoản',
      },
      {
        link: `${PATH.USER.EDIT}/${id}`,
        title: 'Sửa Tài Khoản',
      },
    ],
    [id],
  );

  type FormValues = {
    firstname: string;
    lastname: string;
    password?: string;
    avatar: string;
    address?: string;
    email: string;
    phone: string;
    role: Role;
    status: Status;
  };

  const defaultValue: FormValues = {
    firstname: '',
    lastname: '',
    password: '',
    avatar: '',
    address: '',
    email: '',
    phone: '',
    role: Role.Customer,
    status: Status.ACTIVE,
  };
  const handleSubmit = (data: FormValues) => {
    updateUser(parseInt(id), { ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.USER.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  useEffect(() => {
    getItemUser({ id: parseInt(id) });
  }, [getItemUser, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentUser();
    });
  }, [history, removeCurrentUser]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Sửa Tài Khoản'
        defaultValue={user}
        validationSchema={EditUserSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tên'
              error={errors.firstname && errors.firstname.message}
              {...register('firstname')}
            />

            <InputField
              label='Họ'
              error={errors.lastname && errors.lastname.message}
              {...register('lastname')}
            />

            <InputField
              label='Địa chỉ'
              error={errors.address && errors.address.message}
              {...register('address')}
            />

            <InputField
              label='Số điện thoại'
              error={errors.phone && errors.phone.message}
              {...register('phone')}
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

export default connector(UserEdit);
